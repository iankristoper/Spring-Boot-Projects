

package dev.projects.community.controller;



import dev.projects.community.dto.FetchReportDTO;
import dev.projects.community.dto.ReportDTO;
import dev.projects.community.mapper.ReportMapper;
import dev.projects.community.model.Report;
import dev.projects.community.model.User;
import dev.projects.community.repository.UserRepository;
import java.security.Principal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author noob
 */


@RestController
@RequestMapping("/api/reports")
public class ReportController {
    
    
    private final ReportMapper reportMapper;
    private final UserRepository userRepo;
    
    
    public ReportController(ReportMapper reportMapper, UserRepository userRepo) {
        this.reportMapper = reportMapper;
        this.userRepo = userRepo;
    }
    
    
    
    @PostMapping("/create")
    public ResponseEntity<?> createReportController(@RequestBody ReportDTO reportDTO, Principal principal) {
        
        User user = userRepo.findByUsername(principal.getName());
        
        Report saveReport = reportMapper.reportMapperToCreate(reportDTO, user.getUserId());
        
        return ResponseEntity.ok(saveReport);
    }
    
    
    
    @GetMapping("/fetch")
    public ResponseEntity<?> fetchReportController(Authentication authentication) {
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
    }
        
        String username = authentication.getName();
        
        // You can now find user details from the username
        int userId = userRepo.findUserIdByUsername(username); // adjust this based on your repo
       
        
        //fetch reports 
        List<FetchReportDTO> reports = reportMapper.reportMapperToFetch(userId);
        
        
        return ResponseEntity.ok(reports);
    }
    
    
    @GetMapping("fetch/{id}")
    public ResponseEntity<?> fetchPerReportController(@PathVariable("id") int id) {
        
        try {
            FetchReportDTO report = reportMapper.reportMapperToFetchPerReport(id);
            
            if(report == null) {
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok(report);
        } catch(Exception e) {
            return ResponseEntity.status(500).build();
        }
        
    }
    
    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateReportController(@PathVariable int id, @RequestBody FetchReportDTO reportUpdate) {
        
        try {
            reportMapper.updateReport(reportUpdate, id);
            return ResponseEntity.ok("Reports updated successfully");
            
            
            
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update report" + e.getMessage());
        }
    }
    
    
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReportController(@PathVariable int id) {
        
        try {
            reportMapper.deleteReport(id);
            return ResponseEntity.ok("Report deleted successfully");
            
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete report" + e.getMessage());
        }
    }
    
}
