
package dev.projects.onlinecoursesystem.controller;





import dev.projects.onlinecoursesystem.dto.AdminDTO;
import dev.projects.onlinecoursesystem.dto.StudentDTO;
import dev.projects.onlinecoursesystem.model.Admin;
import dev.projects.onlinecoursesystem.repository.StudentRepository;
import dev.projects.onlinecoursesystem.model.Student;
import dev.projects.onlinecoursesystem.repository.AdminRepository;
import dev.projects.onlinecoursesystem.service.AdminService;
import dev.projects.onlinecoursesystem.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;





@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired 
    private StudentService studentService;
    
    @Autowired 
    private StudentRepository studentRepository;
    
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private AdminRepository adminRepository;
    
    
    
    
    //for students 
    @PostMapping("/register/student")
    public ResponseEntity<String> registerStudent(@RequestBody StudentDTO studentDTO) {
                       
        //convert DTO to model and encode password 
        Student student = studentService.convertStudentDataToModel(studentDTO);
                
        //save to DB
        studentRepository.registerStudent(student);
        
        return ResponseEntity.ok("Student registered successfully");
    }
    
    
    
    //for admin
    @PostMapping("/register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody AdminDTO adminDTO) {
        
        System.out.println("firstname: " + adminDTO.getFirstName());
        System.out.println("lastname: " + adminDTO.getlastName());
        System.out.println("email" + adminDTO.getEmail());
        System.out.println("password" + adminDTO.getPassword());
        
        //convert DTO to model and encode the password
        Admin admin = adminService.convertAdminDataToModel(adminDTO);
        
        //save to DB
        adminRepository.registerAdmin(admin);
        
        return ResponseEntity.ok("Admin registered successfully");
    }
    
  
}
