
package dev.projects.community.model;

import java.time.LocalDateTime;



/**
 *
 * @author noob
 */



public class Report {
    
    private String title;
    private String description;
    private ReportCategory category;
    private PriorityLevel priority;
    private String location;
    private String media;
    private LocalDateTime createdAt;
    
    
    
    
    //for minor automation - we used constructor for the local time 
    public Report() {
        this.createdAt = LocalDateTime.now();
    }
    
    
    
    
    //setter 
    
    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(ReportCategory category) {
        this.category = category;
    }

    public void setPriority(PriorityLevel priority) {
        this.priority = priority;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    
    
    
    //getter

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public ReportCategory getCategory() {
        return category;
    }

    public PriorityLevel getPriority() {
        return priority;
    }

    public String getLocation() {
        return location;
    }

    public String getMedia() {
        return media;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    } 
}
