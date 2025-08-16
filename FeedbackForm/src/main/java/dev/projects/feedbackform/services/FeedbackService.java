
package dev.projects.feedbackform.services;

import dev.projects.feedbackform.dto.FeedbackDTO;
import dev.projects.feedbackform.dto.FeedbackResponseDTO;
import dev.projects.feedbackform.dto.FeedbackWithVotesDTO;
import dev.projects.feedbackform.model.Feedback;
import dev.projects.feedbackform.repository.AdminRepository;
import dev.projects.feedbackform.repository.FeedbackRepository;
import java.util.List;
import org.springframework.stereotype.Service;








@Service 
public class FeedbackService {
    
    
    private final FeedbackRepository feedbackRepo;
    private final AdminRepository adminRepo;
    
    public FeedbackService(FeedbackRepository feedbackRepo, AdminRepository adminRepo) {
        this.feedbackRepo = feedbackRepo;
        this.adminRepo = adminRepo;
    }
    
    
    //process the data from controller to repository
    //this method will be used to controller level
    public void registerFeedback(FeedbackDTO feedbackDTO) {
        
        
        String status = "Pending";
        
        Feedback feedback = new Feedback();
        
        feedback.setTitle(feedbackDTO.getTitle());
        feedback.setDescription(feedbackDTO.getDescription());
        feedback.setUsername(feedbackDTO.getUsername());
        feedback.setEmail(feedbackDTO.getEmail());
        feedback.setStatus(status);
        
        feedbackRepo.saveFeedback(feedback);
        
        System.out.println("Feedback has been passed to Feedback Repository");
    }
    
    
    
    //get all the feedbacks 
    public List<FeedbackWithVotesDTO> getAllFeedbackWithVotes() {
        
        System.out.println("Feedback with votes has been passed to Admin Repository");
        
        return adminRepo.findAllWithVotes();
    }
    
    
    
    //update feedback status from the admin 
    public void updateFeedbackStatus(int feedbackId, String status) {
        
        feedbackRepo.updateFeebackStatus(feedbackId, status);
        
        System.out.println("Feedback status has been passed now to Controller");
        
    }
    
    
    //reply feedback from the admin
    public void replyFeedback(FeedbackResponseDTO feedbackRespose) {
        
        adminRepo.feedbackReponse(feedbackRespose);
        
        
        System.out.println("Admin response has been passed to DB");
    }
}
