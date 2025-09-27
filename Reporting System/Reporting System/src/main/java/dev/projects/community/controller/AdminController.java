
package dev.projects.community.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author noob
 */


@RestController
@RequestMapping("admin/")
public class AdminController {
    
    
    @GetMapping("/testing")
    public String testing() {
        return "Hello Admin -> Testing only!";
    }
    
    
    
}
