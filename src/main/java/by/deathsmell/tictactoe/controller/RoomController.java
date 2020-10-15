package by.deathsmell.tictactoe.controller;


import by.deathsmell.tictactoe.domain.Room;
import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.exception.EmptySenderNameSpaceException;
import by.deathsmell.tictactoe.exception.IllegalRoomStateException;
import by.deathsmell.tictactoe.exception.IncorrectStatusOfTheCreatedRoomException;
import by.deathsmell.tictactoe.repository.RoomRepository;
import by.deathsmell.tictactoe.service.RoomCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    @Autowired
    public RoomController(RoomRepository roomRepo, RoomCreator roomCreator) {
        this.roomRepo = roomRepo;
        this.roomCreator = roomCreator;
    }

    @GetMapping("/create")
    public Room createRoom() {
        return roomCreator.createRoom();
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

    @GetMapping("/join")
    public ResponseEntity<String> joinToRoom(@AuthenticationPrincipal User user,
                                             @RequestParam UUID room) {
        log.debug("START JOINING IN ROOM " + room);
        try {
            roomCreator.joinToRoom(room, user);
        } catch (IncorrectStatusOfTheCreatedRoomException |
                IllegalArgumentException |
                IllegalRoomStateException |
                EmptySenderNameSpaceException e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(e.getMessage());
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Success! Enjoying game");
    }

    // FIXME: Name method dont right. Create get method
    @PutMapping
    public Room updateRoom(@RequestBody Room room) {
        Room roomFromDb = roomRepo.findByUuid(room.getUuid());
        log.debug("Update room : {}", roomFromDb);
        return roomFromDb;
    }
}
