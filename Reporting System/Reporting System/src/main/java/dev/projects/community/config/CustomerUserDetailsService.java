package dev.projects.community.config;

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
public class CustomerUserDetailsService implements UserDetailsService {
    
    
    private final UserRepository userRepo;

    public CustomerUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
    
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        
        
    }
}
