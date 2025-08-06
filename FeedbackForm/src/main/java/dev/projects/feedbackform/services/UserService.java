
package dev.projects.feedbackform.services;

import dev.projects.feedbackform.dto.UserRegistrationDTO;
import dev.projects.feedbackform.model.User;
import dev.projects.feedbackform.repository.UserRepository;
import org.springframework.stereotype.Service;





@Service
public class UserService {
    
    public final UserRepository userRepo;
    
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
    
    
    //dto to model - user registration
    public void registerUser(UserRegistrationDTO userRegDTO) {
        
        User user = new User();
           
        user.setUsername(userRegDTO.getUsername());
        user.setPassword(userRegDTO.getPassword());
               
        userRepo.registerUser(user);
    }
    
    
    
    
    
    
    
    
}
