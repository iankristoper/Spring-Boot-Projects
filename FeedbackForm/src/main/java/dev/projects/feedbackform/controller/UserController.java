
package dev.projects.feedbackform.controller;

import dev.projects.feedbackform.dto.FeedbackDTO;
import dev.projects.feedbackform.dto.FeedbackResponseDTO;
import dev.projects.feedbackform.model.User;
import dev.projects.feedbackform.model.Voting;
import dev.projects.feedbackform.repository.UserRepository;
import dev.projects.feedbackform.repository.VotingRepository;
import dev.projects.feedbackform.services.FeedbackService;
import java.security.Principal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;





@RestController
@RequestMapping("/user")
public class UserController {
    

    private final FeedbackService feedbackService;
    private final UserRepository userRepo;
    private final VotingRepository votingRepo;

    
    public UserController(FeedbackService feedbackService, UserRepository userRepo, VotingRepository votingRepo) {
        this.feedbackService = feedbackService;
        this.userRepo = userRepo;
        this.votingRepo = votingRepo;
    }
    
    

    @PostMapping(value = "/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        
        feedbackService.registerFeedback(feedbackDTO);
        
        return ResponseEntity.ok("Feedback Data has been passed to Feedback Service");
    }


 

    @PostMapping(value = "/{feedbackId}/vote")
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
    
    
    
    
    //display response from the admin using id
    @GetMapping("/replies/{feedbackId}")
    public ResponseEntity<List<FeedbackResponseDTO>> getAdminResponse(@PathVariable int feedbackId) {
        
        List<FeedbackResponseDTO> replies = userRepo.findFeedbackById(feedbackId);
        
        return ResponseEntity.ok(replies);
    }
    
    
    
}
