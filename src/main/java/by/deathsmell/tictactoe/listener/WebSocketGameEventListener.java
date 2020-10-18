package by.deathsmell.tictactoe.listener;

import by.deathsmell.tictactoe.domain.Room;
import by.deathsmell.tictactoe.service.room.RoomManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Controller
public class WebSocketGameEventListener {

    private final RoomManager roomManager;

    @Autowired
    public WebSocketGameEventListener(RoomManager roomManager) {
        this.roomManager = roomManager;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){
        log.debug("DELITED ROOMS");
            roomManager.roomDestroy(Room.RoomStatus.DELETING);
    }

}
