package com.adotapet.service;

import com.adotapet.dto.EstatisticasDTO;
import com.adotapet.repository.AdocaoRepository;
import com.adotapet.repository.AdotanteRepository;
import com.adotapet.repository.AnimalRepository;

import org.springframework.stereotype.Service;

@Service
public class EstatisticasService {

    private final AnimalRepository animalRepository;
    private final AdotanteRepository adotanteRepository;
    private final AdocaoRepository adocaoRepository;

    public EstatisticasService(AnimalRepository animalRepository, AdotanteRepository adotanteRepository, AdocaoRepository adocaoRepository) {
        this.animalRepository = animalRepository;
        this.adotanteRepository = adotanteRepository;
        this.adocaoRepository = adocaoRepository;
    }

    public EstatisticasDTO getEstatisticasHome() {
        Long animaisDisponiveis = (long) animalRepository.findByStatus("DISPONIVEL").size();

        // 2. Adotantes no Limite (Usando o novo método do AdotanteRepository)
        Long adotantesNoLimite = adotanteRepository.countAdotantesNoLimite();
        
        // 3. Animais Adotados (Contando todos os registros de Adoção)
        Long animaisAdotados = adocaoRepository.count();

        return new EstatisticasDTO(animaisDisponiveis, adotantesNoLimite, animaisAdotados);
    }
}