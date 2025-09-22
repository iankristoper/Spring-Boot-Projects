

package dev.projects.community.repository;

import dev.projects.community.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


/**
 *
 * @author noob
 */


@Repository
public class UserRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    //this is for registration
    //register user as a user
    //this will pass to registration service
    public void registerUser(User registration) {
        String sql = "INSERT INTO users(username, email, password, role, city) VALUES(?,?,?,?,?)";
        
        jdbc.update(sql, registration.getUsername(), registration.getEmail(), registration.getPassword(), registration.getCity(), registration.getRole());
    }
    
    
    //
}
