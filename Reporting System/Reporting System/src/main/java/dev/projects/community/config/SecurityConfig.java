package dev.projects.community.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



/**
 *
 * @author noob
 */



@EnableWebSecurity
@Configuration
public class SecurityConfig {
    
    
    private final CustomUserDetailsService customUserDetailsService;
    
    
    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }
    
    
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http 
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth 
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                    .requestMatchers("/user/**").hasRole("CEBU")
                    .requestMatchers("/auth/**").permitAll()
                    .anyRequest().authenticated())
                
                .httpBasic(Customizer.withDefaults()) 
                .logout(Customizer.withDefaults());
        
        
                /*
                .formLogin(form -> form
                    .loginPage("/login")
                    .defaultSuccessUrl("/home", true)
                    .permitAll())
                
                
                .logout(Customizer.withDefaults());         
                */
        return http.build();       
    }
    
    
    @Bean 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    
    
    // 🔑 AuthenticationManager bean, uses your custom service + password encoder
    // automatically wires customuserdetialservice and password encoder
    /*
    @Bean 
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    */
    
    
    
    //this is the old style of using authentication manager
    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder())
                .and()
                .build();
    }
    
    
    //enable cors
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}
