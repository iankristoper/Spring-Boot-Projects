
package dev.projects.community.dto;

import dev.projects.community.model.PriorityLevel;
import dev.projects.community.model.ReportCategory;

/**
 *
 * @author noob
 */



public class ReportDTO {
    
    private String title;
    private String description;
    private ReportCategory category;
    private PriorityLevel priority;
    private String location;
    private String media;
    private String status;
    private String action;
    private int userId;

 
    

    
    //getters

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
    
    
    public String getStatus() {
        return status;
    }

    public String getAction() {
        return action;
    }

    public int getUserId() {
        return userId;
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

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    
    
    
}
