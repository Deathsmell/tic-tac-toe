package by.deathsmell.tictactoe.service.game;

import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.domain.dto.ResponseMessage;

import java.util.UUID;

public interface GameFacade {
    ResponseMessage move(User user, UUID uuid, int[][] board, String hash, int x, int y);
    ResponseMessage surrender(User user, UUID uuid);
}
