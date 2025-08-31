
package dev.practice.JwtTesting.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Service;

/**
 *
 * @author dev
 */



@Service
public class JwtValidator {
    
    
    private final Key secretKey = Keys.hmacShaKeyFor("iamtheserveriamtheserveriamtheserver".getBytes());
    
    
    //extract all claims (username, role, issuer, exp, and etc.)
    Claims extractAllClaims(String token) {
        
        return Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    
    
    
    
    
    
    
    
    
    
    
    /**
    
    * 
    * 
    *  for future purposes
    *  we can use this
    //extract username 
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
    
    
    
    // ✅ Extract role
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    
    
    
    // ✅ Validate token (check expiration & signature)
    public boolean isTokenValid(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    
    
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
    
    */
}
