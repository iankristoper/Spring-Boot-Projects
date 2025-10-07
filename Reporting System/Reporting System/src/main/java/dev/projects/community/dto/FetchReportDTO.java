
package dev.projects.community.dto;

import java.time.LocalDateTime;
import org.springframework.stereotype.Service;

/**
 *
 * @author 
 */



@Service
public class FetchReportDTO {
    
    private String title;
    private String category;
    private String status;
    private String dateCreated;
    
    
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

    
    
    
    
    
}
