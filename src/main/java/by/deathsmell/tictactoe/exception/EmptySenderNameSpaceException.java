package by.deathsmell.tictactoe.exception;

public class EmptySenderNameSpaceException extends RuntimeException {
    public EmptySenderNameSpaceException() {
        super();
    }

    public EmptySenderNameSpaceException(String message) {
        super(message);
    }
}
