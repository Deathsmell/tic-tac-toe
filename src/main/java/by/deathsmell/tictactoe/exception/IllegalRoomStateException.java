package by.deathsmell.tictactoe.exception;

public class IllegalRoomStateException extends RuntimeException {
    public IllegalRoomStateException() {
        super();
    }

    public IllegalRoomStateException(String message) {
        super(message);
    }
}
