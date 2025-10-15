
package dev.projects.community.controller;

import dev.projects.community.dto.ReportDTO;
import dev.projects.community.repository.AdminRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author noob
 */


@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    
    private final AdminRepository adminRepo;
    
    public AdminController(AdminRepository adminRepo) {
        this.adminRepo = adminRepo;
    }
    
    
    @GetMapping("/testing")
    public String testing() {
        return "Hello Admin -> Testing only!";
    }
    
    
    @PutMapping("/update/report-status/{id}")
    public ResponseEntity<?> updateReportStatus(@PathVariable int id, @RequestBody ReportDTO status) {
        try {
            adminRepo.updateStatusReport(status, id);
            return ResponseEntity.ok("Report status updated successfully.");
                    
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update report status.");
        }
        
    }
    
    
    @DeleteMapping("/report/delete/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable int id) {
        
        try {
            adminRepo.deleteReport(id);
            return ResponseEntity.ok("Report deleted successfully");
        
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to delete report");
        }
    }
    
    
    
    
}
