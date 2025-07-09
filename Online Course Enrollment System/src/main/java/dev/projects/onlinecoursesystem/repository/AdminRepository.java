
package dev.projects.onlinecoursesystem.repository;

import dev.projects.onlinecoursesystem.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;






@Repository
public class AdminRepository {
    
    @Autowired
    private JdbcTemplate jdbc;
    
    
    //insert or register
    public void registerAdmin(Admin admin) {
        
        String sql = "INSERT INTO admins (firstname, lastname, email, password, role) VALUES (?,?,?,?,?)";
        jdbc.update(sql, 
                admin.getFirstName(), 
                admin.getLastName(), 
                admin.getEmail(), 
                admin.getPassword(), 
                admin.getRole()
        );    
    }
    
    
    
    
    
   
    
}
