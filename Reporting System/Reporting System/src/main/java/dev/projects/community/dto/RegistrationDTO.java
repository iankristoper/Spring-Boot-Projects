
package dev.projects.community.dto;

/**
 *
 * @author noob
 */



public class RegistrationDTO {
    
    private String username;
    private String email;
    private String password;
    private String city;
    //private String role;

    
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getCity() {
        return city;
    }

    /*public String getRole() {
        return role;
    }
    */
    
    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCity(String city) {
        this.city = city;
    }

    
    /*
    public void setRole(String role) {
        this.role = role;
    }
    */
}
