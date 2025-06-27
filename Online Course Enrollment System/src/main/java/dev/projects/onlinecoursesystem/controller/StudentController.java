
package dev.projects.onlinecoursesystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author noob
 */





@RestController
public class StudentController {
    
    @GetMapping("/hello")
    public String testing() {
        return "Hello";
    }
}
