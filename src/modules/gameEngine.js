import Player from "./player";
import { ship_positions, _add_img_to_cell, _get_cells } from "./shipPlacement";


const player1 = Player();
const computer = Player();
let winner = '';

const comp_ship_lengths = [5, 4, 3, 3, 2];

function setting_gameboard(){
    for (let i = 0; i < ship_positions.length; i++) {
        let {first_index, length, is_vertical} = ship_positions[i];
        const placed = player1.player_board.place_ship(_get_coord(first_index), length, is_vertical);
        if (!placed) {
            console.warn(`Failed to place player ship at index ${first_index}`);
        }
    }

    randomize_comp_ships();
}

function randomize_comp_ships() {
    for (let i = 0; i < comp_ship_lengths.length; i++) {
        const length = comp_ship_lengths[i];
        let placed = false;

        while (!placed) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const is_vertical = Math.random() < 0.5;
            placed = computer.player_board.place_ship({ x, y }, length, is_vertical);
        }
    }
}

function _get_coord(index){
    return {x: index % 10, y: 9 - Math.floor(index/10)};
}

function align_ships(){
    const ships = [
        { name: 'carrier'},
        { name: 'battleship'},
        { name: 'cruiser'},
        { name: 'submarine'},
        { name: 'destroyer'}
      ];
  
    for (let i = 0; i < ship_positions.length; i++) {
      let {first_index, length, is_vertical} = ship_positions[i];
      const cell = document.querySelector(`.your-cell[data-index="${first_index}"]`);
      if (cell) {
        const name = ships[i].name;
        const orientation = is_vertical ? 'vertical' : 'horizontal';

        //colour the cells by assigning class
        const cells = _get_cells(first_index, length, orientation);
        cells.forEach(i => {
            const curr_cell = document.querySelector(`[data-index="${i}"]`);
            if (curr_cell) {
                curr_cell.classList.add('occupied');
            }
        });

        _add_img_to_cell(cell, name, length, orientation);
      }
    }
  }

  function add_dot(cell){
    const dot = document.createElement('div');
    dot.classList.add('dot');
    cell.appendChild(dot);
  }

  function handle_computer_player(){
    let attack_succeed = false;
    do{
        const index = Math.floor(Math.random() * 100);
        const coord = _get_coord(index);
        const player_cell = document.querySelector(`.your-cell[data-index="${index}"]`);

        if(!player_cell.classList.contains("attacked")){
            if(computer.attack(player1.player_board, coord)){
                player_cell.classList.add("attack-succeed");
            }else{
                player_cell.classList.add("attack-fail");
            }
            player_cell.classList.add("attacked");

            if(player_cell){
                add_dot(player_cell);
            }

            if(player1.player_board.all_ships_sunk()){
                winner = "computer";
                document.dispatchEvent(
                    new CustomEvent('gameEnded',{
                        detail: { winner: "computer" } 
                    })
                );
            }
            attack_succeed = true;
        }

    }while(!attack_succeed);
  }

  function game_engine(){
    setting_gameboard();
    align_ships();

    //game logic
    document.getElementById("enemy-fleet").addEventListener('click', (e) => {
        if(e.target.classList.contains("enemy-cell")){

            if(e.target.classList.contains("attack-succeed") || e.target.classList.contains("attack-fail")) return;

            const index = parseInt(e.target.dataset.index);
            const coord = _get_coord(index);
            const enemy_cell = document.querySelector(`.enemy-cell[data-index="${index}"]`);

            if(player1.attack(computer.player_board, coord)){
                e.target.classList.add("attack-succeed");
            }else{
                e.target.classList.add("attack-fail");
            }

            if(enemy_cell){
                add_dot(enemy_cell);
            }

            if(computer.player_board.all_ships_sunk()){
                winner = "player";
                document.dispatchEvent(
                    new CustomEvent('gameEnded',{
                        detail: { winner: "player" } 
                    })
                );
            }else{
                setTimeout(() => {
                    handle_computer_player();
                }, 500);
            }

        }
    });

}

  export {game_engine, winner, player1};
  
