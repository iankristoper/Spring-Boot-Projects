
package dev.projects.onlinecoursesystem.service;

import dev.projects.onlinecoursesystem.dto.StudentDTO;
import dev.projects.onlinecoursesystem.model.Student;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;









@Service
public class StudentService {
    
    private final PasswordEncoder passwordEncoder;
    
    public StudentService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    
    
    //controller to model -> db
    public Student convertToModel(StudentDTO dto) {
        
        Student student = new Student();
        
        student.setFirstName(dto.getFistName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPassword(passwordEncoder.encode(dto.getPassword()));
        student.setRole("ROLE_STUDENT");
        
        return student;
    }
    
    
    //db to controller
    public StudentDTO convertToDTO(Student student) {
        
        StudentDTO dto = new StudentDTO();
        
        dto.setFirstName(student.getFirstName());
        dto.setLastName(dto.getLastName());
        dto.setEmail(dto.getEmail());
        
        return dto;
    }
    
    
    
}
