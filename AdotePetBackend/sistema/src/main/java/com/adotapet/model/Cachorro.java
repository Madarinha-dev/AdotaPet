package com.adotapet.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "cachorros")
@PrimaryKeyJoinColumn(name = "id")
public class Cachorro extends Animal {

    // CAMPO ESPECÍFICO DE CACHORRO
    private String raca;

    // 1. CONSTRUTOR VAZIO (Necessário para o JPA)
    public Cachorro() {
        super();
    }
    
    // 2. CONSTRUTOR COMPLETO (Para o Jackson/API)
    @JsonCreator
    public Cachorro(
        @JsonProperty("nome") String nome,
        @JsonProperty("idade") int idade,
        @JsonProperty("porte") String porte,
        @JsonProperty("status") String status,
        @JsonProperty("raca") String raca, // Raca é recebida aqui
        @JsonProperty("cor") String cor) 
    {
        // Chama o construtor da classe pai (Animal), sem raca
        super(nome, idade, porte, status, cor); 
        this.raca = raca; // Atribui o campo próprio
    }

    // 3. IMPLEMENTAÇÃO DO MÉTODO ABSTRATO
    @Override
    public String emitirSom() {
        return "Au Au!";
    }
    
    // Getters e Setters para raca
    public String getRaca() { return raca; }
    public void setRaca(String raca) { this.raca = raca; }
}