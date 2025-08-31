
package dev.practice.JwtTesting.controller;

import dev.practice.JwtTesting.config.JwtGenerator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author dev
 */



@RestController
@RequestMapping
public class JwtTestController {
    
    
    private final JwtGenerator jwtGenerate;
    
    
    public JwtTestController(JwtGenerator jwtGenerate) {
        this.jwtGenerate = jwtGenerate;
    }
    
    
    @GetMapping("/admin/test")
    public String adminTest() {
        return "This is for the admin";
    }
    
    
    
    
    @GetMapping("/user/test")
    public String userTest() {
        return "This is for the user";
    }
    
    
    
}
