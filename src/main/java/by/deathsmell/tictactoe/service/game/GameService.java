package by.deathsmell.tictactoe.service.game;

import by.deathsmell.tictactoe.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class GameService implements BoardUtils, BoardManger {


    public boolean isLegalMove(int[][] board, int x, int y) {
        return board[x][y] == 0;
    }

    public boolean stillHaveMove(int[][] board) {
        for (int[] row : board) {
            for (Integer integer : row) {
                if (integer == 0) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean whoWin(int[][] board, int id) {
        boolean horizontal = true;
        boolean vertical = true;
        for (int i = 0; i < 3; i++) {
            for (int y = 0; y < 3; y++) {
                horizontal &= (board[i][y] == id);
                vertical &= (board[y][i] == id);
            }
            if (horizontal || vertical) return true;
            horizontal = vertical = true;
        }
        boolean toright = true;
        boolean toleft = true;
        for (int i = 0; i < 3; i++) {
            toright &= (board[i][i] == id);
            toleft &= (board[3 - i - 1][i] == id);
        }
        return toright || toleft;
    }

    public int[][] doMove(User user, int[][] board, int x, int y) {
        board[x][y] = user.getId();
        return board;
    }

    @Override
    public int[][] createEmptyBoard() {
        return new int[][]{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}};
    }
}
