
package dev.projects.community.repository;

import dev.projects.community.dto.ReportDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author noob
 */


@Repository
public class AdminRepository {
    
    
    private final JdbcTemplate jdbc;
    
    
    
    public AdminRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    
    
    public void updateStatusReport(ReportDTO status, int reportId) {
        
        String sql = "UPDATE reports SET status=? WHERE id=?";
        
        jdbc.update(sql, status.getStatus(), reportId);
    }
}
