
package dev.projects.onlinecoursesystem;



import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;



/**
 *
 * @author noob
 */



@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private final DataSource datasource;  //injects the datasource for jdbc
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()   // This is where we define the access control rules for different paths
                    .antMatchers("/register", "/login").permitAll()    // Allow public access to registration and login
                    .antMatchers("/courses/**").hasAnyRole("STUDENT", "ADMIN")  // Students and Admin can view courses
                    .antMatchers("/admin/**").hasRole("ADMIN") // Only Admin can access admin paths
                    .anyRequest().authenticated()  // Any other path requires authentication
                .and()
                .formLogin().permitAll() // Enable login page for all users
                .and()
                .logout().permitAll(); // Allow users to log out
    }
    
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(datasource)
                .usersByUsernameQuery("SELECT email, password, role FROM students WHERE email = ?") // SQL query to fetch user credentials
                .authoritiesByUsernameQuery("SELECT email, role FROM students WHERE email = ?"); // SQL query to fetch user role
    }
}
