
package dev.projects.feedbackform.services;

import dev.projects.feedbackform.dto.VotingDTO;
import dev.projects.feedbackform.model.Voting;
import dev.projects.feedbackform.repository.VotingRepository;
import org.springframework.stereotype.Service;




@Service
public class VotingService {
    
    
    private final VotingRepository votingRepo;
    
    
    public VotingService(VotingRepository votingRepo) {
        this.votingRepo = votingRepo;
    }
    
    
    
    public void registerVote(VotingDTO votingDTO) {
        
        Voting voting = new Voting();
        
        
        voting.setFeedbackId(votingDTO.getFeedbackId());
        voting.setUserId(votingDTO.getUserId());
        voting.setValue(votingDTO.getValue());
        
        
        votingRepo.saveVotes(voting);
        
        System.out.println("Voting data has been passed to Voting Repository");
        
    }
}
