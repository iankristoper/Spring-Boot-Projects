

package dev.projects.community.repository;

import dev.projects.community.model.User;
import org.springframework.dao.DuplicateKeyException;
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
    
    
    
    
    public void registerUser(User registration) {
        
        String checkUser = "SELECT COUNT(*) FROM users WHERE username = ?";
        String checkEmail = "SELECT COUNT(*) FROM users WHERE email = ?";

        Integer userExists = jdbc.queryForObject(checkUser, Integer.class, registration.getUsername());
        Integer emailExists = jdbc.queryForObject(checkEmail, Integer.class, registration.getEmail());

        if (userExists != null && userExists > 0) {
            throw new RuntimeException("Username already exists");
        }
        if (emailExists != null && emailExists > 0) {
            throw new RuntimeException("Email already exists");
        }

        String sql = "INSERT INTO users(username, email, password, role, city) VALUES(?,?,?,?,?)";
        jdbc.update(sql, registration.getUsername(), registration.getEmail(),
                registration.getPassword(), registration.getRole(), registration.getCity());
    }

    
    
    
    
    //this is for fetching data from the db then convert it as object
    public User findByUsername(String username) {
        
        String sql = "SELECT id, username, password, role FROM users WHERE username = ?";
        
        return jdbc.queryForObject(sql, (rs, rowNum) -> {
            
            User user = new User();
            
            user.setUserId(rs.getInt("id"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setRole(rs.getString("role"));
            
            return user;
            
        }, username);
        
    }
    
    
    public int findUserIdByUsername(String username) {
        String sql = "SELECT id FROM users WHERE username = ?";
        
        return jdbc.queryForObject(sql, Integer.class, username);
    }
    
    
    
}
