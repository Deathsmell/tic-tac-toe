package by.deathsmell.tictactoe.repository;

import by.deathsmell.tictactoe.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room,Long> {
    Room findByUuid(UUID uuid);

    @Query("select r from Room r where r.host = :username or r.opponent = :username")
    Room findRoomByHostOrOpponent(@Param("username") String username);

    List<Room> findAllByHostNotNullOrOpponentNotNull();
}
