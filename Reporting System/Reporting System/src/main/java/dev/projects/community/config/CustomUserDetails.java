
package dev.projects.community.config;

import java.util.Collection;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 *
 * @author noob
 */


@Service
public class CustomUserDetails implements UserDetails {
    
    
    private String username;
    private String password;
    private String role;
    private String city;
    
    
    public CustomUserDetails(String username, String password, String role, String city) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.city = city;
    }
    
    
    public String getCity() {
        return city;
    }

    
    //This tells Spring what role the user has
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role));
    }

    
    
    //Required by Spring Security
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
    
    
    
    
    //optional for now
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
