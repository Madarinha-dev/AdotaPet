package com.adotapet.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "adotante")
public class Adotante {
    // Atributos da classe Adotante;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    private String endereco;
    private int quantidadeDeAnimaisAdotados = 0; //REQUISITO CRÍTICO: Rastreamento da Regra de Negócio (Limite 3)

    // Construtores com os GETs e os SETs

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }


    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }


    public String getCpf(){
        return cpf;
    }

    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    
    public String getEndereco(){
        return endereco;
    }

    public void setEndereco(String endereco){
        this.endereco = endereco;
    }


    public int getQuantidadeDeAnimaisAdotados(){
        return quantidadeDeAnimaisAdotados;
    }

    public void setQuantidadeDeAnimaisAdotados(int quantidadeDeAnimaisAdotados){
        this.quantidadeDeAnimaisAdotados = quantidadeDeAnimaisAdotados;
    }

    public Adotante(){
    }
}