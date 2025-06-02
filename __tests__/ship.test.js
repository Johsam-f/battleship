import Ship from '../src/modules/ship';

describe('Ship Factory', () => {
  test('Ship is not sunk when created', () => {
    const ship = Ship(3);
    expect(ship.isSunk()).toBe(false);
  });

  test('Ship is sunk after correct number of hits', () => {
    const ship = Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('Ship does not count extra hits past length', () => {
    const ship = Ship(1);
    ship.hit();
    ship.hit(); // should not count
    expect(ship.isSunk()).toBe(true); // still sunk
  });

  test('hit function should increment hit count properly', () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
