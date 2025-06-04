const login_form = () => {
    return `
        <section id="login">
        <h1 class="exile-regular">battleship</h1>
        <form action="#" id="submit-name">
          <input
            type="text"
            id = "cap-name"
            placeholder="Enter Captain's Name"
            class="tagesschrift-regular"
            required
          /><br />
          <button type="submit">
            Comfirm Cap's Name
          </button>
        </form>
      </section>
    `;
}

const help_panel = () => {
    return`
        <section class="help-modal hidden">
        <div class="help-content">
          <button class="close-help">&times;</button>
          <h2>How to Play Battleship</h2>
          <div class="instructions">
            <p><strong>1. Ship Placement Phase:</strong></p>
            <ul>
              <li>
                Place your ships on the board by clicking the appropriate 
                grid cell (press the buttons,
                "vertical/horizontal" to place ship in specific axis)
              </li>
              <li>Ships cannot overlap or extend beyond the grid</li>
              <li>
                Carrier (5m), Battleship (4m), Cruiser (3m), Submarine (3m),
                Destroyer (2m)
              </li>
            </ul>

            <p><strong>2. Battle Phase:</strong></p>
            <ul>
              <li>Take turns clicking opponent's grid to attack</li>
              <li>Red marker = Hit, White marker = Miss</li>
              <li>Sink all enemy ships to win</li>
            </ul>

            <p>
              <strong>Pro Tip:</strong> Spread out ships and track missed shots!
            </p>
          </div>
        </div>
      </section>
    `;
}

// const place_ships = cap_name => {
//     let grid_cells = '';
//     for (let i = 1; i <= 100; i++) {
//       grid_cells += `<div data-index="${i}" class="grid-cell"></div>`;
//     }

//     return `
//         <section id="insert-ships">
//         <h2>
//           Hello captain <span><strong>${cap_name}</strong></span
//           >!
//         </h2>
//         <button id="details" title="how to play?">?</button>
//         <p>
//           Ahoy, <span><strong>${cap_name}</strong></span
//           >! Time to deploy your ships—click and drag them onto the grid. No
//           take-backsies once they're set! <i class="fas fa-anchor"></i>
//         </p>
//         <div class="flex">
//           <section class="grid-box">
//             ${grid_cells}
//           </section>
//           <aside id="ships"></aside>
//         </div>
//         <section id="ship-axis">
//           <button data-name="horizontal" class="active-btn">Horizontal</button>
//           <button data-name="vertical">Vertical</button>
//         </section>
//       </section>
//     `;
// }

const place_ships = (cap_name) => {
    let grid_cells = '';
    for (let i = 0; i < 100; i++) {
      grid_cells += `<div data-index="${i}" class="grid-cell"></div>`;
    }
  
    const ships = [
      { name: 'carrier', length: 5 },
      { name: 'battleship', length: 4 },
      { name: 'cruiser', length: 3 },
      { name: 'submarine', length: 3 },
      { name: 'destroyer', length: 2 }
    ];
  
    return `
      <section id="insert-ships">
        <h2>Hello captain <span><strong>${cap_name}</strong></span>!</h2>
        <p>
          Ahoy, <span><strong>${cap_name}</strong></span>! Time to deploy your ships—click and drag them onto the grid. No take-backsies once they're set! <i class="fas fa-anchor"></i>
        </p>
        <section id="ship-axis">
          <button data-name="horizontal" class="active-btn">Horizontal</button>
          <button data-name="vertical">Vertical</button>
        </section>
        <div class="flex">
            <section class="grid-box">${grid_cells}</section>
            <aside id="ships">
                <img src="./assets/carrier.png" class="ship" draggable="true">
                <img src="./assets/battleship.png" class="ship" draggable="true">
                <img src="./assets/cruiser.png" class="ship" draggable="true">
                <img src="./assets/submarine.png" class="ship" draggable="true">
                <img src="./assets/destroyer.png" class="ship" draggable="true">
            </aside>
        </div>
        <section>
            <button id="confirm-plan">Enter Battle</button>
        </section>
        
        <button id="details" title="how to play?">?</button>
      </section>
    `;
  };

  export {place_ships, help_panel, login_form} ;
  