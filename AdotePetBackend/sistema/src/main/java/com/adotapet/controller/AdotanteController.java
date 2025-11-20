package com.adotapet.controller; // CORREÇÃO: Pacote ajustado

import com.adotapet.model.Adotante;
import com.adotapet.service.AdotanteService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//rota base da API para Adotantes
@RestController
@RequestMapping("/api/adotantes")
public class AdotanteController {

    private final AdotanteService adotanteService;

    // Injeção de Dependência do Service
    public AdotanteController(AdotanteService adotanteService) {
        this.adotanteService = adotanteService;
    }

    // ------------------------------------
    // ROTAS DE BUSCA
    // ------------------------------------

    // GET /api/adotantes
    @GetMapping
    public List<Adotante> findAll() {
        return adotanteService.findAll();
    }

    // GET /api/adotantes/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Adotante> findById(@PathVariable Long id) {
        Optional<Adotante> adotante = adotanteService.findById(id);
        return adotante.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ------------------------------------
    // ROTAS DE ESCRITA (CREATE/UPDATE/DELETE)
    // ------------------------------------

    // POST /api/adotantes
    @PostMapping
    public Adotante create(@RequestBody Adotante adotante) {
        return adotanteService.save(adotante);
    }

    // PUT /api/adotantes/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Adotante> update(@PathVariable Long id, @RequestBody Adotante adotanteDetails) {
        return adotanteService.findById(id).map(adotante -> {
                    // Atualiza apenas os campos permitidos
                    adotante.setNome(adotanteDetails.getNome());
                    adotante.setCpf(adotanteDetails.getCpf());
                    adotante.setEndereco(adotanteDetails.getEndereco());
                    // Nota: Não atualizamos o contador de animais adotados aqui; isso é feito apenas no AdocaoService.
                    
                    Adotante updatedAdotante = adotanteService.save(adotante);
                    return ResponseEntity.ok(updatedAdotante);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/adotantes/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (adotanteService.findById(id).isPresent()) {
            adotanteService.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.notFound().build(); // 404 Not Found
    }
}