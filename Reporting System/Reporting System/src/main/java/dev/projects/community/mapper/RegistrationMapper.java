
package dev.projects.community.mapper;

import dev.projects.community.dto.RegistrationDTO;
import dev.projects.community.model.User;
import dev.projects.community.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author noob
 */


@Service
public class RegistrationMapper {
    
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    
    
    public RegistrationMapper(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }
    
    
    //this is registration service and will pass to the registration controller
    //dto to model
    public void registrationMapper(RegistrationDTO registrationDTO) {
        
        String rawPassword = registrationDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        
        
        User user = new User();
        
        user.setUsername(registrationDTO.getUsername());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(encodedPassword);
        user.setCity(registrationDTO.getCity());
        user.setRole("USER");
        
        userRepo.registerUser(user);
        
    }
    
}
