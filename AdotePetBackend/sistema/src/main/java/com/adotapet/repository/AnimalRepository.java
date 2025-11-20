package com.adotapet.repository;

import com.adotapet.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface AnimalRepository extends JpaRepository<Animal, Long> {
    // Método de consulta automática (Query Method) para buscar animais por status.
    // O Spring Data JPA traduz 'findByStatus' em uma query SQL.
    List<Animal> findByStatus(String status);
}