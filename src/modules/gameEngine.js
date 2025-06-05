import Player from "./player";
import { ship_positions, _add_img_to_cell } from "./shipPlacement";
import shipImages from "./utils/importImages";

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
        { name: 'carrier', length: 5 },
        { name: 'battleship', length: 4 },
        { name: 'cruiser', length: 3 },
        { name: 'submarine', length: 3 },
        { name: 'destroyer', length: 2 }
      ];

    // Placement

    for (let i = 0; i < ship_positions.length; i++) {
        let {first_index, length, is_vertical} = ship_positions[i];
        img_cells.forEach( cell => {
            if(cell.dataset.index === first_index){
                _add_img_to_cell(cell);
            }
        });
    }
    

  grid.addEventListener('click', (e) => {
    if (!selected_ship) return;
    const index = parseInt(e.target.dataset.index);
    const cells = _get_cells(index, selected_ship.length, is_vertical);
    if (!_is_valid(cells)) return;

    cells.forEach(i => {
      const cell = document.querySelector(`[data-index="${i}"]`);
      if (cell) {
        cell.classList.add('occupied', selected_ship.name);
        cell.dataset.ship = selected_ship.name;
      }
    });

    // Add actual image into the first cell
    const firstCell = document.querySelector(`[data-index="${cells[0]}"]`);
    if (firstCell) {
      const shipImg = document.createElement('img');
      shipImg.src = shipImages[`${selected_ship.name}.png`];
      shipImg.alt = selected_ship.name;
      shipImg.classList.add('grid-ship', is_vertical);
      shipImg.style.position = 'absolute';
      shipImg.style.width = is_vertical === 'horizontal'
        ? `${selected_ship.length * 100}%`
        : '100%';
    shipImg.style.height = is_vertical === 'vertical'
        ? `${selected_ship.length * 100}%`
        : '100%';
      shipImg.style.objectFit = 'contain';
      shipImg.style.top = '0';
      shipImg.style.left = '0';
      shipImg.style.zIndex = '5';

      if (is_vertical === 'vertical') {
        shipImg.style.transform = 'rotate(90deg)';
      }

      firstCell.appendChild(shipImg);
    }
});
}



export { setting_gameboard, player1, computer };
