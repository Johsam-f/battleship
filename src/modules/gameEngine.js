import Player from "./player";
import { ship_positions, _add_img_to_cell, _get_cells } from "./shipPlacement";


const player1 = Player();
const computer = Player();

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
    const img_cells = document.querySelectorAll('.your-cell');
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
  



export { setting_gameboard, player1, computer, align_ships };
