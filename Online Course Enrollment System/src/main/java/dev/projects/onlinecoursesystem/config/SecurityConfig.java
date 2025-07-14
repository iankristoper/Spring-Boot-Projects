
package dev.projects.onlinecoursesystem.config;




import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;






@EnableWebSecurity
@Configuration
public class SecurityConfig {
    
    @Autowired
    private DataSource datasource;
    
    private final CustomUserDetailsService userDetailsService;
    
    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
    
    
    @Bean 
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http
                .csrf(csrf -> csrf.disable()) // ✅ new preferred style - disable this is for testing purpsoes only
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/auth/**").permitAll()
                    
                    //student only endpoints
                    .requestMatchers("/student/**", "/enrollment/**").hasRole("STUDENT")
                        
                    //admin only endpoints
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                        
                    //any request that 
                    .anyRequest().authenticated()
                )
                
            .formLogin(form -> form
                .loginPage("/login") // Optional: if you have a custom login page
                .defaultSuccessUrl("/hi", true) // Redirect here after login
                .permitAll()
            )

            .logout(Customizer.withDefaults());
        
        return http.build();            
    }
       
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

}


