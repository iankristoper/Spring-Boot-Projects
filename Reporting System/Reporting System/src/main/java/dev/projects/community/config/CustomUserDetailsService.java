package dev.projects.community.config;

import dev.projects.community.model.User;
import dev.projects.community.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 * @author noob
 */


@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    
    private final UserRepository userRepo;

    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
    
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        User user = userRepo.findByUsername(username);
        
        
        //conditions 
        if(user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        
        return new CustomUserDetails(user);
        
    }
}
