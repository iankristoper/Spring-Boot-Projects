
package dev.practice.JwtTesting.repository;

import dev.practice.JwtTesting.dto.LoginDetails;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;



/**
 *
 * @author dev
 */



@Repository
public class LoginRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    public LoginRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    //get user details from the db and convert it to object 
    //this will be used to service
    public LoginDetails findUserByUsername(String username) {
        
        String sql = "SELECT * FROM userregistrations WHERE username = ?";
        
        return jdbc.queryForObject(sql, (rs, rowNum) -> {
            
            LoginDetails user = new LoginDetails();
            
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setRoles(rs.getString("roles"));
            
            return user;
        }, username);
    }
    
    
    //coming soon...
    
}
