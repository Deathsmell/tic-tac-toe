package by.deathsmell.tictactoe.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;


@Slf4j
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsManager userManager;

    @Autowired
    public WebSecurityConfig(UserDetailsManager userManager) {
        this.userManager = userManager;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        log.debug("Create custom web security http configuration");

        http.
                csrf()
                    .disable()
                .authorizeRequests()
                    .antMatchers("/login**", "/registration**", "/error**")
                    .permitAll()
                .anyRequest()
                    .authenticated()
                .and()
                .formLogin()
                    .loginPage("/login")
                    .permitAll()
                .and()
                .logout()
                    .permitAll();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userManager)
                .passwordEncoder(NoOpPasswordEncoder.getInstance());
    }
}
