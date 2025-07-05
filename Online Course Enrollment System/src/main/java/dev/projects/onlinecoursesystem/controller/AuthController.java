
package dev.projects.onlinecoursesystem.controller;





import dev.projects.onlinecoursesystem.dto.StudentDTO;
import dev.projects.onlinecoursesystem.repository.StudentRepository;
import dev.projects.onlinecoursesystem.model.Student;
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
    
    
    //
    @PostMapping("/Register")
    public ResponseEntity<String> register(@RequestBody StudentDTO studentDTO) {
        
        //convert DTO to model and encode password 
        Student student = studentService.convertToModel(studentDTO);
        
        //save to DB
        studentRepository.registerStudent(student);
        
        return ResponseEntity.ok("Student registered successfully");
    }
    
    
    
    

    
}
