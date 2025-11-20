package com.adotapet.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "gato")
@PrimaryKeyJoinColumn(name = "id") 
public class Gato extends Animal {
    
    // Campo específico de Gato
    private String corDaPelagem;

    // --- CONSTRUTORES ---
    
    // 1. Construtor Vazio (Necessário para o JPA)
    public Gato() {
        super();
    }
    
    // 2. Construtor Completo (Para o Jackson/API)
    @JsonCreator
    public Gato(
        @JsonProperty("nome") String nome,
        @JsonProperty("idade") int idade,
        @JsonProperty("porte") String porte,
        @JsonProperty("status") String status,
        // O campo 'raca' foi removido da assinatura do construtor
        @JsonProperty("cor") String cor,
        @JsonProperty("corDaPelagem") String corDaPelagem) 
    {
        // Chama o construtor da classe pai (Animal), sem raca
        super(nome, idade, porte, status, cor); 
        this.corDaPelagem = corDaPelagem; // Atribui o campo próprio
    }

    // --- MÉTODOS ---
    
    // Sobrescrita obrigatória
    @Override
    public String emitirSom() {
        return "Miau";
    }

    // ENCAPSULAMENTO
    public String getCorDaPelagem(){
        return corDaPelagem;
    }

    public void setCorDaPelagem(String corDaPelagem){
        this.corDaPelagem = corDaPelagem;
    }
}