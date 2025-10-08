
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
        
        // fetch raw reports
        List<FetchReportDTO> reports = reportRepo.fetchReportsByUserId(userId);

        // format category for each report
        reports.forEach(report -> report.setCategory(formatCategory(report.getCategory())));

        return reports; 
        
    }
    
    
    
    public FetchReportDTO reportMapperToFetchPerReport(int reportId) {
        
        FetchReportDTO reports =  reportRepo.fetchPerReport(reportId);      
        return reports;
    }
    
    
    
    
    
    //function to modify data from db
    private String formatCategory(String rawCategory) {
        if (rawCategory == null || rawCategory.isEmpty()) return rawCategory;

        String[] words = rawCategory.toLowerCase().split("_");
        StringBuilder formatted = new StringBuilder();
        for (String word : words) {
            formatted.append(Character.toUpperCase(word.charAt(0)))
                     .append(word.substring(1))
                     .append(" ");
        }
        return formatted.toString().trim();
    }
}
