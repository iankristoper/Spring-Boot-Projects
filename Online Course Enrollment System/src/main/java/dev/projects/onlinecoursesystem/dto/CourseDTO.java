
package dev.projects.onlinecoursesystem.dto;






public class CourseDTO {
    
    private int id;
    private String courseCode;
    private String courseName;
    private String status;
    private int slots;
    private String instructor;
    
    
    //getters and setters 
    
  
    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }
    
    public String getCourseCode() {
        return courseCode;
    }
    
    
    
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    
    public String getCourseName() {
        return courseName;
    }
    
    
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getStatus() {
        return status;
    }
    
    
    
    public void setSlots(int slots) {
        this.slots = slots;
    }
    
    public int getSlots() {
        return slots;
    }
    
    
    
    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }
    
    public String getInstructor() {
        return instructor;
    }
}
