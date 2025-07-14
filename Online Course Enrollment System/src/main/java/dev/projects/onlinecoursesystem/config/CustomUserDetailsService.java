
package dev.projects.onlinecoursesystem.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;









@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private JdbcTemplate jdbc;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try {
            
            // 1. Try to find user in the students table
            String studentQuery = "SELECT email, password, role FROM students WHERE email = ?";
            return jdbc.queryForObject(studentQuery, new Object[]{username}, (rs, rowNum) -> {
                UserBuilder userBuilder = User.builder();
                return userBuilder
                        .username(rs.getString("email"))
                        .password(rs.getString("password"))
                        .roles(rs.getString("role").replace("ROLE_", ""))
                        .build();
            });

        } catch (EmptyResultDataAccessException e1) {
            
            try {
                // 2. Try to find user in the admin table
                String adminQuery = "SELECT email, password, role FROM admin WHERE email = ?";
                return jdbc.queryForObject(adminQuery, new Object[]{username}, (rs, rowNum) -> {
                    UserBuilder userBuilder = User.builder();
                    return userBuilder
                            .username(rs.getString("email"))
                            .password(rs.getString("password"))
                            .roles(rs.getString("role").replace("ROLE_", ""))
                            .build();
                });
                
            } catch (EmptyResultDataAccessException e2) {
                throw new UsernameNotFoundException("User not found in students or admin");
            }
        }
    }
}
