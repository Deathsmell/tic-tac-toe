package by.deathsmell.tictactoe.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class RoomTag {

    public RoomTag() {

    }

    public RoomTag(String tag) {
        this.tag = tag;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String tag;

}
