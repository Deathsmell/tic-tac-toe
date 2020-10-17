package by.deathsmell.tictactoe.service.room;

import by.deathsmell.tictactoe.domain.Room;
import by.deathsmell.tictactoe.domain.RoomTag;
import by.deathsmell.tictactoe.domain.User;

import java.util.List;

public interface RoomCreator {
    Room createRoom(User user, List<RoomTag> tags);
}
