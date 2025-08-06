
package dev.projects.feedbackform.controller;

import dev.projects.feedbackform.dto.UserRegistrationDTO;
import dev.projects.feedbackform.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;






@RestController
@RequestMapping("/register")
public class RegistrationController {
    
    private final UserService userService;
    
    public RegistrationController(UserService userService) {
        this.userService = userService;
    }
    
    
    @PostMapping()
    public ResponseEntity<String> register(@RequestBody UserRegistrationDTO userRegDTO) {
        
        userService.registerUser(userRegDTO);
        
        return ResponseEntity.ok("Registration details has been passed on to db");
    }
    
    
    @GetMapping("greetings") 
    public String greetings() {
        return "Hello testing";
    }
    
}
