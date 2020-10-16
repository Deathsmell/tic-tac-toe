package by.deathsmell.tictactoe.service.user;

import by.deathsmell.tictactoe.domain.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserManager extends UserDetailsService {

    User createUser(String username,String password) throws IllegalArgumentException;
}
