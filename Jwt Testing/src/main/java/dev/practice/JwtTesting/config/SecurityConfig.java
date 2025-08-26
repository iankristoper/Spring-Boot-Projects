
package dev.practice.JwtTesting.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;




/**
 *
 * @author dev
 */



@EnableWebSecurity
public class SecurityConfig {
    
    
    private final CustomUserDetailsService customUser;
    
    
    public SecurityConfig(CustomUserDetailsService customUser) {
        this.customUser = customUser;
    }
    
    
    //main rules 
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http 
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/signup").permitAll()
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                    .requestMatchers("/user/**").hasRole("USER")
                    .anyRequest().authenticated())
                
                .httpBasic(Customizer.withDefaults())
                .logout(Customizer.withDefaults());
                
        return http.userDetailsService(customUser).build();
    }
    
    
    
    //encrypt the password 
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
