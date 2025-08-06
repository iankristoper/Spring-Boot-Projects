
package dev.projects.feedbackform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;








@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/register/greetings").permitAll()
                        .anyRequest().authenticated()
                )
                
                .httpBasic(Customizer.withDefaults()) 
                .logout(Customizer.withDefaults());
                
                        
             
        
        return http.build();
    }
    
}
