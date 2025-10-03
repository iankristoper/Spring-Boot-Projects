
package dev.projects.community.controller;

import dev.projects.community.dto.ReportDTO;
import dev.projects.community.mapper.ReportMapper;
import dev.projects.community.model.Report;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author noob
 */


@RestController
@RequestMapping("/api/report")
public class ReportController {
    
    
    private final ReportMapper reportMapper;
    
    public ReportController(ReportMapper reportMapper) {
        this.reportMapper = reportMapper;
    }
    
    
    @PostMapping("/create")
    public ResponseEntity<?> createReportController(@RequestBody ReportDTO reportDTO) {
        
        Report saveReport = reportMapper.reportMapperToCreateRepo(reportDTO);
        
        return ResponseEntity.ok(saveReport);
    }
    
}
