
package dev.practice.JwtTesting.config;

/**
 *
 * @author dev
 */


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Service;



@Service
public class JwtGenerator {
    
    
    long oneHour = 1000L * 60 * 60;
    
    //secret key generator 
    private final Key secretKey = Keys.hmacShaKeyFor("iamtheserveriamtheserveriamtheserver".getBytes());
    
    
    //build the jwt token 
    public String generateToken(String username, String role) {
        
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
