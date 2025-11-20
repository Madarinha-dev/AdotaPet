package com.adotapet.service; 


import com.adotapet.model.Adotante;
import com.adotapet.repository.AdotanteRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Implementa o CRUD de Adotantes
@Service
public class AdotanteService {

    private final AdotanteRepository adotanteRepository;

    // Injeção de Dependência
    public AdotanteService(AdotanteRepository adotanteRepository) {
        this.adotanteRepository = adotanteRepository;
    }

    // CRUD: CRIAR/ATUALIZAR (SAVE)
    public Adotante save(Adotante adotante) {
        return adotanteRepository.save(adotante);
    }

    // CRUD: BUSCAR POR ID
    public Optional<Adotante> findById(Long id) {
        return adotanteRepository.findById(id);
    }

    // CRUD: LISTAR TODOS
    public List<Adotante> findAll() {
        return adotanteRepository.findAll();
    }

    // CRUD: DELETAR
    public void deleteById(Long id) {
        adotanteRepository.deleteById(id);
    }
}