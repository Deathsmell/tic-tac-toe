package by.deathsmell.tictactoe.repository;

import by.deathsmell.tictactoe.domain.RoomTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagsRepository extends JpaRepository<RoomTag,Integer> {
}
