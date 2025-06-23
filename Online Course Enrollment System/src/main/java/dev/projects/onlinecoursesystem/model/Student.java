
package dev.projects.onlinecoursesystem.model;

/**
 *
 * @author noob
 */





public class Student {
    
    private int id;
    private String fname;
    private String lname;
    private String email;
    private String password;
    private String role;
    
    
    //
    public Student() {
        
    }
    
    
    //
    public Student(int id, String fname, String lname, String email, String password, String role) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    
    
    //getters and setters
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    
    public String getFirstName() {
        return fname;
    }
    
    public void setFirstName(String fname) {
        this.fname = fname;
    }
    
    
    public String getLastName() {
        return lname;
    }
    
    public void setLastName(String lname) {
        this.lname = lname;
    }
    
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
}







































