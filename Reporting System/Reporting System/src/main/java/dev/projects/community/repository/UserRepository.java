

package dev.projects.community.repository;

import dev.projects.community.dto.RegistrationDTO;
import org.springframework.jdbc.core.JdbcTemplate;


/**
 *
 * @author noob
 */



public class UserRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    public void registerUser(RegistrationDTO registration) {
        String sql = "INSERT INTO users(username, email, password, roles, city) VALUES(?,?,?,?,?)";
        
        jdbc.update(sql, registration.getUsername(), registration.getEmail(), registration.getPassword(), registration.getCity(), registration.getRole());
    }
}
