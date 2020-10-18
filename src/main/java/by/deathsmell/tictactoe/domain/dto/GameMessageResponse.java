package by.deathsmell.tictactoe.domain.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Setter
@Getter
public class GameMessageResponse {
    private int[][] board;
    private String hash;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime updated;
    private int hostId;
    private String host;
    private String opponent;
    private String info;
}
