package by.deathsmell.tictactoe.configuration;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@JsonComponent
public class CustomUuidDeserializer extends JsonDeserializer<UUID> {

    @Override
    public UUID deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String uuid = p.getValueAsString();
        log.debug("Deserializer started. Get value as string = {}", uuid);
        return UUID.fromString(uuid);
    }
}