
package dev.projects.onlinecoursesystem.repository;




import dev.projects.onlinecoursesystem.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;










@Repository
public class CourseRepository {
    
    @Autowired
    public JdbcTemplate jdbc;
    
    
    public ResponseEntity<String> addCourse(Course course) {
        
        String sql = "INSERT INTO courses (coursecode, coursename, status, slots, instructor) VALUES (?,?,?,?,?)";
        jdbc.update(sql,
                course.getCourseCode(),
                course.getCourseName(),
                course.getStatus(),
                course.getSlots(),
                course.getInstructor());
                
        return ResponseEntity.ok("Course data from postman has been added to the database");
    }
}
