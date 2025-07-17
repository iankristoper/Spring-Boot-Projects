
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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.JdbcUserDetailsManager;






@EnableWebSecurity
@Configuration
public class SecurityConfig {
    
    @Autowired
    private DataSource datasource;
   
    
    
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


    public UserDetailsService userDetailsService() {


        


        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(datasource);


        


        


        //tell it how to query the students table for user and roles


        String query1 = "SELECT email AS username, password, true AS enabled FROM students WHERE email = ?";


        userDetailsManager.setUsersByUsernameQuery(query1);


        


        String query2 = "SELECT email AS username, role AS authority FROM students WHERE email = ?";


        userDetailsManager.setAuthoritiesByUsernameQuery(query2);


        


        


        return userDetailsManager;


    }
       
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

}


