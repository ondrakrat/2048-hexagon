/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
import Position from './Position';
import Tile from "./Tile";
import {NEW_TILE_VALUE, MAIN_DIAGONAL, ANTI_DIAGONAL, Direction} from './constants';

export default class GameState {

    constructor() {
        this._deleteTiles();
        this.grid = null;
        this.started = false;
    }

    newGame() {
        this._deleteTiles();
        for (let i = 0; i < 2; ++i) {
            let position = GameState._randomPosition();
            while (!!this.getTile(position)) {    // if a tile was already generated on the position
                position = GameState._randomPosition();
            }
            this.setTile(position, new Tile(NEW_TILE_VALUE, position));
        }
        this.started = true;
    }

    handleMove(direction) {
        switch (direction) {
            case Direction.LEFT:
                this._shiftLeft();
                break;
            case Direction.RIGHT:
                this._shiftRight();
                break;
            case Direction.DOWN_RIGHT:
                this._shiftDownRight();
                break;
            case Direction.UP_LEFT:
                this._shiftUpLeft();
                break;
            case Direction.DOWN_LEFT:
                this._shiftDownLeft();
                break;
            case Direction.UP_RIGHT:
                this._shiftUpRight();
                break;
            default:
                console.error(`Invalid direction: ${direction}`);
                break;
        }
    }

    getTile(position) {
        return this.grid[position.row][position.column];
    }

    setTile(position, tile) {
        this.grid[position.row][position.column] = tile;
    }

    _shiftLeft() {
        for (let i = 0; i < this.grid.length; ++i) {
            const row = this.grid[i];
            for (let j = 1; j < row.length; ++j) {
                const tile = row[j];
                if (!!tile) { // if there is a tile
                    const tile = row[j];
                    let endPosition = j;
                    // move until next tile is encountered, up to start
                    while (endPosition - 1 >= 0 && !row[endPosition - 1]) {
                        --endPosition;
                    }
                    if (tile.compare(new Position(i, endPosition))) {
                        // while was not called, thus tile should not be shifted
                        continue;
                    }
                    row[endPosition] = tile;
                    row[j] = null;
                    tile.moveToPosition(false, i, endPosition);
                }
            }
        }
    }

    _shiftRight() {
        for (let i = 0; i < this.grid.length; ++i) {
            const row = this.grid[i];
            for (let j = row.length - 2; j >= 0; --j) {
                const tile = row[j];
                if (!!tile) { // if there is a tile
                    let endPosition = j;
                    // move until next tile is encountered, up to end
                    while (endPosition + 1 < row.length && !row[endPosition + 1]) {
                        ++endPosition;
                    }
                    if (tile.compare(new Position(i, endPosition))) {
                        // while was not called, thus tile should not be shifted
                        continue;
                    }
                    row[endPosition] = tile;
                    row[j] = null;
                    tile.moveToPosition(false, i, endPosition);
                }
            }
        }
    }

    _shiftDownRight() {
        for (let i = 0; i < MAIN_DIAGONAL.length; ++i) {
            const row = MAIN_DIAGONAL[i];
            this.__shiftDiagonalDown(i, row);
        }
    }

    _shiftUpLeft() {
        for (let i = 0; i < MAIN_DIAGONAL.length; ++i) {
            const row = MAIN_DIAGONAL[i];
            this.__shiftDiagonalUp(i, row);
        }
    }

    _shiftDownLeft() {
        for (let i = 0; i < ANTI_DIAGONAL.length; ++i) {
            const row = ANTI_DIAGONAL[i];
            this.__shiftDiagonalDown(i, row);
        }
    }

    _shiftUpRight() {
        for (let i = 0; i < ANTI_DIAGONAL.length; ++i) {
            const row = ANTI_DIAGONAL[i];
            this.__shiftDiagonalUp(i, row);
        }
    }

    __shiftDiagonalUp(i, row) {
        for (let j = 1; j < row.length; ++j) {
            const position = row[j];
            const tile = this.grid[position.row][position.column];
            if (!!tile) {
                let endPositionIndex = j;
                while (endPositionIndex - 1 >= 0
                && !this.grid[row[endPositionIndex - 1].row][row[endPositionIndex - 1].column]) {
                    --endPositionIndex;
                }
                if (tile.compare(row[endPositionIndex])) {
                    continue;
                }
                const endPosition = row[endPositionIndex];
                this.grid[endPosition.row][endPosition.column] = tile;
                this.grid[position.row][position.column] = null;
                tile.moveToPosition(false, endPosition.row, endPosition.column);
            }
        }
    }

    __shiftDiagonalDown(i, row) {
        for (let j = row.length - 2; j >= 0; --j) {
            const position = row[j];
            const tile = this.grid[position.row][position.column];
            if (!!tile) {
                let endPositionIndex = j;
                // move on diagonal if there is no tile, up to end
                while (endPositionIndex + 1 < row.length
                && !this.grid[row[endPositionIndex + 1].row][row[endPositionIndex + 1].column]) {
                    ++endPositionIndex;
                }
                if (tile.compare(row[endPositionIndex])) {
                    // while was not called, thus tile should not be shifted
                    continue;
                }
                const endPosition = row[endPositionIndex];
                this.grid[endPosition.row][endPosition.column] = tile;
                this.grid[position.row][position.column] = null;
                tile.moveToPosition(false, endPosition.row, endPosition.column);
            }
        }
    }

    _deleteTiles() {
        this.grid = [
            [null, null],
            [null, null, null],
            [null, null, null, null],
            [null, null, null],
            [null, null]
        ];
        const overlay = document.querySelector('.tile-overlay');
        const tiles = document.querySelectorAll('.tile');
        if (!!tiles) {
            tiles.forEach(tile => overlay.removeChild(tile));
        }
    }

    static _randomPosition() {
        const row = Math.floor(Math.random() * 5);    // random <0; 4>
        let column;
        switch (row) {
            case 0:
            case 4:
                column = Math.floor(Math.random() * 2);
                break;
            case 1:
            case 3:
                column = Math.floor(Math.random() * 3);
                break;
            case 2:
                column = Math.floor(Math.random() * 4);
                break;
            default:
                console.error(`Invalid row index: ${row}`);
                return null;
        }
        return new Position(row, column);
    }
}