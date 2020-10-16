package by.deathsmell.tictactoe.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameRequest {
    private int[][] board;
    private String hash;
    private int x;
    private int y;
}
