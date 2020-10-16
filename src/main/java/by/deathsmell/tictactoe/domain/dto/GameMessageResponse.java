package by.deathsmell.tictactoe.domain.dto;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GameMessageResponse {
    private int[][] board;
    private String hash;
    private String info;
    private MessageStatus status;

    public enum MessageStatus {
        SUCCESS, ERROR, WINNER
    }
}
