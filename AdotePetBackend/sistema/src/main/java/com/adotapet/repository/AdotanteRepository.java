package com.adotapet.repository;

import com.adotapet.model.Adotante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdotanteRepository extends JpaRepository<Adotante, Long> {
    
    @Query("SELECT COUNT(a) FROM Adotante a WHERE a.quantidadeDeAnimaisAdotados >= 3")
    Long countAdotantesNoLimite(); 
}