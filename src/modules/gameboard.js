import Ship from "./ship";

export default function Gameboard() {
    const ships = [];
    const missed_attacks = [];
  
    function place_ship(start_coord, length, is_vertical = false) {
      const {x, y} = start_coord;

      if(is_vertical){
        if(y - (length - 1) > 9) return false; // coordinates going overboard, failed
        
      }else{
        if(x + (length - 1) > 9 ) return false; // coordinates going overboard, failed
      }

      const positions = [];

      if(_coord_taken(start_coord, length, is_vertical)){ 
        return false;// coordinate is taken, return false failed to insert
      }

      if(!is_vertical){
        for (let i = 0; i < length; i++) {
            positions.push([x + i,y]);
        }
      }else{
        for (let i = 0; i < length; i++) {
            positions.push([x,y - i]);
        }
      }

      const ship = Ship(length);
      ships.push({
        ship,
        positions,
        hit_positions: []
      });

      return true; //return true if succeeded placing ships
      
    }

    function _coord_taken(coord, length, is_vertical) {
      const {x, y} = coord;
      for (const target of ships) {
        for (const position of target.positions) {
          const [px, py] = position;

          for (let i = 0; i < length; i++) {
            if( is_vertical? x === px && y - i === py : x+i === px && y === py){
              return true;
            }
            
          }
        }
      }
      return false;
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
      return hit;
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
  