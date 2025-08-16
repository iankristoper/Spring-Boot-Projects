
package dev.projects.feedbackform.dto;

import java.time.LocalDateTime;






public class FeedbackResponseDTO {
    
    
    private int id;
    private int feedbackId;
    private String adminReponse;
    private LocalDateTime createdAt;

    
    
    
    
    
    public int getId() {
        return id;
    }

    public int getFeedbackId() {
        return feedbackId;
    }

    public String getAdminReponse() {
        return adminReponse;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    
    
    
    
    
    public void setId(int id) {
        this.id = id;
    }
     
    public void setFeedbackId(int feedbackId) {
        this.feedbackId = feedbackId;
    }

    public void setAdminReponse(String adminReponse) {
        this.adminReponse = adminReponse;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    
}
