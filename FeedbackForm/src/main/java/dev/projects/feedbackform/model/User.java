
package dev.projects.feedbackform.model;




public class User {
    
    private int id;
    private String username;
    private String password;
    private String feedback;
    private int ratings;
    
    
    //getters and setters 
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    
    
    public String getFeedback() {
        return feedback;
    }
    
    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
    
    
    
    public int getRatings() {
        return ratings;
    }
    
    public void setRatings(int ratings) {
        this.ratings = ratings;
    }
}
