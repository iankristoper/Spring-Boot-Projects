
package dev.testing.securitytest.repository;

import dev.testing.securitytest.dto.LoginDetails;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;





@Repository
public class LoginRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    public LoginRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    
    public LoginDetails findUserByUsername(String username) {
        
        String sql = "SELECT * FROM userregistrations WHERE username = ?";
        
        return jdbc.queryForObject(sql, (rs, rowNum) -> {
            
                LoginDetails user = new LoginDetails();

                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setRoles(rs.getString("role"));

                return user;
            }, username);       
    }
    
}
