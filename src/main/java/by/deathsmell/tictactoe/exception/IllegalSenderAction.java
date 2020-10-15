package by.deathsmell.tictactoe.exception;

public class IllegalSenderAction extends RuntimeException {
    public IllegalSenderAction(){
        super();
    }
    public IllegalSenderAction(String message){
        super(message);
    }
}
