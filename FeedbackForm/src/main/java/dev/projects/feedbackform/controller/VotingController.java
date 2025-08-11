
package dev.projects.feedbackform.controller;

import dev.projects.feedbackform.model.User;
import dev.projects.feedbackform.model.Voting;
import dev.projects.feedbackform.repository.UserRepository;
import dev.projects.feedbackform.repository.VotingRepository;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/voting")
public class VotingController {
    
    
    private final UserRepository userRepo;
    private final VotingRepository votingRepo;
    
    
    public VotingController(UserRepository userRepo, VotingRepository votingRepo) {
        this.userRepo = userRepo;
        this.votingRepo = votingRepo;
    }
    
    
    
    @PostMapping("/user/{feedbackId}/vote")
    public ResponseEntity<String> vote(@PathVariable int feedbackId, @RequestParam int value, Principal principal) {
        
        
        //get username from the login user
        String username = principal.getName();
        
        
        //fetch user from the db
        User user = userRepo.findByUsername(username);
        
        
        //get the user id 
        int userId = user.getId();
        
        
        //create the vote object
        Voting vote = new Voting();
        vote.setFeedbackId(feedbackId);
        vote.setUserId(userId);
        vote.setValue(value);
        
        
        //save vote...
        votingRepo.saveVotes(vote);
        
        
        return ResponseEntity.ok("Voting has been passed to Voting Repository");
    }
    
}
