

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
        String sql = "INSERT INTO userregistrations(username, password, role) VALUES(?,?,?)";
        
        jdbc.update(sql, user.getUsername(), user.getPassword(), user.getRoles());
        
        return ResponseEntity.ok("User registered successfully!");
        
    }
    
    
    
    
    //get username
    public User findByUsername(String username) {
        
        String sql = "SELECT * FROM userregistrations WHERE username = ?";
        
        return jdbc.queryForObject(sql, new Object[]{username}, (rs, rowNum) -> {
            User user = new User();
            
            user.setId(rs.getInt("id"));
            user.setUsername(rs.getString("username"));
        
            return user;
        });
    }
}
