
package dev.projects.feedbackform.services;

import dev.projects.feedbackform.dto.UserRegistrationDTO;
import dev.projects.feedbackform.model.User;
import dev.projects.feedbackform.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;





@Service
public class UserService {
    
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }
    
    
    //dto to model - user registration
    public void registerUser(UserRegistrationDTO userRegDTO) {
        
        User user = new User();
        
        //convert the string password to cyrpted password
        String rawPassword = userRegDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        String roles = "ROLE_USER";
           
        user.setUsername(userRegDTO.getUsername());
        user.setPassword(encodedPassword);
        user.setRoles(roles);
               
        userRepo.registerUser(user);
    }
    
    
    
    
    
    
    
    
}
