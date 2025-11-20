package com.adotapet.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;

// 1. Configuração do JSON para Herança
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, 
    include = JsonTypeInfo.As.PROPERTY, 
    property = "tipoAnimal")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Cachorro.class, name = "cachorro"),
    @JsonSubTypes.Type(value = Gato.class, name = "gato")
})
// 2. Configuração do JPA (JOINED)
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private int idade;
    private String porte;
    private String status;
    private String cor; // Cor é comum a todos
    
    public abstract String emitirSom(); // Método abstrato

    // Construtor completo (sem 'raca')
    public Animal(
        String nome,
        int idade,
        String porte,
        String status,
        String cor) 
    {
        this.nome = nome;
        this.idade = idade;
        this.porte = porte;
        this.status = status;
        this.cor = cor;
    }
    
    // Construtor vazio (para o JPA)
    protected Animal(){
    }

    // --- Getters e Setters ---
    public Long getId() { return id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public int getIdade() { return idade; }
    public void setIdade(int idade) { this.idade = idade; }

    public String getPorte() { return porte; }
    public void setPorte(String porte){ this.porte = porte; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status = status; }
    
    public String getCor() { return cor; }
    public void setCor(String cor) { this.cor = cor; }
}