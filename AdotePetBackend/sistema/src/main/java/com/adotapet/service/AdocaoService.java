package com.adotapet.service;

import com.adotapet.exceptions.LimiteAdocoesException;
import com.adotapet.exceptions.AnimalIndisponivelException;


import com.adotapet.model.Adotante;
import com.adotapet.model.Animal;
import com.adotapet.repository.AdocaoRepository;
import com.adotapet.repository.AdotanteRepository;
import com.adotapet.repository.AnimalRepository;
import com.adotapet.model.Adocao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AdocaoService {
    // -------------------------------------------------------------------------------
    // 1. ATRIBUTOS: Injeção de Dependência
    // --------------------------------------------------------------------------------
    @Autowired
    private final AdocaoRepository adocaoRepository;

    @Autowired
    private final AdotanteRepository adotanteRepository;

    @Autowired
    private final AnimalRepository animalRepository;


    public AdocaoService(AdocaoRepository adocaoRepository, AdotanteRepository adotanteRepository, AnimalRepository animalRepository) {
        this.adocaoRepository = adocaoRepository;
        this.adotanteRepository = adotanteRepository;
        this.animalRepository = animalRepository;
    }

    // --------------------------------------------------------------------------------
    // 2. Método CRÍTICO: realizarAdoção (Nome do método corrigido no Controller)
    // --------------------------------------------------------------------------------
    
    public Adocao realizarAdoção(Long adotanteId, Long animalId) {
        
        // 1. Busca dos objetos (Usando Repositórios e Optional<>)
        Adotante adotante = adotanteRepository.findById(adotanteId).orElseThrow(() -> new RuntimeException("Adotante não encontrado."));
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new RuntimeException("Animal não encontrado."));

        // Regra 01: Limite de adoções
        if (adotante.getQuantidadeDeAnimaisAdotados() >= 3) {
            throw new LimiteAdocoesException("O adotante " + adotante.getNome() + " já atingiu o limite máximo de 3 adoções.");
        }

        // Regra 02: Status do animal
        if (!"DISPONIVEL".equals(animal.getStatus())) {
            throw new AnimalIndisponivelException("O animal " + animal.getNome() + " não está disponível para adoção. Status atual: " + animal.getStatus());
        }

        // 2. Se tudo for OK: Atualizar e Salvar...
        
        // A) Marca animal como ADOTADO e Salva (persiste)
        animal.setStatus("ADOTADO");
        animalRepository.save(animal); 
        
        // B) Incrementa contador do adotante e Salva (persiste)
        adotante.setQuantidadeDeAnimaisAdotados(adotante.getQuantidadeDeAnimaisAdotados() + 1);
        adotanteRepository.save(adotante); 
        
        // C) Cria e salva o registro de adoção
        Adocao novaAdocao = new Adocao();
        
        novaAdocao.setAdotante(adotante); 
        novaAdocao.setAnimal(animal); 
        
        
        return adocaoRepository.save(novaAdocao); 
    }
}