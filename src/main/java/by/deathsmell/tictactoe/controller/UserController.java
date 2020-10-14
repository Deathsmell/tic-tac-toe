package by.deathsmell.tictactoe.controller;

import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.domain.dto.CredentialRequest;
import by.deathsmell.tictactoe.domain.dto.ResponseMessage;
import by.deathsmell.tictactoe.exception.UserExistException;
import by.deathsmell.tictactoe.repository.UserRepository;
import by.deathsmell.tictactoe.service.UserManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class UserController {

    private final UserRepository userRepo;
    private final UserManager userManager;

    @Autowired
    public UserController(UserRepository userRepository, UserManager userManager) {
        this.userRepo = userRepository;
        this.userManager = userManager;
    }
    private ResponseEntity<ResponseMessage> createErrorResponse(Exception error) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseMessage(error.getMessage()));
    }

    private ResponseEntity<ResponseMessage> createSuccessResponse(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(new ResponseMessage(message));
    }

    private void chekIfExist(String username) throws UserExistException {
        userRepo.findByUsername(username)
                .ifPresent(user -> {
                    throw new UserExistException(username + " exist! Please change another username");
                });
    }

    @PostMapping("/registration")
    public ResponseEntity<ResponseMessage> registration(@RequestBody CredentialRequest cr) {
        log.debug("Start registration new user. Username: {}, password: {}", cr.getUsername(), cr.getPassword());
        try {
            chekIfExist(cr.getUsername());
            User user = userManager.createUser(cr.getUsername(), cr.getPassword());
            return createSuccessResponse(HttpStatus.CREATED,
                    user.getUsername() + " successful registration. Enjoy!");
        } catch (Exception e) {
            log.error(e.getMessage());
            return createErrorResponse(e);
        }
    }

    @GetMapping("/auth")
    public boolean checkAuth(@AuthenticationPrincipal User user){
        System.out.println(user);
        return user != null;
    }

}
