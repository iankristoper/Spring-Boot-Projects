
package dev.practice.JwtTesting.config;

/**
 *
 * @author dev
 */


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Service;



@Service
public class JwtGenerator {
    
    
    long oneHour = 1000L * 60 * 60;
    
    //secret key generator 
    private final String key = "iamtheserveriamtheserveriamtheserver";
    
    
    //build the jwt token 
    public String generateToken(String username, String role) {
        
        // convert String to Key for signing
        Key secretKey = Keys.hmacShaKeyFor(key.getBytes());
        
        return Jwts.builder()
                .setSubject(username)
                .setIssuer("server")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + oneHour))
                .claim("role", role)
                .signWith(secretKey)
                .compact();
                
        
    }
    
}
