
package dev.projects.community.services;

import dev.projects.community.dto.RegistrationDTO;
import dev.projects.community.model.User;
import dev.projects.community.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author noob
 */


@Service
public class RegistrationService {
    
    private final UserRepository userRepo;
    
    
    public RegistrationService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
    
    
    //this is registration service and will pass to the registration controller
    public void registrationService(RegistrationDTO registrationDTO) {
        
        User user = new User();
        
        user.setUsername(registrationDTO.getUsername());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(registrationDTO.getPassword());
        user.setCity(registrationDTO.getCity());
        user.setRole("USER");
        
        userRepo.registerUser(user);
        
    }
    
}
