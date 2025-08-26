
package dev.practice.JwtTesting.config;

import dev.practice.JwtTesting.dto.LoginDetails;
import dev.practice.JwtTesting.repository.LoginRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



/**
 *
 * @author dev
 */




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
            throw new UsernameNotFoundException("not found");
        }
        
        
        //get the data and pass it to the UserDetails
        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRoles().replace("ROLE_", ""))
                .build();
    }
}
