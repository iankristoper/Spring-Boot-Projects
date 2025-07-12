
package dev.projects.onlinecoursesystem.controller;





import dev.projects.onlinecoursesystem.dto.CourseDTO;
import dev.projects.onlinecoursesystem.model.Course;
import dev.projects.onlinecoursesystem.repository.CourseRepository;
import dev.projects.onlinecoursesystem.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;









@RestController
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired
    private CourseRepository courseRepo;
    
    @Autowired 
    private AdminService adminService;
    
   
    
    
    @PostMapping("/createcourse")
    public ResponseEntity<String> createCourse(@RequestBody CourseDTO courseDTO) {
        
        System.out.println("Code: " + courseDTO.getCourseCode());
        System.out.println("Course: " + courseDTO.getCourseName());
        System.out.println("Status: " + courseDTO.getStatus());
        System.out.println("Slots" + courseDTO.getSlots());
        System.out.println("Instructor: " + courseDTO.getInstructor());
        
        Course course = adminService.convertCourseToModel(courseDTO);
        
        courseRepo.addCourse(course);
        
        
        return ResponseEntity.ok("Course added successfully");
    }
    
    
}
