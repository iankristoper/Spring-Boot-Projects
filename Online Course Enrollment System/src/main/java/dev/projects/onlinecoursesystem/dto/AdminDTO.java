
package dev.projects.onlinecoursesystem.dto;






public class AdminDTO {
    
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    //role is hardcoded
    
    
    //getters and setters 
    
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getlastName() {
        return lastName;
    }
    
    
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getEmail() {
        return email;
    }
    
    
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getPassword() {
        return password;
    }
        
}
