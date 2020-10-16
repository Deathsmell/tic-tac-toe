package by.deathsmell.tictactoe.domain;

import by.deathsmell.tictactoe.configuration.CustomUuidDeserializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonDeserialize(using = CustomUuidDeserializer.class)
    private UUID uuid;

    @OneToOne
    private User host;

    @OneToOne
    private User opponent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private RoomStatus status;

    private String hash;

    @OneToMany
    List<RoomTag> roomTags;

    public enum RoomStatus {
        CREATED, WAITING, GAMING, DELETING,FILED
    }

    public static RoomBuilder builder(){
        return new RoomBuilder();
    }

    public static RoomBuilder withUUID(UUID uuid){
        return builder().uuid(uuid);
    }

    public static class RoomBuilder {
        private Long id;
        private UUID uuid;
        private User host;
        private User opponent;
        private RoomStatus status;
        private LocalDateTime createdAt;
        private List<RoomTag> roomTags;
        private String hash;

        public RoomBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public RoomBuilder uuid(UUID uuid) {
            Assert.notNull(uuid,"uuid cannot be null");
            this.uuid = uuid;
            return this;
        }

        public RoomBuilder host(User host) {
            Assert.notNull(host,"host cannot be null");
            this.host = host;
            return this;
        }

        public RoomBuilder opponent(User opponent) {
            Assert.notNull(opponent,"opponent cannot be null");
            this.opponent = opponent;
            return this;
        }

        public RoomBuilder status(RoomStatus status) {
            Assert.notNull(status,"status cannot be null");
            this.status = status;
            return this;
        }

        public RoomBuilder createTime(LocalDateTime createdAt) {
            Assert.notNull(createdAt,"create time cannot be null");
            this.createdAt = createdAt;
            return this;
        }

        public RoomBuilder tags(List<RoomTag> roomTags){
            this.roomTags = roomTags;
            return this;
        }

        public RoomBuilder hash(String hash){
            this.hash = hash;
            return this;
        }

        public Room build(){
            return new Room(id, uuid,host,opponent,createdAt,status,hash,roomTags);
        }
    }

}
