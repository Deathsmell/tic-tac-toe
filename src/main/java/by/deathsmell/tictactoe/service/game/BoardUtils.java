package by.deathsmell.tictactoe.service.game;

public interface BoardUtils {
    boolean stillHaveMove(int[][] board);
    boolean whoWin(int[][] board, int id);
    boolean isLegalMove(int[][] board, int x, int y);
}
