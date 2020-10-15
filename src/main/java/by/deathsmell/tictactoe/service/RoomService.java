package by.deathsmell.tictactoe.service;

import by.deathsmell.tictactoe.domain.Room;
import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.exception.EmptySenderNameSpaceException;
import by.deathsmell.tictactoe.exception.IllegalRoomStateException;
import by.deathsmell.tictactoe.exception.IllegalSenderAction;
import by.deathsmell.tictactoe.exception.IncorrectStatusOfTheCreatedRoomException;
import by.deathsmell.tictactoe.repository.RoomRepository;
import com.sun.istack.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
public class RoomService implements RoomCreator {

    private final RoomRepository roomRepo;

    @Autowired
    public RoomService(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    @Override
    public Room createRoom() {
        Room newRoom = Room
                .withUUID(UUID.randomUUID())
                .status(Room.RoomStatus.CREATED)
                .createTime(LocalDateTime.now())
                .build();
        roomRepo.save(newRoom);
        log.info("Create new room and save in database. {}", newRoom);
        return newRoom;
    }

    @Override
    public void joinToRoom(@NotNull final UUID uuid, @NotNull final User user)
            throws IncorrectStatusOfTheCreatedRoomException, EmptySenderNameSpaceException, IllegalRoomStateException {
        log.debug("Start joining into room");
        String sender = user.getUsername();
        if (null != sender) {
            Room roomFromDb = roomRepo.findByUuid(uuid);
            log.debug("Find room in DB. Room: {}", roomFromDb);
            Room.RoomStatus roomStatus = roomFromDb.getStatus();
            if (roomStatus == Room.RoomStatus.CREATED) {
                joinFirstPlayer(uuid, user, roomFromDb);
            } else if (roomStatus == Room.RoomStatus.WAITING) {
                joinSecondPlayer(user, roomFromDb);
            } else {
                log.error("While joining to room a room status be or become illegal");
                throw new IllegalRoomStateException("While joining to room a room status be or become illegal");
            }
        } else {
            log.error("User name empty");
            throw new EmptySenderNameSpaceException("User name empty");
        }
    }

    @Override
    public void roomDestroy(@NotNull String username) throws IllegalRoomStateException {
        log.debug("Starting room destroy event. Input values: username - {}",
                username);

        Room room = roomRepo.findRoomByHostOrOpponent(username);
        if (null != room) {
            String host = room.getHost().getUsername();
            boolean hasHost = username.equals(host);
            String opponent = room.getOpponent().getUsername();
            boolean hasOpponent = username.equals(opponent);
            if (hasHost && hasOpponent) {
                log.error("Sender listed in two room slots. Illegal room state. Sender : {}", username);
                throw new IllegalRoomStateException();
            }
            if (!(hasHost || hasOpponent)) {
                log.error("Player not belongs that room. Sender : {} expect {} or {} , room uuid: {}",
                        username,
                        room.getHost(),
                        room.getOpponent(),
                        room.getUuid());
                throw new IllegalSenderAction("Player not belongs that room");
            }
            if (room.getStatus().equals(Room.RoomStatus.DELETING)) {
                log.info("Room is empty. Deleting: {}", room);
                roomRepo.delete(room);
            } else {
                log.debug("Room have give status DESTROY");
                room.setStatus(Room.RoomStatus.DELETING);
                roomRepo.save(room);
            }
        } else {
            log.error("Not found room in DB. Room not exist or input value illegal or incorrect");
            throw new IllegalArgumentException("Not found room in DB. Room not exist or input value illegal or incorrect");
        }
    }


    private void joinFirstPlayer(UUID roomId, User sender, Room roomFromDb)
            throws IncorrectStatusOfTheCreatedRoomException {
        if (null == roomFromDb.getHost() && null == roomFromDb.getOpponent()) {
            roomFromDb.setHost(sender);
            roomFromDb.setStatus(Room.RoomStatus.WAITING);
            log.info("Add host players in new room. Player name: {}, room id: {}", sender, roomId);
            roomRepo.save(roomFromDb);
        } else {
            log.error("Incorrect status of the create room." +
                            " One or two place in room taken. {}",
                    roomFromDb);
            throw new IncorrectStatusOfTheCreatedRoomException("Incorrect status of the create room.One or two place in room taken");
        }
    }

    private void joinSecondPlayer(User sender, Room roomFromDb)
            throws IncorrectStatusOfTheCreatedRoomException {
        if (!sender.equals(roomFromDb.getHost()) && null == roomFromDb.getOpponent()) {
            roomFromDb.setOpponent(sender);
            roomFromDb.setStatus(Room.RoomStatus.FILED);
            roomRepo.save(roomFromDb);
        } else {
            log.error("Incorrect status of the create room." +
                            " Sender try to rejoin second time or room filed. {}.",
                    roomFromDb);
            throw new IncorrectStatusOfTheCreatedRoomException("Incorrect status of the create room.One or two place in room taken");
        }
    }


}
