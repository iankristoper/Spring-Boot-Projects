

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
    //register user as a user in the db
    public void registerUser(User registration) {
        String sql = "INSERT INTO users(username, email, password, role, city) VALUES(?,?,?,?,?)";
        
        jdbc.update(sql, registration.getUsername(), registration.getEmail(), registration.getPassword(), registration.getRole(), registration.getCity());
    }
    
    
    
    //this is for fetching data from the db then convert it as object
    public User findByUsername(String username) {
        
        String sql = "SELECT username, password, role FROM users WHERE username = ?";
        
        return jdbc.queryForObject(sql, (rs, rowNum) -> {
            
            User user = new User();
            
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setRole(rs.getString("role"));
            
            return user;
            
        }, username);
        
    }
    
    
    
}
