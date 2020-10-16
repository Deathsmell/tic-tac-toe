package by.deathsmell.tictactoe.controller;

import by.deathsmell.tictactoe.domain.User;
import by.deathsmell.tictactoe.domain.dto.GameMessageResponse;
import by.deathsmell.tictactoe.domain.dto.GameRequest;
import by.deathsmell.tictactoe.domain.dto.ResponseMessage;
import by.deathsmell.tictactoe.service.game.BoardManger;
import by.deathsmell.tictactoe.service.game.GameFacade;
import by.deathsmell.tictactoe.service.game.GameFacadeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@RestController
public class GameController {

    private final GameFacade gameFacade;
    private final BoardManger boardManger;

    public GameController(GameFacadeService gameFacade, BoardManger boardManger) {
        this.gameFacade = gameFacade;
        this.boardManger = boardManger;
    }

    @PostMapping("/room/{roomId}")
    public ResponseMessage sendMessageInPublicChat(@AuthenticationPrincipal User user,
                                                   @PathVariable UUID roomId,
                                                   @RequestBody GameRequest gameRequest) {
        int[][] board = gameRequest.getBoard();
        int x = gameRequest.getX();
        int y = gameRequest.getY();
        String hash = gameRequest.getHash();
        return gameFacade.move(user,roomId, board, hash, x, y);
    }

    @SubscribeMapping("/game/{roomId}")
    @SendTo("/topic/game/{roomId}")
    public GameMessageResponse startGame(@AuthenticationPrincipal User user) {
        GameMessageResponse response = new GameMessageResponse();
        response.setBoard(boardManger.createEmptyBoard());
        return response;
    }


}
