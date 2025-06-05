import Player from "./player";
import { ship_positions } from "./shipPlacement";

const player1 = Player();
const computer = Player();

function setting_gameboard(){
    for (let i = 0; i < 5; i++) {
        let {first_index, length, is_vertical} = ship_positions[i];
        player1.player_board = player_gameboard(player1.player_board, first_index, length, is_vertical);
    }
    
}

function player_gameboard(player_board, index, length, is_vertical){
    return player_board.place_ship({x: index % 10, y: 9 - Math.floor(index/10)}, length, is_vertical);
}


// player1.player_board.place_ship({x: 0, y: 0}, 3);
// computer.player_board.place_ship({x: 1, y: 1}, 3);

// player1.attack(computer.player_board, {x: 1, y: 1}); 
// player1.attack(computer.player_board, {x: 2, y: 1});
// player1.attack(computer.player_board, {x: 3, y: 1});

// console.log(computer.player_board.all_ships_sunk());