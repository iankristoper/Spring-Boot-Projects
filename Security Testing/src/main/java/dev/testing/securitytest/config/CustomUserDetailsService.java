
package dev.testing.securitytest.config;

import dev.testing.securitytest.dto.LoginDetails;
import dev.testing.securitytest.repository.LoginRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class CustomUserDetailsService implements UserDetailsService{
    
    
    private final LoginRepository loginRepo;
    
    
    public CustomUserDetailsService(LoginRepository loginRepo) {
        this.loginRepo = loginRepo;
    }
    
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        
        //get user from the db
        LoginDetails user = loginRepo.findUserByUsername(username);
        
        
        //if not found 
        if(user == null) {
            throw new UsernameNotFoundException("User not found" + username);
        }
        
        
        //return spring security user object 
        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRoles().replace("ROLE_", ""))
                .build();
        
    }
}
