package by.deathsmell.tictactoe.service.game;

import by.deathsmell.tictactoe.domain.User;

public interface BoardManger {
    int[][] doMove(User user, int[][] board, int x, int y);
    int[][] createEmptyBoard();
}
