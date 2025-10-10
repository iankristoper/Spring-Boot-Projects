
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
    
    
    public void createReport(Report report) {
        
        String sql = "INSERT INTO reports(title, description, category, priority, location, media, createdAt, user_id) VALUES(?,?,?,?,?,?,?,?)";
        
        jdbc.update(sql, report.getTitle(), report.getDescription(), report.getCategory().name(), report.getPriority().name(), report.getLocation(), report.getMedia(), report.getCreatedAt(),report.getUserId());
        
    }
    
    
    
    public List<FetchReportDTO> fetchReportsByUserId(int userId) {
        
        String sql = "SELECT id, title, category, status, createdAt FROM reports WHERE user_id =? ORDER BY createdAt DESC";
        
        
        return jdbc.query(sql, (rs, rowNum) -> {
            
            FetchReportDTO fetchReport = new FetchReportDTO();
            
            fetchReport.setId(rs.getInt("id"));
            fetchReport.setTitle(rs.getString("title"));
            fetchReport.setCategory(rs.getString("category"));
            fetchReport.setStatus(rs.getString("status"));
            fetchReport.setDateCreated(rs.getString("createdAt"));
            
            
            return fetchReport;
            
        }, userId);
    }
    
    
    
    public FetchReportDTO fetchPerReport(int reportId) {
        String sql = "SELECT id, title, category, status, createdAt, priority, location, media FROM reports WHERE id = ?";
        
        return jdbc.queryForObject(sql, (rs, rowNum) -> {
            
            FetchReportDTO fetchPerReport = new FetchReportDTO();
            
            fetchPerReport.setId(rs.getInt("id"));
            fetchPerReport.setTitle(rs.getString("title"));
            fetchPerReport.setCategory(rs.getString("category"));
            fetchPerReport.setStatus(rs.getString("status"));
            fetchPerReport.setDateCreated(rs.getString("createdAt"));
            fetchPerReport.setPriority(rs.getString("priority"));
            fetchPerReport.setLocation(rs.getString("location"));
            fetchPerReport.setMedia(rs.getString("media"));
            
            return fetchPerReport;
        }, reportId);
    }
    
    
    
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
    
}
