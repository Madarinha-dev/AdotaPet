package com.adotapet.controller;

import org.springframework.format.annotation.DateTimeFormat;

import com.adotapet.model.Adocao;
import com.adotapet.repository.AdocaoRepository;
import com.adotapet.service.AdocaoService;
import com.adotapet.exceptions.LimiteAdocoesException;
import com.adotapet.exceptions.AnimalIndisponivelException;
import com.adotapet.model.AdocaoRequest; 

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/adocoes")
public class AdocaoController {

    private final AdocaoService adocaoService;
    private final AdocaoRepository adocaoRepository;

    public AdocaoController(AdocaoService adocaoService, AdocaoRepository adocaoRepository) {
        this.adocaoService = adocaoService;
        this.adocaoRepository = adocaoRepository;
    }

    @PostMapping
    // ALTERAÇÃO CRÍTICA: Receber o AdocaoRequest no lugar da entidade Adocao
    public ResponseEntity<?> realizarAdocao(@RequestBody AdocaoRequest request) { 
        try {
            // Passa os IDs capturados corretamente do DTO para o Service
            Adocao novaAdocao = adocaoService.realizarAdoção(request.getAdotanteId(), request.getAnimalId());
            return new ResponseEntity<>(novaAdocao, HttpStatus.CREATED);
            
        } catch (LimiteAdocoesException e) {
            // Trata a Exception de Regra de Negócio com 400 Bad Request
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            
        } catch (AnimalIndisponivelException e) {
            // Trata a Exception de Regra de Negócio com 400 Bad Request
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            // Trata a exceção de ID não encontrado (que retorna RuntimeException no Service)
            // Retorna 404 Not Found para IDs não existentes (ex: Adotante/Animal não encontrado)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    // ------------------------------------
    // ROTAS DE RELATÓRIO (Listagem e Filtros)
    // ------------------------------------
    
    // GET /api/adocoes
    // Lista todas as adoções
    @GetMapping
    public List<Adocao> findAll() {
        return adocaoRepository.findAll();
    }
    
    // GET /api/adocoes/adotante/{adotanteId}
    // RF04: Filtro por Adotante
    @GetMapping("/adotante/{adotanteId}")
    public List<Adocao> findByAdotante(@PathVariable Long adotanteId) {
        return adocaoRepository.findByAdotante_Id(adotanteId);
    }
    
    // GET /api/adocoes/periodo?inicio=2025-01-01&fim=2025-12-31
    // RF04: Filtro por Período
    @GetMapping("/periodo")
    public List<Adocao> findByPeriodo(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim
    ) {
        return adocaoRepository.findByDataAdocaoBetween(inicio, fim);
    }
}