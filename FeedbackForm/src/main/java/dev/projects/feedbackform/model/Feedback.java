
package dev.projects.feedbackform.model;

import java.time.LocalDateTime;




public class Feedback {
    
    
    private int id;
    private String title;
    private String description;
    private String username;
    private String email;
    private String status;
    private LocalDateTime createdTime;

    
    
    
    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    
    
    
    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }
 
}
