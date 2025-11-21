package com.adotapet.controller;

import com.adotapet.model.Animal;
import com.adotapet.model.Cachorro; // Importa as subclasses
import com.adotapet.model.Gato;     // Importa as subclasses
import com.adotapet.service.AnimalService;

// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Define que esta classe é um Controller e mapeia todas as requisições que começam com /api/animais
@RestController
@RequestMapping("/api/animais")
public class AnimalController {

    private final AnimalService animalService;

    // Injeção de Dependência do Service
    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    // GET /api/animais
    // Lista todos os animais (usado no CRUD e para testes)
    @GetMapping
    public List<Animal> findAll() {
        return animalService.findAll();
    }

    // GET /api/animais/disponiveis
    // RF04: Lista apenas animais com status DISPONIVEL (para o Dashboard)
    @GetMapping("/disponiveis")
    public List<Animal> findAvailable() {
        return animalService.findAvailable();
    }

    // GET /api/animais/{id}
    // Busca um animal específico por ID
    @GetMapping("/{id}")
    public ResponseEntity<Animal> findById(@PathVariable Long id) {
        Optional<Animal> animal = animalService.findById(id);
        return animal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ------------------------------------
    // ROTAS DE ESCRITA (CREATE/UPDATE/DELETE - RF01)
    // ------------------------------------
    
    // POST /api/animais
    // Cria um novo animal
    @PostMapping
    public Animal create(@RequestBody Animal animal) {
        // Nota: O tipo de animal (Cachorro/Gato) é inferido pelo JSON recebido.
        return animalService.save(animal);
    }

    // PUT /api/animais/{id}
    // Atualiza um animal existente (CORRIGIDO PARA TRATAR HERANÇA)
    @PutMapping("/{id}")
    public ResponseEntity<Animal> update(@PathVariable Long id, @RequestBody Animal animalDetails) {
        return animalService.findById(id).map(animal -> {
            
            // 1. ATUALIZAÇÃO DOS CAMPOS BASE (Animal.java)
            animal.setNome(animalDetails.getNome());
            // animal.setRaca(animalDetails.getRaca()); // ESTA LINHA FOI REMOVIDA
            animal.setCor(animalDetails.getCor());
            animal.setStatus(animalDetails.getStatus());
            animal.setPorte(animalDetails.getPorte());
            animal.setIdade(animalDetails.getIdade());

            // 2. TRATAMENTO DOS CAMPOS ESPECÍFICOS (Cachorro/Gato)
            // Se o animal encontrado no banco for um Cachorro E o detalhe de entrada for um Cachorro
            if (animal instanceof Cachorro && animalDetails instanceof Cachorro) {
                Cachorro cachorro = (Cachorro) animal;
                Cachorro detalhesCachorro = (Cachorro) animalDetails;
                // Atualiza o campo específico 'raca'
                cachorro.setRaca(detalhesCachorro.getRaca());
            }
            // Se o animal encontrado no banco for um Gato E o detalhe de entrada for um Gato
            else if (animal instanceof Gato && animalDetails instanceof Gato) {
                Gato gato = (Gato) animal;
                Gato detalhesGato = (Gato) animalDetails;
                // Atualiza o campo específico 'corDaPelagem'
                gato.setCorDaPelagem(detalhesGato.getCorDaPelagem());
            }

            // 3. SALVA E RETORNA
            Animal updatedAnimal = animalService.save(animal);
            return ResponseEntity.ok(updatedAnimal);

        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/animais/{id}
    // Deleta um animal por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (animalService.findById(id).isPresent()) {
            animalService.deleteById(id);
            // Retorna 204 No Content para indicar sucesso na deleção
            return ResponseEntity.noContent().build();
        }
        // Retorna 404 Not Found se o animal não existir
        return ResponseEntity.notFound().build();
    }
}