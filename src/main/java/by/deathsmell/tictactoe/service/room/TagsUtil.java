package by.deathsmell.tictactoe.service.room;

import by.deathsmell.tictactoe.domain.RoomTag;

import java.util.List;

public interface TagsUtil {
    List<RoomTag> createTags(List<String> stringTags);

    List<RoomTag> saveTagsOnDb(List<RoomTag> tags);
}
