
package dev.projects.community.controller;

import dev.projects.community.dto.RegistrationDTO;
import dev.projects.community.mapper.RegistrationMapper;
import java.util.Map;
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
@RequestMapping("/api/auth")
public class RegistrationController {
    
    
    private final RegistrationMapper registrationMapper;
    
    
    public RegistrationController(RegistrationMapper registrationMapper) {
        this.registrationMapper = registrationMapper;
    }
    
    
    
    //this is for the registration controller
    //it will fetch the data from the user and pass it to the db
    @PostMapping("/signup")
    public ResponseEntity<?> registrationController(@RequestBody RegistrationDTO registrationDTO) {
        
        try {
            registrationMapper.registrationMapper(registrationDTO);
            return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
            
        } catch(RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
}
