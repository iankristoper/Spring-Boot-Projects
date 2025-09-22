
package dev.projects.community.mapper;

import dev.projects.community.dto.RegistrationDTO;
import dev.projects.community.services.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author noob
 */


@Controller
@RequestMapping("/signup")
public class RegistrationMapper {
    
    
    private final RegistrationService registrationService;
    
    
    public RegistrationMapper(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }
    
    
    
    //this is for the registration controller
    //it will fetch the data from the user and pass it to the db
    @PostMapping("/user")
    public ResponseEntity<String> registrationController(@RequestBody RegistrationDTO registrationDTO) {
        
        registrationService.registrationService(registrationDTO);
        
        return ResponseEntity.ok("User registered successfully!");
    }
    
}
