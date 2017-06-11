import Position from "./Position";
export const NEW_TILE_VALUE = 2;
export const Direction = {
    LEFT: Symbol('LEFT'),
    RIGHT: Symbol('RIGHT'),
    UP_LEFT: Symbol('UP_LEFT'),
    UP_RIGHT: Symbol('UP_RIGHT'),
    DOWN_LEFT: Symbol('DOWN_LEFT'),
    DOWN_RIGHT: Symbol('DOWN_RIGHT'),
};
export const MAIN_DIAGONAL = [
    [new Position(0, 1), new Position(1, 2), new Position(2, 3)],
    [new Position(0, 0), new Position(1, 1), new Position(2, 2), new Position(3, 2)],
    [new Position(1, 0), new Position(2, 1), new Position(3, 1), new Position(4, 1)],
    [new Position(2, 0), new Position(3, 0), new Position(4, 0)]
];
export const ANTI_DIAGONAL = [
    [new Position(0, 0), new Position(1, 0), new Position(2, 0)],
    [new Position(0, 1), new Position(1, 1), new Position(2, 1), new Position(3, 0)],
    [new Position(1, 2), new Position(2, 2), new Position(3, 1), new Position(4, 0)],
    [new Position(2, 3), new Position(3, 2), new Position(4, 1)]
];
export const LOCAL_STORAGE_KEY = 'highScore';