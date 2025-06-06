import shipImages from './utils/importImages';

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
                Place your ships on the board by selecting a ship and clicking the appropriate 
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

const place_ships = (cap_name) => {
    let grid_cells = '';
    for (let i = 0; i < 100; i++) {
      grid_cells += `<div data-index="${i}" class="grid-cell"></div>`;
    }
  
    return `
      <section id="insert-ships">
        <h2>Hello captain <span><strong>${cap_name}</strong></span>!</h2>
        <p>
          Ahoy, <span><strong>${cap_name}</strong></span>! Time to deploy your fleet—select a ship and click a cell to place it. Choose orientation with the buttons! <i class="fas fa-anchor"></i>
        </p>
        <div class="flex">
            <div>
                <section id="ship-axis">
                    <button data-name="horizontal" class="active-btn">Horizontal</button>
                    <button data-name="vertical">Vertical</button>
                </section>
                <section class="grid-box">${grid_cells}</section>
            </div>
            
            <aside id="ships">
                <div>
                    <img src="${shipImages['carrier.png']}" class="ship carrier">
                    <span> Carrier (5m) </span> 
                </div>
                <div>
                    <img src="${shipImages['battleship.png']}" class="ship battleship">
                    <span> battleship (4m) </span>
                </div>
                <div>
                    <img src="${shipImages['cruiser.png']}" class="ship cruiser">
                    <span> cruiser (3m) </span>
                </div>
                <div>
                    <img src="${shipImages['submarine.png']}" class="ship submarine">
                    <span> submarine (3m) </span>
                </div>
                <div>
                    <img src="${shipImages['destroyer.png']}" class="ship destroyer">
                    <span> destroyer (2m) </span>
                </div>
            </aside>
        </div>
        <section>
            <button id="confirm-plan">Enter Battle</button>
        </section>
        
        <button id="details" title="how to play?">?</button>
      </section>
    `;
};

function lay_gameboard(cap_name){
    let your_cells = '';
    let enemy_cells = '';
    for (let i = 0; i < 100; i++) {
      your_cells += `<div data-index="${i}" class="your-cell"></div>`;
      enemy_cells += `<div data-index="${i}" class="enemy-cell"></div>`;
    }

    return `
        <section id="winner-modal" class="hide">
        <div class="winner-content">
            <div id="display-winner"></div>
            <div class="win-buttons">
                <button class="exit">No!</button>
                <button class="restart">Yes!</button>
            </div>
        </div>
        </section> 

        <button id="exit-btn"><i class="fa fa-sign-out"></i></button>
      <div class="message">
        <h2>
          Ahoy, Captain <span><strong>${cap_name}</strong></span
          >!
        </h2>
        <p>
          the battle begins now! Enemy ships lurk in the fog
        </p>
      </div>
      <div class="flex-boards">
        <section id="your-board">
          <h2>your fleet</h2>
          <div class="flex">
            <div>
              <section class="player-fleet">
                ${your_cells}
              </section>
            </div>
          </div>
        </section>
        <section id="enemy-board">
          <h2>enemy's fleet</h2>
          <div class="flex">
            <section id="enemy-fleet" class="enemy-fleet">
              ${enemy_cells}
            </section>
          </div>
        </section>
      </div>
    `;
}

function display_winner(winner) {
    return `
    <h2>${winner === 'player' ? 'Victory!' : 'Defeat!'}</h2>
                <p>${winner === 'player' 
                    ? 'You outmaneuvered the enemy fleet! All ships sunk!' 
                    : 'The enemy fleet has overwhelmed your forces...'}</p>
                <p class="play-again">Play again?</p>
    `;
}

  export {place_ships, help_panel, login_form, lay_gameboard, display_winner} ;
  