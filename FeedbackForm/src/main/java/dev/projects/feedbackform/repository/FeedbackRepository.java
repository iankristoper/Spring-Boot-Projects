
package dev.projects.feedbackform.repository;

import dev.projects.feedbackform.model.Feedback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;




@Repository
public class FeedbackRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    public FeedbackRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    
    //save data to the db
    public void saveFeedback(Feedback feedback) {
        
        String sql = "INSERT INTO feedbacks(title, description, username, email, status) VALUES(?,?,?,?,?)";
        
        
        jdbc.update(sql, feedback.getTitle(), feedback.getDescription(), feedback.getUsername(), feedback.getEmail(), feedback.getStatus());
        
        
        System.out.println("Feedback data has been passed to DB");
        
    }
    
    
    //update feedback status on db
    public void updateFeebackStatus(int feedbackId, String status) {
        
        String sql = "UPDATE feedbacks SET status = ? WHERE id = ?";
        
        jdbc.update(sql, status, feedbackId);
        
        
        System.out.println("Feedback status has been update to DB");        
        
    }
    
    
    
    
    
}
