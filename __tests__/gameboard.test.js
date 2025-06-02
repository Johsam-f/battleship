import Gameboard from '../src/modules/gameboard';

describe('Gameboard Factory', () => {
    let board;
  
    beforeEach(() => {
      board = Gameboard();
    });
  
    test('places ship at given coordinates', () => {
      board.place_ship({ x: 0, y: 0 }, 3, false);
  
      const placed_ship = board.ships[0];
      expect(placed_ship.positions).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
      ]);
    });
  
    test('records a hit when a ship is attacked', () => {
      board.place_ship({ x: 1, y: 1 }, 2, false);
      board.receive_attack({ x: 1, y: 1 });
  
      const ship = board.ships[0].ship;
      expect(ship.is_sunk()).toBe(false);
      expect(board.ships[0].hit_positions).toContainEqual([1, 1]);
    });
  
    test('records a missed attack', () => {
      board.place_ship({ x: 0, y: 0 }, 2, false);
      board.receive_attack({ x: 5, y: 5 });
  
      expect(board.missed_attacks).toContainEqual({ x: 5, y: 5 });
    });
  
    test('correctly detects all ships sunk', () => {
      board.place_ship({ x: 0, y: 0 }, 2, false);
      board.receive_attack({ x: 0, y: 0 });
      board.receive_attack({ x: 1, y: 0 });
  
      expect(board.all_ships_sunk()).toBe(true);
    });
  });
  