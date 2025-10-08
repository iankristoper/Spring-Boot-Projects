
package dev.projects.community.dto;

import org.springframework.stereotype.Service;

/**
 *
 * @author 
 */



@Service
public class FetchReportDTO {
    
    private int id;
    private String title;
    private String category;
    private String status;
    private String dateCreated;
    private String priority;
    private String location;
    private String media;
    
    
    //getters and setters 

    
    
    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getStatus() {
        return status;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public String getPriority() {
        return priority;
    }

    public String getLocation() {
        return location;
    }

    public String getMedia() {
        return media;
    }

    public int getId() {
        return id;
    }

    

    
    
    
    public void setTitle(String title) {
        this.title = title;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    public void setId(int id) {
        this.id = id;
    }
 
    
}
