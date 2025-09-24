
package dev.projects.community.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



/**
 *
 * @author noob
 */




@RestController
@RequestMapping("/auth")
public class LoginController {
    
    
    @PostMapping("/login")
    public void login() {
        
        //-> fetch data from the db
        
    }
}
