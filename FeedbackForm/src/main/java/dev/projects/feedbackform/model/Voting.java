
package dev.projects.feedbackform.model;




public class Voting {
    
    private int id;
    private int feedbackId;
    private int userId;
    private int value;

    
    
    public int getId() {
        return id;
    }

    public int getFeedbackId() {
        return feedbackId;
    }

    public int getUserId() {
        return userId;
    }

    public int getValue() {
        return value;
    }
    
    
    

    public void setId(int id) {
        this.id = id;
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
