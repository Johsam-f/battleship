import shipImages from "./utils/importImages";

const ships = [
  { name: 'carrier', length: 5 },
  { name: 'battleship', length: 4 },
  { name: 'cruiser', length: 3 },
  { name: 'submarine', length: 3 },
  { name: 'destroyer', length: 2 }
];

let selected_ship = null;
let orientation = 'horizontal';
const ship_positions = [];

function initPlacement() {
  const grid = document.querySelector('.grid-box');
  const shipImgs = document.querySelectorAll('#ships .ship');
  const axis_buttons = document.querySelectorAll('#ship-axis button');
  const confirm_btn = document.getElementById('confirm-plan');

  confirm_btn.disabled = true;
  confirm_btn.style.cursor = "not-allowed";

  // Orientation toggle, (axis buttons)
  axis_buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      orientation = btn.dataset.name;
      axis_buttons.forEach(b => b.classList.remove('active-btn'));
      btn.classList.add('active-btn');
    });
  });

  // Ship selection and passin the name of the selected ship through the classList[1]
  shipImgs.forEach(img => {
    img.addEventListener('click', () => {
      if (img.classList.contains('placed')) return;

      shipImgs.forEach(i => i.classList.remove('active'));
      img.classList.add('active');

      const shipName = img.classList[1];
      selected_ship = ships.find(s => s.name === shipName);
    });
  });

  // Hover preview
  grid.addEventListener('mouseover', (e) => {
    if (!selected_ship) return;
    const index = parseInt(e.target.dataset.index);
    const cells = _get_cells(index, selected_ship.length, orientation);
    const valid = _is_valid(cells);

    cells.forEach(i => {
      const cell = document.querySelector(`[data-index="${i}"]`);
      if (cell) cell.classList.add(valid ? 'hover-valid' : 'hover-invalid');
    });
  });

  grid.addEventListener('mouseout', () => {
    document.querySelectorAll('.grid-cell').forEach(cell => {
      cell.classList.remove('hover-valid', 'hover-invalid');
    });
  });

  // Placement
  grid.addEventListener('click', (e) => {
    if (!selected_ship) return;
    const index = parseInt(e.target.dataset.index);
    const cells = _get_cells(index, selected_ship.length, orientation);
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
        _add_img_to_cell(firstCell)
    }

    ship_positions.push({
        first_index: index,          
        length: selected_ship.length, 
        is_vertical: orientation === "vertical" 
    });
    const img = document.querySelector(`#ships .${selected_ship.name}`);
    img.classList.remove('active');
    img.classList.add('placed');
    selected_ship = null;

    if (ship_positions.length === ships.length) {
      confirm_btn.disabled = false;
      confirm_btn.style.cursor = "pointer";
    }
  });
}

// Helpers
function _add_img_to_cell(first_cell){
     const shipImg = document.createElement('img');
      shipImg.src = shipImages[`${selected_ship.name}.png`];
      shipImg.alt = selected_ship.name;
      shipImg.classList.add('grid-ship', orientation);
      shipImg.style.position = 'absolute';
      shipImg.style.width = orientation === 'horizontal'
        ? `${selected_ship.length * 100}%`
        : '100%';
    shipImg.style.height = orientation === 'vertical'
        ? `${selected_ship.length * 100}%`
        : '100%';
      shipImg.style.objectFit = 'contain';
      shipImg.style.top = '0';
      shipImg.style.left = '0';
      shipImg.style.zIndex = '5';

      if (orientation === 'vertical') {
        shipImg.style.transform = 'rotate(90deg)';
      }

      first_cell.appendChild(shipImg);
}

function _get_cells(startIndex, length, orientation) {
  const cells = [];
  const row = Math.floor(startIndex / 10);

  for (let i = 0; i < length; i++) {
    const index = orientation === 'horizontal'
      ? startIndex + i
      : startIndex + i * 10;

    if (orientation === 'horizontal' && Math.floor(index / 10) !== row)
      return [];

    if (index > 99) return [];

    cells.push(index);
  }

  return cells;
}

function _is_valid(cells) {
  return cells.length > 0 && cells.every(i => {
    const cell = document.querySelector(`[data-index="${i}"]`);
    return cell && !cell.classList.contains('occupied');
  });
}

export { initPlacement, ship_positions, _add_img_to_cell };
