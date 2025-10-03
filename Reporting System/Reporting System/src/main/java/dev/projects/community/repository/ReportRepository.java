
package dev.projects.community.repository;

import dev.projects.community.model.Report;
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
        
        String sql = "INSERT INTO reports(title, description, category, priority, location, media, createdAt) VALUES(?,?,?,?,?,?,?)";
        
        jdbc.update(sql, report.getTitle(), report.getDescription(), report.getCategory(), report.getPriority(), report.getLocation(), report.getMedia(), report.getCreatedAt());
        
    }
    
}
