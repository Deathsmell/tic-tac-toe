package by.deathsmell.tictactoe.controller;

import by.deathsmell.tictactoe.domain.RoomTag;
import by.deathsmell.tictactoe.repository.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tags")
public class TagsController {

    private final TagsRepository tagsRepo;

    @Autowired
    public TagsController(TagsRepository tagsRepository) {
        this.tagsRepo = tagsRepository;
    }

    @GetMapping("/unique")
    public List<RoomTag> getAllTags() {
        return tagsRepo.findAll()
                .stream()
                .distinct()
                .collect(Collectors.toList());
    }

}
