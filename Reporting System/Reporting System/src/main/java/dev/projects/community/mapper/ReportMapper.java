
package dev.projects.community.mapper;

import dev.projects.community.dto.FetchReportDTO;
import dev.projects.community.dto.ReportDTO;
import dev.projects.community.model.Report;
import dev.projects.community.repository.ReportRepository;
import java.time.LocalDateTime;
import java.util.List;
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
    
    
    public Report reportMapperToCreate(ReportDTO reportDTO, int userId) {
        
        Report report = new Report();
        
        report.setTitle(reportDTO.getTitle());
        report.setDescription(reportDTO.getDescription());
        report.setCategory(reportDTO.getCategory());
        report.setPriority(reportDTO.getPriority());
        report.setLocation(reportDTO.getLocation());
        report.setMedia(reportDTO.getMedia());
        report.setCreatedAt(LocalDateTime.now());
        
        report.setUserId(userId);
        
        reportRepo.createReport(report); //pass to repository
        
        return report;
    }
    
    
    public List<FetchReportDTO> reportMapperToFetch(int userId) {
        
        return reportRepo.fetchReportsByUserId(userId);   
        
    }
}
