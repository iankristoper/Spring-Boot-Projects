
package dev.projects.feedbackform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;








@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/greetings").permitAll()
                        .anyRequest().authenticated()
                )
                
                .httpBasic(Customizer.withDefaults()) 
                .logout(Customizer.withDefaults());
                
                        
             
        
        return http.build();
    }
    
    
    //secure the password from registration before storing to db
    @Bean 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    
    /* In using password encoder, the generated credentials will be invalid and became bad credentials. so you can implement your custmoer userdetails to have some login info */
    
    
    @Bean 
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        
        //test temporary password 
        String rawPassword = "Ian";
        String encodedPassword = passwordEncoder.encode(rawPassword);
        
        UserDetails user = User.withUsername("Ian").password(encodedPassword).roles("USER").build();
        
        return new InMemoryUserDetailsManager(user);
    }
    
    
}
