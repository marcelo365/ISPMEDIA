package ao.isptec.multimedia.config;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // ✅ Nova sintaxe para desativar CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // libera todas as rotas
            );

        return http.build();
    }
}
