
package dev.projects.onlinecoursesystem.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/public")
public class GeneralController {
      
        
    @GetMapping("/whoami")
    public String whoAmI(Authentication authentication) {
        return "Logged in as: " + authentication.getName() + ", Roles: " + authentication.getAuthorities();
    }
}
