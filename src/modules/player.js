import Gameboard from "./gameboard";

export default function Player() {
    const player_board = Gameboard();

    function attack(opponentBoard, coord){
            opponentBoard.receive_attack(coord);
    }
  
    return {
      player_board,
      attack
    };
  }
  