package by.deathsmell.tictactoe.service;

import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.repository.UserRepository;
import com.sun.istack.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserService implements UserManager {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepo, @Lazy PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(@NotNull String username, @NotNull String password) throws IllegalArgumentException {
        log.debug("Start create user {} for password : {}", username, password);
        checkIsEmpty(username, password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        userRepo.save(user);
        log.info("Create user {}", username);
        return user;
    }

    private void checkIsEmpty(String username, String password) {
        if (username.isBlank() || password.isBlank()) {
            log.error("Incorrect username or password. Name : {}", username);
            throw new IllegalArgumentException("Incorrect username or password");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo
                .findByUsername(username)
                .orElseThrow(() -> {
                    log.error("User not exist or incorrect username: {}. Please check input username", username);
                    throw new UsernameNotFoundException("Incorrect username");
                });
    }
}
