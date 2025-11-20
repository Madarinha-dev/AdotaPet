package com.adotapet.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne; 
import jakarta.persistence.JoinColumn;
import java.time.LocalDate;

@Entity
@Table(name = "adocoes")
public class Adocao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relacionamento Many-to-One: Muitos para um Adotante
    @ManyToOne
    @JoinColumn(name = "adotante_id") 
    private Adotante adotante;

    // Relacionamento Many-to-One: Muitos para um Animal
    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    private LocalDate dataAdocao = LocalDate.now();

    // --- CONSTRUTORES ---
    
    // Construtor vazio (obrigatório pelo JPA)
    public Adocao() {
    }

    // Construtor para registrar a adoção
    public Adocao(Adotante adotante, Animal animal) {
        this.adotante = adotante;
        this.animal = animal;
    }
    
    // --- GETTERS E SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Adotante getAdotante() {
        return adotante;
    }

    public void setAdotante(Adotante adotante) {
        this.adotante = adotante;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public LocalDate getDataAdocao() {
        return dataAdocao;
    }

    public void setDataAdocao(LocalDate dataAdocao) {
        this.dataAdocao = dataAdocao;
    }
    
    // *** GETTERS DINÂMICOS PARA SERIALIZAÇÃO JSON ***
    // O Jackson (JSON) vai usar estes métodos para incluir adotanteId e animalId no retorno.

    public Long getAdotanteId() {
        return this.adotante != null ? this.adotante.getId() : null;
    }

    public Long getAnimalId() {
        return this.animal != null ? this.animal.getId() : null;
    }
}