import Ship from "./ship";

export default function Gameboard() {
    const ships = [];
    const missed_attacks = [];
  
    function place_ship(start_coord, length, is_vertical = false) {
      const positions = [];
      const {x, y} = start_coord;

      if(!is_vertical){
        for (let i = 0; i < length; i++) {
            positions.push([x+i,y]);
        }
      }else{
        for (let i = 0; i < length; i++) {
            positions.push([x,y+i]);
        }
      }

      const ship = Ship(length);
      ships.push({
        ship,
        positions,
        hit_positions: []
      });
      
    }
      
  
    function receive_attack(coord) {
      const {x, y} = coord;
      let hit = false;

      for (const target of ships) {
        for (const position of target.positions) {
          const [px, py] = position;
      
          if (x === px && y === py) {
            target.ship.hit();
            target.hit_positions.push([x, y]);
            hit = true;
            break;
          }
        }
        if (hit) break;
      }
      if(!hit) missed_attacks.push(coord);
    }    
  
    function all_ships_sunk() {
      for (const curr_ship of ships) {
        if(!curr_ship.ship.is_sunk()) return false;
      } 
      return true;
    }
  
    return {
      place_ship,
      receive_attack,
      all_ships_sunk,
      missed_attacks, // may expose for testing
      ships //for testing
    };
  }
  