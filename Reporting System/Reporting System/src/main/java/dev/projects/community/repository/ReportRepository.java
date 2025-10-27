
package dev.projects.community.repository;

import dev.projects.community.dto.FetchReportDTO;
import dev.projects.community.model.Report;
import java.util.ArrayList;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;




/**
 *
 * @author noob
 */


@Repository
public class ReportRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    public ReportRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    
    //CRUD OPERATION FOR THE REPORTS
    
    
    /*
        This part is for creating the report and passing to the db 
    */
    public void createReport(Report report) {
        
        String sql = "INSERT INTO reports(title, description, category, priority, location, media, createdAt, user_id) VALUES(?,?,?,?,?,?,?,?)";
        
        jdbc.update(sql, report.getTitle(), report.getDescription(), report.getCategory().name(), report.getPriority().name(), report.getLocation(), report.getMedia(), report.getCreatedAt(),report.getUserId());
        
    }
    
    
    
    /**
     * This is for fetching the report per ID 
    */
    public List<FetchReportDTO> fetchReportsByUserId(int userId) {
        
        String sql = "SELECT id, title, description, category, status, createdAt FROM reports WHERE user_id =? ORDER BY createdAt DESC";
        
        
        return jdbc.query(sql, (rs, rowNum) -> {
            
            FetchReportDTO fetchReport = new FetchReportDTO();
            
            fetchReport.setId(rs.getInt("id"));
            fetchReport.setTitle(rs.getString("title"));
            fetchReport.setDescription(rs.getString("description"));
            fetchReport.setCategory(rs.getString("category"));
            fetchReport.setStatus(rs.getString("status"));
            fetchReport.setDateCreated(rs.getString("createdAt"));
            
            
            return fetchReport;
            
        }, userId);
    }
    
    
    
    /**
     * fetching each report 
     */
    public FetchReportDTO fetchPerReport(int reportId) {
        String sql = "SELECT id, title, description, category, status, createdAt, priority, location, media FROM reports WHERE id = ?";
        
        return jdbc.queryForObject(sql, (rs, rowNum) -> {
            
            FetchReportDTO fetchPerReport = new FetchReportDTO();
            
            fetchPerReport.setId(rs.getInt("id"));
            fetchPerReport.setTitle(rs.getString("title"));
            fetchPerReport.setDescription(rs.getString("description"));
            fetchPerReport.setCategory(rs.getString("category"));
            fetchPerReport.setStatus(rs.getString("status"));
            fetchPerReport.setDateCreated(rs.getString("createdAt"));
            fetchPerReport.setPriority(rs.getString("priority"));
            fetchPerReport.setLocation(rs.getString("location"));
            fetchPerReport.setMedia(rs.getString("media"));
            
            return fetchPerReport;
        }, reportId);
    }
    
    
    
    /**
     * fetching all reports in one go
     */
    public List<FetchReportDTO> fetchAll() {
        
        String sql = "SELECT * FROM reports";
        
        return jdbc.query(sql, (rs, rowNum) -> {
            
            FetchReportDTO fetchAllReport = new FetchReportDTO();
            
            fetchAllReport.setId(rs.getInt("id"));
            fetchAllReport.setTitle(rs.getString("title"));
            fetchAllReport.setDescription(rs.getString("description"));
            fetchAllReport.setCategory(rs.getString("category"));
            fetchAllReport.setStatus(rs.getString("status"));
            fetchAllReport.setDateCreated(rs.getString("createdAt"));
            fetchAllReport.setPriority(rs.getString("priority"));
            fetchAllReport.setLocation(rs.getString("location"));
            fetchAllReport.setMedia(rs.getString("media"));
            
            return fetchAllReport;
        });
    }
    
    
    
    
    /**
     * Updating records of reports 
     */
    public void udpateReport(FetchReportDTO reportUpdate, int reportId) {
        
        // Start building the SQL query
        StringBuilder sql = new StringBuilder("UPDATE reports SET ");
        List<Object> params = new ArrayList<>();

        
        // Check each field – only update if it's not null
        if (reportUpdate.getTitle() != null) {
            sql.append("title = ?, ");
            params.add(reportUpdate.getTitle());
        }
        
        if (reportUpdate.getDescription() != null) {
            sql.append("description = ?, ");
            params.add(reportUpdate.getDescription());
        }
        
        if (reportUpdate.getCategory() != null) {
            sql.append("category = ?, ");
            params.add(reportUpdate.getCategory());
        }
        
        if (reportUpdate.getPriority() != null) {
            sql.append("priority = ?, ");
            params.add(reportUpdate.getPriority());
        }
        
        if (reportUpdate.getLocation() != null) {
            sql.append("location = ?, ");
            params.add(reportUpdate.getLocation());
        }
        
        if (reportUpdate.getMedia() != null) {
            sql.append("media = ?, ");
            params.add(reportUpdate.getMedia());
        }

        // If no fields to update, just return
        if (params.isEmpty()) {
            return;
        }

        // Remove the trailing comma and space
        sql.setLength(sql.length() - 2);

        // Add WHERE clause
        sql.append(" WHERE id = ?");
        params.add(reportId);

        // Execute the update
        jdbc.update(sql.toString(), params.toArray());
    }
    
    
    
    /**
     * Deleting reports by id
     */
    public boolean deleteReportById(int id) {
        
        String sql = "DELETE FROM reports WHERE id = ?";
        
        int rowsAffected = jdbc.update(sql, id);
        
        return rowsAffected > 0;
    }
    
    
    
    /**
     * Archiving reports by changing the value from zero to one
     */
    public boolean archiveReportById(int id) {
        
        String sql = "UPDATE reports SET is_archive = 1 WHERE id = ?";
        
        int rowsAffected = jdbc.update(sql, id);
        
        return rowsAffected > 0;
        
    }    
}
