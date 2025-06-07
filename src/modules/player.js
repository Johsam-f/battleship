import Gameboard from "./gameboard";

export default function Player() {
    let player_board = Gameboard();

    function attack(opponentBoard, coord){
          return  opponentBoard.receive_attack(coord);
    }

    function reset_board() {
      player_board = Gameboard(); // create a fresh board instance
    }

  
    return {
      get player_board() {
        return player_board; // expose the current gameboard
      },
      attack,
      reset_board
    };
  }
  