// package com.adotapet.service.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer; // Importação necessária

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             // 1. Desabilita CSRF (Importante para APIs REST)
//             .csrf(AbstractHttpConfigurer::disable)
            
//             // 2. Configura CORS (Permite requisições do frontend)
//             .cors(cors -> {}) // Usa configurações padrão ou definidas globalmente
            
//             // 3. Libera TODAS as requisições
//             .authorizeHttpRequests(authorize -> authorize
//                 .anyRequest().permitAll() // Libera todos os endpoints para acesso irrestrito
//             );
            
//         return http.build();
//     }
// }