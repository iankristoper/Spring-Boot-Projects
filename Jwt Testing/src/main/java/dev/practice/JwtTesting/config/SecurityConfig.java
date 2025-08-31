
package dev.practice.JwtTesting.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;




/**
 *
 * @author dev
 */


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    
    private final CustomUserDetailsService customUser;
    private final JwtValidator jwtValidator;
    private final JwtAuthFilter authFilter;
    
    
    public SecurityConfig(CustomUserDetailsService customUser, JwtValidator jwtValidator, JwtAuthFilter authFilter) {
        this.customUser = customUser;
        this.jwtValidator = jwtValidator;
        this.authFilter = authFilter;
    }
    
    
    //main rules 
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http 
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                    .requestMatchers("/user/**").hasRole("USER")
                    .anyRequest().authenticated())
                
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                //.addFilterBefore(new JwtAuthFilter(jwtValidator), UsernamePasswordAuthenticationFilter.class)
                //.formLogin(Customizer.withDefaults())
                .logout(Customizer.withDefaults());
                
        return http.userDetailsService(customUser).build();
    }
    
    
    
    //encrypt the password 
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
