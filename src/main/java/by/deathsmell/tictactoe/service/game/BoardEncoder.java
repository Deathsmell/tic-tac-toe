package by.deathsmell.tictactoe.service.game;

import by.deathsmell.tictactoe.domain.User;

public interface BoardEncoder {
    boolean validateStateBoard(User user, int[][] board, String hash);
    String newHash(User user, int[][] board);
}
