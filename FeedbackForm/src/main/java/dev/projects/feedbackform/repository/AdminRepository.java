
package dev.projects.feedbackform.repository;

import dev.projects.feedbackform.dto.FeedbackResponseDTO;
import dev.projects.feedbackform.dto.FeedbackWithVotesDTO;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;




@Repository
public class AdminRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    public AdminRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    //get all feedback from user - list it with the upvotes and downvotes
    //maps the row to FeedbackWithVotesDTO
    public List<FeedbackWithVotesDTO> findAllWithVotes() {
        
        String sql = """
            SELECT 
                     f.title, 
                     f.description, 
                     f.username, 
                     f.email, 
                     f.status,
            COALESCE(SUM(CASE WHEN LOWER(TRIM(v.value)) = 1 THEN 1 ELSE 0 END), 0) AS upvotes,
            COALESCE(SUM(CASE WHEN LOWER(TRIM(v.value)) = -1 THEN 1 ELSE 0 END), 0) AS downvotes
            FROM feedbacks f
            LEFT JOIN votings v ON f.id = v.feedback_id
            GROUP BY f.id, f.title, f.description, f.username, f.email, f.status
            """;
        
        
        //mapping the sal result to dto 
        return jdbc.query(sql, (rs, rowNum) -> {
            
            FeedbackWithVotesDTO dto = new FeedbackWithVotesDTO();
            
            dto.setTitle(rs.getString("title"));
            dto.setDescription(rs.getString("description"));
            dto.setUsername(rs.getString("username"));
            dto.setEmail(rs.getString("email"));
            dto.setStatus(rs.getString("status"));
            dto.setUpvotes(rs.getInt("upvotes"));
            dto.setDownvotes(rs.getInt("downvotes"));
            
            return dto;
        
        
        });
        
    }
    
    
    
    //response to the feedbacks 
    public void feedbackReponse(FeedbackResponseDTO feedbackResponse) {
        
        String sql = "INSERT INTO admin_reponses(feedback_id, response) VALUES(?,?)";
        
        jdbc.update(sql, feedbackResponse.getFeedbackId(), feedbackResponse.getAdminReponse());
        
    }
}
