
package dev.projects.feedbackform.repository;

import dev.projects.feedbackform.model.User;
import dev.projects.feedbackform.model.Voting;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;




@Repository
public class VotingRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    public VotingRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    
    public void saveVotes(Voting voting) {
        
        String sql = "INSERT INTO votings(feedback_id, user_id, value) value(?,?,?)";
        
        jdbc.update(sql, voting.getFeedbackId(), voting.getUserId(), voting.getValue());   
        System.out.println("Voting data has been passed to DB");
    } 
}
