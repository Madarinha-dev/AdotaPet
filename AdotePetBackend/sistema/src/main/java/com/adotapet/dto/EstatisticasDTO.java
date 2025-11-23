package com.adotapet.dto;

public class EstatisticasDTO {
    
    private final Long animaisDisponiveis;
    private final Long adotantesNoLimite;
    private final Long animaisAdotados; 
    
    // Construtor
    public EstatisticasDTO(Long animaisDisponiveis, Long adotantesNoLimite, Long animaisAdotados) {
        this.animaisDisponiveis = animaisDisponiveis;
        this.adotantesNoLimite = adotantesNoLimite;
        this.animaisAdotados = animaisAdotados;
    }
    
    // Getters
    public Long getAnimaisDisponiveis() {
        return animaisDisponiveis;
    }
    
    public Long getAdotantesNoLimite() {
        return adotantesNoLimite;
    }
    
    public Long getAnimaisAdotados() {
        return animaisAdotados;
    }
}