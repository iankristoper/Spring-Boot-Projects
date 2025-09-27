
package dev.projects.community.controller;

import dev.projects.community.dto.LoginDTO;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



/**
 *
 * @author noob
 */




@RestController
@RequestMapping("/auth")
public class LoginController {
    
    
    private final AuthenticationManager authManager;
    
    
    public LoginController(AuthenticationManager authManager) {
        this.authManager = authManager;
    }
    
    
    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginDTO) {
        
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                    )
            );
            
            if(authentication.isAuthenticated()) {
                String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("NO_ROLE");

                return "Login Successful! Role: " + role;
            } else {
                return "Login Failed";
            }
        } catch (AuthenticationException e) {
            return "Error: " + e.getMessage();
        }
    }
}
