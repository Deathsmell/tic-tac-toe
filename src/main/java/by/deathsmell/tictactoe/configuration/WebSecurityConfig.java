package by.deathsmell.tictactoe.configuration;

import by.deathsmell.tictactoe.domain.dto.ResponseMessage;
import by.deathsmell.tictactoe.service.UserManager;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


@Slf4j
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserManager userManager;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }

    @Autowired
    public WebSecurityConfig(UserManager userManager) {
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
                        .successHandler(successHandler())
                        .failureHandler(failureHandler())
                    .loginPage("/login")
                    .permitAll()
                .and()
                    .logout()
                    .permitAll();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userManager)
                .passwordEncoder(passwordEncoder());
    }


    private AuthenticationSuccessHandler successHandler() {
        return (httpServletRequest, httpServletResponse, authentication) -> {
            String responseMassage = JSONObject.toJSONString(new ResponseMessage("Successful authentication"));
            httpServletResponse.getWriter().append(responseMassage);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.setCharacterEncoding("UTF-8");
            httpServletResponse.setStatus(HttpStatus.OK.value());
        };
    }

    private AuthenticationFailureHandler failureHandler(){
        return (httpServletRequest, httpServletResponse, authentication) -> {
            String responseMassage = JSONObject.toJSONString(new ResponseMessage("Username or password not valid"));
            httpServletResponse.getWriter().append(responseMassage);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.setCharacterEncoding("UTF-8");
            httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        };
    }
}
