package by.deathsmell.tictactoe.controller;


import by.deathsmell.tictactoe.domain.Room;
import by.deathsmell.tictactoe.domain.RoomTag;
import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.domain.dto.RequestTags;
import by.deathsmell.tictactoe.domain.dto.ResponseMessage;
import by.deathsmell.tictactoe.exception.EmptySenderNameSpaceException;
import by.deathsmell.tictactoe.exception.IllegalRoomStateException;
import by.deathsmell.tictactoe.exception.IncorrectStatusOfTheCreatedRoomException;
import by.deathsmell.tictactoe.repository.RoomRepository;
import by.deathsmell.tictactoe.service.room.RoomCreator;
import by.deathsmell.tictactoe.service.room.RoomManager;
import by.deathsmell.tictactoe.service.room.TagsUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/room")
public class RoomController {

    private final RoomRepository roomRepo;
    private final RoomCreator roomCreator;
    private final RoomManager roomManager;
    private final TagsUtil tagsUtil;


    @Autowired
    public RoomController(RoomRepository roomRepo, RoomCreator roomCreator, RoomManager roomManager, TagsUtil tagsUtil) {
        this.roomRepo = roomRepo;
        this.roomCreator = roomCreator;
        this.roomManager = roomManager;
        this.tagsUtil = tagsUtil;
    }

    @PostMapping("/create")
    public Room createRoom(@AuthenticationPrincipal User user, @RequestBody(required = false) RequestTags tags) {
        List<RoomTag> uniqueTags = tagsUtil.createTags(tags.getTags());
        List<RoomTag> roomTags = tagsUtil.saveTagsOnDb(uniqueTags);
        return roomCreator.createRoom(user,roomTags);
    }

    @GetMapping("/list")
    public List<Room> getAllWaitRooms() {
        return roomRepo.findAllByHostNotNullOrOpponentNotNull();
    }

    @GetMapping("/allRooms")
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    @GetMapping("/get")
    public Room getRoom(@RequestParam UUID uuid) {
        return roomRepo.findByUuid(uuid);
    }

    @GetMapping("/search")
    public List<Room> searchByTags (@RequestParam List<RoomTag> tags){
        return roomRepo.findAllByRoomTagsIn(tags);
    }

    @PostMapping("/join")
    public ResponseEntity<ResponseMessage> joinToRoom(@AuthenticationPrincipal User user,
                                                      @RequestParam UUID uuid) {
        try {
            roomManager.joinToRoom(uuid, user);
        } catch (IncorrectStatusOfTheCreatedRoomException |
                IllegalArgumentException |
                IllegalRoomStateException |
                EmptySenderNameSpaceException e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(new ResponseMessage(e.getMessage()));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessage("Successful joined. Enjoy!"));
    }


}