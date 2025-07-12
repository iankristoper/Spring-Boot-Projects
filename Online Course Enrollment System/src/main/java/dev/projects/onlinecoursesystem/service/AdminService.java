
package dev.projects.onlinecoursesystem.service;





import dev.projects.onlinecoursesystem.dto.AdminDTO;
import dev.projects.onlinecoursesystem.dto.CourseDTO;
import dev.projects.onlinecoursesystem.model.Admin;
import dev.projects.onlinecoursesystem.model.Course;

import org.springframework.stereotype.Service;








@Service
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
               
    
    
    //admin functionalities 
    
    
    
    //convert course creation from controller to model unto db
    public Course convertCourseToModel(CourseDTO courseDTO) {
        
        Course course = new Course();
        
        course.setCourseCode(courseDTO.getCourseCode());
        course.setCourseName(courseDTO.getCourseName());
        course.setStatus(courseDTO.getStatus());
        course.setSlots(courseDTO.getSlots());
        course.setInstructor(courseDTO.getInstructor());
        
        return course;
    }
    
    
    
    //convert from db to controller
    
}
