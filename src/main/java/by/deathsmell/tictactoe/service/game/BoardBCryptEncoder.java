package by.deathsmell.tictactoe.service.game;

import by.deathsmell.tictactoe.domain.User;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BoardBCryptEncoder implements BoardEncoder{

    private final PasswordEncoder encoder;

    @Autowired
    public BoardBCryptEncoder(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Setter
    @AllArgsConstructor
    @ToString
    private static class Board {
        User user;
        int[][] board;
    }

    public boolean validateStateBoard(User user, int[][] board, String hash) {
        return encoder.matches(new Board(user, board).toString(), hash);
    }

    public String newHash(User user, int[][] board) {
        return encoder.encode(new Board(user, board).toString());
    }
}
