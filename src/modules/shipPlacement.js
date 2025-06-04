import shipImages from "./utils/importImages";

const ships = [
  { name: 'carrier', length: 5 },
  { name: 'battleship', length: 4 },
  { name: 'cruiser', length: 3 },
  { name: 'submarine', length: 3 },
  { name: 'destroyer', length: 2 }
];

let selectedShip = null;
let orientation = 'horizontal';
const placedShips = [];

function initPlacement() {
  const grid = document.querySelector('.grid-box');
  const shipImgs = document.querySelectorAll('#ships .ship');
  const axisButtons = document.querySelectorAll('#ship-axis button');
  const confirmBtn = document.getElementById('confirm-plan');

  confirmBtn.disabled = true;

  // Orientation toggle
  axisButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      orientation = btn.dataset.name;
      axisButtons.forEach(b => b.classList.remove('active-btn'));
      btn.classList.add('active-btn');
    });
  });

  // Ship selection
  shipImgs.forEach(img => {
    img.addEventListener('click', () => {
      if (img.classList.contains('placed')) return;

      shipImgs.forEach(i => i.classList.remove('active'));
      img.classList.add('active');

      const shipName = img.classList[1];
      selectedShip = ships.find(s => s.name === shipName);
    });
  });

  // Hover preview
  grid.addEventListener('mouseover', (e) => {
    if (!selectedShip) return;
    const index = parseInt(e.target.dataset.index);
    const cells = getCells(index, selectedShip.length, orientation);
    const valid = isValid(cells);

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
    if (!selectedShip) return;
    const index = parseInt(e.target.dataset.index);
    const cells = getCells(index, selectedShip.length, orientation);
    if (!isValid(cells)) return;

    cells.forEach(i => {
      const cell = document.querySelector(`[data-index="${i}"]`);
      if (cell) {
        cell.classList.add('occupied', selectedShip.name);
        cell.dataset.ship = selectedShip.name;
      }
    });

    // Add actual image into the first cell
    const firstCell = document.querySelector(`[data-index="${cells[0]}"]`);
    if (firstCell) {
      const shipImg = document.createElement('img');
      shipImg.src = shipImages[`${selectedShip.name}.png`]; // ✅ Uses preloaded images
      shipImg.alt = selectedShip.name;
      shipImg.classList.add('grid-ship', orientation);
      shipImg.style.position = 'absolute';
      shipImg.style.width = orientation === 'horizontal'
        ? `${selectedShip.length * 100}%`
        : '100%';
      shipImg.style.height = orientation === 'vertical'
        ? `${selectedShip.length * 100}%`
        : '100%';
      shipImg.style.objectFit = 'contain';
      shipImg.style.top = '0';
      shipImg.style.left = '0';
      shipImg.style.zIndex = '5';

      if (orientation === 'vertical') {
        shipImg.style.transform = 'rotate(90deg)';
        shipImg.style.transformOrigin = 'top left';
      }

      firstCell.appendChild(shipImg);
    }

    placedShips.push({ name: selectedShip.name, cells });
    const img = document.querySelector(`#ships .${selectedShip.name}`);
    img.classList.remove('active');
    img.classList.add('placed');
    selectedShip = null;

    if (placedShips.length === ships.length) {
      confirmBtn.disabled = false;
    }
  });
}

// Helpers
function getCells(startIndex, length, orientation) {
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

function isValid(cells) {
  return cells.length > 0 && cells.every(i => {
    const cell = document.querySelector(`[data-index="${i}"]`);
    return cell && !cell.classList.contains('occupied');
  });
}

export { initPlacement, placedShips };
