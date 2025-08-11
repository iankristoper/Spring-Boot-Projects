
package dev.projects.feedbackform.dto;





public class VotingDTO {
    
    private int feedbackId;
    private int userId;
    private int value;
    
    

    public int getFeedbackId() {
        return feedbackId;
    }

    public int getUserId() {
        return userId;
    }

    public int getValue() {
        return value;
    }
    
    

    public void setFeedbackId(int feedbackId) {
        this.feedbackId = feedbackId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setValue(int value) {
        this.value = value;
    }
    
    
    
}
