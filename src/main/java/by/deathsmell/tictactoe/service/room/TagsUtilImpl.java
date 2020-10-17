package by.deathsmell.tictactoe.service.room;

import by.deathsmell.tictactoe.domain.RoomTag;
import by.deathsmell.tictactoe.repository.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagsUtilImpl implements TagsUtil {

    private final TagsRepository tagsRepo;

    @Autowired
    public TagsUtilImpl(TagsRepository tagsRepo) {
        this.tagsRepo = tagsRepo;
    }


    @Override
    public List<RoomTag> createTags(List<String> stringTags) {
        return stringTags
                .stream()
                .distinct()
                .map(RoomTag::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoomTag> saveTagsOnDb(List<RoomTag> tags) {
        return tagsRepo.saveAll(tags);
    }
}
