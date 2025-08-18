
package dev.testing.securitytest.services;

import dev.testing.securitytest.dto.LoginDetails;
import dev.testing.securitytest.repository.LoginRepository;
import org.springframework.stereotype.Service;




@Service
public class LoginService {
    
    
    private final LoginRepository loginRepo;
    
    
    public LoginService(LoginRepository loginRepo) {
        this.loginRepo = loginRepo;
    }
    
    
    public void checkUserDetails(String username) {
        
        loginRepo.findUserByUsername(username);
        System.out.println("checkUserDetails from Service has been loaded");
        System.out.println("loginRepo.findUserByUsername(username); has been called");
    }
}
