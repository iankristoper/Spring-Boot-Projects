
package dev.projects.community.repository;

import dev.projects.community.dto.FetchReportDTO;
import dev.projects.community.model.Report;
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
        
        String sql = "SELECT title, category, status, createdAt FROM reports WHERE user_id =? ORDER BY createdAt DESC";
        
        
        return jdbc.query(sql, (rs, rowNum) -> {
            
            FetchReportDTO fetchReport = new FetchReportDTO();
            
            fetchReport.setTitle(rs.getString("title"));
            fetchReport.setCategory(rs.getString("category"));
            fetchReport.setStatus(rs.getString("status"));
            fetchReport.setDateCreated(rs.getString("createdAt"));
            
            
            return fetchReport;
            
        }, userId);
    }
    
}
