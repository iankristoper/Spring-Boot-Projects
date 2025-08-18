
package dev.testing.securitytest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/user")
public class UserController {
    
    
    @GetMapping("/access") 
    public String access() {
        return "This is for user";
    }
    
}
