
package dev.practice.JwtTesting.controller;

import dev.practice.JwtTesting.config.JwtGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author dev
 */




@RestController
@RequestMapping("/auth")
public class AuthController {

    
    private final AuthenticationManager authManager;
    private final JwtGenerator jwtGenerator;
    

    public AuthController(AuthenticationManager authManager, JwtGenerator jwtGenerator) {
        this.authManager = authManager;
        this.jwtGenerator = jwtGenerator;
    }

    
    
    /**
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String role) {
        // ⚠️ This is simplified (normally you'd check username+password from DB)
        String token = jwtGenerator.generateToken(username, role);
        return ResponseEntity.ok(token);
    }
    */
    
    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );
        

        if (authentication.isAuthenticated()) {
            
            String role = authentication.getAuthorities().iterator().next().getAuthority();
            return jwtGenerator.generateToken(username, role);
        }
        
        throw new RuntimeException("Invalid credentials");
    }
   
    
    
}
