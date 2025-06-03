import Player from "./player";

const player1 = Player();
const computer = Player();

function setting_gameboard(player, index, length, is_vertical){
    return player.player_board.place_ship({x: index % 10, y: 9 - Math.floor(index/10)}, length, is_vertical);
}


// player1.player_board.place_ship({x: 0, y: 0}, 3);
// computer.player_board.place_ship({x: 1, y: 1}, 3);

// player1.attack(computer.player_board, {x: 1, y: 1}); 
// player1.attack(computer.player_board, {x: 2, y: 1});
// player1.attack(computer.player_board, {x: 3, y: 1});

// console.log(computer.player_board.all_ships_sunk());