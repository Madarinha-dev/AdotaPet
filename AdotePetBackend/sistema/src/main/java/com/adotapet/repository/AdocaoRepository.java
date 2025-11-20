package com.adotapet.repository;

import com.adotapet.model.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AdocaoRepository extends JpaRepository<Adocao, Long> {
    
    List<Adocao> findByAdotante_Id(Long adotanteId); 
    List<Adocao> findByDataAdocaoBetween(LocalDate inicio, LocalDate fim);
}