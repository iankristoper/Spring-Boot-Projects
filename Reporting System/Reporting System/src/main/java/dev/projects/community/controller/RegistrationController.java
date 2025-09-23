
package dev.projects.community.controller;

import dev.projects.community.dto.RegistrationDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author noob
 */


@RestController
@RequestMapping("/signup")
public class RegistrationController {
    
    
    private final dev.projects.community.mapper.RegistrationMapper registrationMapper;
    
    
    public RegistrationController(dev.projects.community.mapper.RegistrationMapper registrationMapper) {
        this.registrationMapper = registrationMapper;
    }
    
    
    
    //this is for the registration controller
    //it will fetch the data from the user and pass it to the db
    @PostMapping("/user")
    public ResponseEntity<String> registrationController(@RequestBody RegistrationDTO registrationDTO) {
        
        registrationMapper.registrationMapper(registrationDTO);
        
        return ResponseEntity.ok("User: " + registrationDTO.getUsername() + " -> Success Registration");
    }
    
}
