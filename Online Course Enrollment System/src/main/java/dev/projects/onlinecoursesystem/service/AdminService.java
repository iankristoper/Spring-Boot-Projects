
package dev.projects.onlinecoursesystem.service;

import dev.projects.onlinecoursesystem.dto.AdminDTO;
import dev.projects.onlinecoursesystem.model.Admin;









public class AdminService {
    
    //convert from controller to model unto db
    public Admin convertAdminDataToModel(AdminDTO dto) {
        
        Admin admin = new Admin();
        
        admin.setFirstName(dto.getFirstName());
        admin.setLastName(dto.getlastName());
        admin.setEmail(dto.getEmail());
        admin.setPassword(dto.getPassword());
        admin.setRole("ROLE_ADMIN");
        
        return admin;
    }
               
            
    //convert from db to controller
    
}
