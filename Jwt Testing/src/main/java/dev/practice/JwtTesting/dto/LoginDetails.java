
package dev.practice.JwtTesting.dto;

/**
 *
 * @author dev
 */


public class LoginDetails {
    
    private String username;
    private String password;
    private String roles;

    
    
    
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRoles() {
        return roles;
    }

    
    
    
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
    
    
}
