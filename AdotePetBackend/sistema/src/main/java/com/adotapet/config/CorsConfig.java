package com.adotapet.config; // Certifique-se de que o nome do pacote está correto!

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite requisições do frontend rodando localmente (porta 3000 é comum)
        registry.addMapping("/**") // Aplica o CORS a todos os endpoints
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000") 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}