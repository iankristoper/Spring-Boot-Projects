
package dev.projects.onlinecoursesystem.config;




import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.User;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;




@EnableWebSecurity
@Configuration
public class SecurityConfig {
    
    @Bean 
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/testing").permitAll()
                .anyRequest().authenticated())
                
            .formLogin(Customizer.withDefaults())
            .logout(Customizer.withDefaults());
        
        return http.build();            
    }
    
    
    @Bean 
    public UserDetailsService userDetailsService() {
        
        UserDetails user = User.withUsername("Ian").password(passwordEncoder().encode("hello")).roles("USER").build();
        
        return new InMemoryUserDetailsManager(user);
    }
    
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

}


