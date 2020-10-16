package by.deathsmell.tictactoe.service;

import by.deathsmell.tictactoe.domain.dto.GameMessageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MessageCreator {

    private final SimpMessageSendingOperations messagingTemplate;

    @Autowired
    public MessageCreator(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    public void sendTo(String sendTo, GameMessageResponse messageResponse) {
        messagingTemplate.convertAndSend(sendTo,messageResponse);
    }


}