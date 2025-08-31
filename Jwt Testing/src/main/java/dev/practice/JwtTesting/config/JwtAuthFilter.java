
package dev.practice.JwtTesting.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;




/**
 *
 * @author dev
 */



@Service
public class JwtAuthFilter extends OncePerRequestFilter {
    
    
    private final JwtValidator jwtValidator;
    
    
    public JwtAuthFilter(JwtValidator jwtValidator) {
        this.jwtValidator  = jwtValidator;
    }
    
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, java.io.IOException {
        
        
        String header = request.getHeader("Authorization");
        

        if (header != null && header.startsWith("Bearer ")) {
            
            String token = header.substring(7);
            
            try {
                
                Claims claims = jwtValidator.extractAllClaims(token);

                String username = claims.getSubject();
                String role = claims.get("role", String.class);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(username, null,
                                List.of(new SimpleGrantedAuthority(role)));

                SecurityContextHolder.getContext().setAuthentication(auth);
                
            } catch (Exception e) {
                
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            
        }

        filterChain.doFilter(request, response);
    }
    
}
