package com.adotapet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories; // Importação adicionada

@SpringBootApplication
@ComponentScan(basePackages = "com.adotapet")
@EnableJpaRepositories(basePackages = "com.adotapet.repository") // Anotação adicionada para escanear Repositórios
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}