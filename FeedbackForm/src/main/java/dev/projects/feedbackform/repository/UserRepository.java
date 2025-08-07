

package dev.projects.feedbackform.repository;






import dev.projects.feedbackform.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;











@Repository
public class UserRepository {
    
    private final JdbcTemplate jdbc;
    
    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    //this is for registration 
    public ResponseEntity<String> registerUser(User user) {
        String sql = "INSERT INTO userregistrations(username, password) VALUES(?,?)";
        
        jdbc.update(sql, user.getUsername(), user.getPassword());
        
        return ResponseEntity.ok("User registered successfully!");
        
    }
    
    
}
