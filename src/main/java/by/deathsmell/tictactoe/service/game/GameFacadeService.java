package by.deathsmell.tictactoe.service.game;

import by.deathsmell.tictactoe.domain.Room;
import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.domain.dto.GameMessageResponse;
import by.deathsmell.tictactoe.domain.dto.ResponseMessage;
import by.deathsmell.tictactoe.repository.RoomRepository;
import by.deathsmell.tictactoe.service.MessageCreator;
import com.sun.istack.Nullable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.UUID;

@Slf4j
@Service
public class GameFacadeService implements GameFacade {

    private final BoardUtils boardUtils;
    private final BoardManger boardManger;
    private final BoardEncoder boardEncoder;
    private final RoomRepository roomRepository;
    private final MessageCreator messageCreator;

    @Autowired
    public GameFacadeService(BoardUtils boardUtils,
                             BoardManger boardManger,
                             BoardEncoder boardEncoder,
                             RoomRepository roomRepository,
                             MessageCreator messageCreator) {
        this.boardUtils = boardUtils;
        this.boardManger = boardManger;
        this.boardEncoder = boardEncoder;
        this.roomRepository = roomRepository;
        this.messageCreator = messageCreator;
    }

    public ResponseMessage move(User user, UUID uuid, int[][] board, String hash, int x, int y) {
        log.debug("Start move. User {} want to meke move in {}:{} cells on board : {} in room : {}",
                user, x, y, board, uuid
        );
        ResponseMessage response = new ResponseMessage();
        Room roomFromDb = roomRepository.findByUuid(uuid);
        User host = roomFromDb.getHost();
        User opponent = roomFromDb.getOpponent();
        Room.RoomStatus status = roomFromDb.getStatus();
        if (status.equals(Room.RoomStatus.DELETING)){
            sendGameMessage(host,opponent,uuid,board,null);
            return createErrorResponse(response,"Game ended!");
        }
        if (status.equals(Room.RoomStatus.WAITING)) {
            sendGameMessage(host, opponent, uuid, board, null);
            return createErrorResponse(response, "Wait you opponent");
        }
        boolean legalMove = boardUtils.isLegalMove(board, x, y);
        if (status.equals(Room.RoomStatus.GAMING) && legalMove) {
            String hashFromDB = roomFromDb.getHash();
            User hwoNextMove = user.equals(host) ? opponent : host;
            if (hashFromDB == null || hashFromDB.trim().isEmpty()) {
                if (user.equals(host)) {
                    int[][] refreshBoard = boardManger.doMove(user, board, x, y);
                    String refreshHash = refreshHash(hwoNextMove, refreshBoard, roomFromDb);
                    sendGameMessage(host, opponent, uuid, refreshBoard, refreshHash);
                    return createSuccessResponse(response, "Turn of " + hwoNextMove.getUsername());
                } else {
                    return createErrorResponse(response, "Not you turn");
                }
            } else {
                boolean userTurn = boardEncoder.validateStateBoard(user, board, hashFromDB);
                if (userTurn) {
                    int[][] refreshBoard = boardManger.doMove(user, board, x, y);
                    if (!anybodyWins(refreshBoard, host, opponent)) {
                        boolean stillMove = boardUtils.stillHaveMove(board);
                        if (stillMove) {
                            String refreshHash = refreshHash(hwoNextMove, refreshBoard, roomFromDb);
                            sendGameMessage(host, opponent, uuid, refreshBoard, refreshHash);
                            return createSuccessResponse(response, "Turn of " + hwoNextMove.getUsername());
                        } else {
                            setRoomStatusDelete(roomFromDb);
                            return createEndGameResponse(response, null);
                        }
                    } else {
                        setRoomStatusDelete(roomFromDb);
                        sendGameMessage(host, opponent, uuid, board, "");
                        return createEndGameResponse(response, user.equals(host) ? host : opponent);
                    }
                } else {
                    return createErrorResponse(response, "Not you turn");
                }
            }
        }
        return response;
    }

    private void setRoomStatusDelete(Room roomFromDb) {
        roomFromDb.setHash("");
        roomFromDb.setStatus(Room.RoomStatus.DELETING);
        roomRepository.save(roomFromDb);
    }

    public ResponseMessage surrender(User user, UUID uuid) {
        ResponseMessage response = new ResponseMessage();
        Room byUuid = roomRepository.findByUuid(uuid);
        setRoomStatusDelete(byUuid);
        response.setMessage(user.getUsername() + " surrendered.");
        return response;
    }

    private boolean anybodyWins(int[][] refreshBoard, User host, User opponent) {
        boolean hostWin = boardUtils.whoWin(refreshBoard, host.getId());
        boolean opponentWin = boardUtils.whoWin(refreshBoard, opponent.getId());
        return hostWin || opponentWin;
    }

    private String refreshHash(User user, int[][] board, Room roomFromDb) {
        String refreshHash = boardEncoder.newHash(user, board);
        roomFromDb.setHash(refreshHash);
        roomRepository.save(roomFromDb);
        return refreshHash;
    }

    private ResponseMessage createSuccessResponse(ResponseMessage response, String text) {
        response.setMessage(text);
        return response;
    }

    private ResponseMessage createErrorResponse(ResponseMessage response, String text) {
        response.setMessage(text);
        return response;
    }

    private ResponseMessage createEndGameResponse(ResponseMessage response, @Nullable User user) {
        response.setMessage(user == null ? "End game. Brow!" : user.getUsername() + " wined.");
        return response;
    }

    private void sendGameMessage(User host, @Nullable User opponent, UUID uuid, int[][] board, @Nullable String hash) {
        GameMessageResponse response = new GameMessageResponse();
        response.setBoard(board);
        response.setHash(hash);
        response.setHost(host.getUsername());
        response.setOpponent(null == opponent ? null : opponent.getUsername());
        response.setUpdated(LocalTime.now());
        response.setHostId(host.getId());
        messageCreator.sendTo("/topic/game/" + uuid, response);
    }

}
