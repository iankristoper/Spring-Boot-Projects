
package dev.projects.feedbackform.controller;

import dev.projects.feedbackform.dto.FeedbackDTO;
import dev.projects.feedbackform.services.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    
    
    private final FeedbackService feedbackService;
    
    
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }
    
    
    
    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        
        feedbackService.registerFeedback(feedbackDTO);
        
        return ResponseEntity.ok("Feedback Data has been passed to Feedback Service");
    }
}
