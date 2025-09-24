package dev.projects.community.dto;


/**
 *
 * @author noob
 * 
 */



public class LoginDTO {
    
    private String username;
    private String password;
    private String city;

    
    
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getCity() {
        return city;
    }
    
    

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCity(String city) {
        this.city = city;
    }
    
    
}
