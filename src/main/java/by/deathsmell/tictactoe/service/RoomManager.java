package by.deathsmell.tictactoe.service;

import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.exception.EmptySenderNameSpaceException;
import by.deathsmell.tictactoe.exception.IllegalRoomStateException;
import by.deathsmell.tictactoe.exception.IncorrectStatusOfTheCreatedRoomException;

import java.util.UUID;

public interface RoomManager {
    void joinToRoom(UUID room, User user) throws IncorrectStatusOfTheCreatedRoomException, EmptySenderNameSpaceException, IllegalRoomStateException;
    void roomDestroy(String username) throws IllegalRoomStateException;
}
