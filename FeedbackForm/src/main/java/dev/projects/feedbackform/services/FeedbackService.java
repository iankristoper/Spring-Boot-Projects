
package dev.projects.feedbackform.services;

import dev.projects.feedbackform.dto.FeedbackDTO;
import dev.projects.feedbackform.model.Feedback;
import dev.projects.feedbackform.repository.FeedbackRepository;
import org.springframework.stereotype.Service;








@Service 
public class FeedbackService {
    
    
    private final FeedbackRepository feedbackRepo;
    
    public FeedbackService(FeedbackRepository feedbackRepo) {
        this.feedbackRepo = feedbackRepo;
    }
    
    
    //process the data from controller to repository
    //this method will be used to controller level
    public void registerFeedback(FeedbackDTO feedbackDTO) {
        
        Feedback feedback = new Feedback();
        
        feedback.setTitle(feedbackDTO.getTitle());
        feedback.setDescription(feedbackDTO.getDescription());
        feedback.setUsername(feedbackDTO.getUsername());
        feedback.setEmail(feedback.getEmail());
        feedback.setStatus(feedbackDTO.getStatus());
        
        feedbackRepo.saveFeedback(feedback);
        
        System.out.println("Feedback has been passed to Feedback Repository");
    }
    
}
