
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
@RequestMapping("/testing/jwt")
public class JwtTestController {
    
    
    private final JwtGenerator jwtGenerate;
    
    
    public JwtTestController(JwtGenerator jwtGenerate) {
        this.jwtGenerate = jwtGenerate;
    }
    
    
    @GetMapping("/generate")
    public String testGenerate() {
        return jwtGenerate.generateToken("Ian", "Admin");
    }
}
