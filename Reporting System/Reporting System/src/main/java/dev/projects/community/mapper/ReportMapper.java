
package dev.projects.community.mapper;

import dev.projects.community.dto.ReportDTO;
import dev.projects.community.model.Report;
import dev.projects.community.repository.ReportRepository;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;



/**
 *
 * @author noob
 */



@Service
public class ReportMapper {
    
    private final ReportRepository reportRepo;
    
    public ReportMapper(ReportRepository reportRepo) {
        this.reportRepo = reportRepo;
    }
    
    
    public Report reportMapperToCreateRepo(ReportDTO reportDTO) {
        
        Report report = new Report();
        
        report.setTitle(reportDTO.getTitle());
        report.setDescription(reportDTO.getDescription());
        report.setCategory(reportDTO.getCategory());
        report.setPriority(reportDTO.getPriority());
        report.setLocation(reportDTO.getLocation());
        report.setMedia(reportDTO.getMedia());
        report.setCreatedAt(LocalDateTime.now());
        
        reportRepo.createReport(report); //pass to repository
        
        return report;
    }
}
