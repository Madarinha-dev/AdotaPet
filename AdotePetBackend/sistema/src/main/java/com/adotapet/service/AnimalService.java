package com.adotapet.service; // CORREÇÃO: Pacote ajustado

// CORREÇÕES NOS IMPORTS: 'sistema' foi removido
import com.adotapet.model.Animal;
import com.adotapet.repository.AnimalRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Implementa o CRUD e a lógica de listagem necessária para o Dashboard.
@Service
public class AnimalService {
    private final AnimalRepository animalRepository;

    // Injeção de Dependência
    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    // CRUD: Criar / Atualizar (salvar)
    public Animal save(Animal animal){
        return animalRepository.save(animal);
    }

    // CRUD: Buscar por ID
    // O Controller chama este método (findById)
    public Optional<Animal> findById(Long id) {
        return animalRepository.findById(id);
    }

    // CRUD: Listar Todos
    public List<Animal> findAll() {
        return animalRepository.findAll();
    }

    // Listar os animais disponíveis no Dashboard
    public List<Animal> findAvailable() {
        // Assume que AnimalRepository tem o método findByStatus
        return animalRepository.findByStatus("DISPONIVEL");
    }

    // CRUD: DELETAR
    public void deleteById(Long id) {
        animalRepository.deleteById(id);
    }
}