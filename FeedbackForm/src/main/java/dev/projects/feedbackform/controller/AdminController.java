
package dev.projects.feedbackform.controller;

import dev.projects.feedbackform.dto.FeedbackResponseDTO;
import dev.projects.feedbackform.dto.FeedbackWithVotesDTO;
import dev.projects.feedbackform.services.FeedbackService;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
    
    
    //update the status from the admin side
    @PutMapping("/update/{id}/status")
    public ResponseEntity<String> updateFeedbackStatus(@PathVariable int id, @RequestBody Map<String, String> request) {
        
        String newStatus = request.get("status"); // e.g. "Ongoing", "Pending", "Resolved"
        
        
        feedbackService.updateFeedbackStatus(id, newStatus);
        
        
        return ResponseEntity.ok("Status has been updated");
    
    }
    
    
    
    //reply feedbacks from the user
    @PostMapping("/response")
    public ResponseEntity<String> feedbackResponse(@RequestBody FeedbackResponseDTO feedbackResponse) {
        
        feedbackService.replyFeedback(feedbackResponse);
        
        return ResponseEntity.ok("Response has been sent to FeebackService");
        
    }
    
    
    
    

}
