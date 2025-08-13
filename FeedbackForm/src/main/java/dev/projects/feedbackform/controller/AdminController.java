
package dev.projects.feedbackform.controller;

import dev.projects.feedbackform.dto.FeedbackWithVotesDTO;
import dev.projects.feedbackform.services.FeedbackService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;





@RestController
@RequestMapping("/admin")
public class AdminController {
    
    
    private final FeedbackService feedbackService;
    
    
    public AdminController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }
    
    
    //get the feedback with votes
    @GetMapping("/feedbacks")
    public List<FeedbackWithVotesDTO> getAllFeedbacks() {
        return feedbackService.getAllFeedbackWithVotes();
    }
}
