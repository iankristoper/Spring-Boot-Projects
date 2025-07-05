
package dev.projects.onlinecoursesystem.repository;



import dev.projects.onlinecoursesystem.model.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;





public class StudentRepository {
    
    @Autowired
    private JdbcTemplate jdbc;
    
    public void registerStudent(Student student) {
        
        String sql = "INSERT INTO students (name, lastname, email, password, role) VALUES (?,?,?,?,?)";
        jdbc.update(sql,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getPassword(),
                student.getRole()
        );
    }
    
    
    //You can implement - search if email is existing already
      
}
