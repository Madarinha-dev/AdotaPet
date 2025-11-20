package com.adotapet.model;

public class AdocaoRequest {
    private Long adotanteId;
    private Long animalId;

    // Construtor vazio (para Jackson)
    public AdocaoRequest() {}

    public Long getAdotanteId() {
        return adotanteId;
    }

    public void setAdotanteId(Long adotanteId) {
        this.adotanteId = adotanteId;
    }

    public Long getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Long animalId) {
        this.animalId = animalId;
    }
}
