/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
import Position from './Position';
import Tile from "./Tile";
import {NEW_TILE_VALUE} from './constants';

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

    shiftLeft() {
        for (let i = 0; i < this.grid.length; ++i) {
            const row = this.grid[i];
            for (let j = 1; j < row.length; ++j) {
                if (!!row[j]) {
                    const tile = row[j];
                    let endPosition = j;
                    while (endPosition - 1 >= 0 && !row[endPosition - 1]) {
                        --endPosition;
                    }
                    row[endPosition] = tile;
                    row[j] = null;
                    tile.moveToPosition(false, i, endPosition);
                }
            }
        }
    }

    shiftRight() {
        for (let i = 0; i < this.grid.length; ++i) {
            const row = this.grid[i];
            for (let j = row.length - 2; j >= 0; --j) {
                if (!!row[j]) {
                    const tile = row[j];
                    let endPosition = j;
                    while (endPosition + 1 < row.length && !row[endPosition + 1]) {
                        ++endPosition;
                    }
                    row[endPosition] = tile;
                    row[j] = null;
                    tile.moveToPosition(false, i, endPosition);
                }
            }
        }
    }

    getTile(position) {
        return this.grid[position.row][position.column];
    }

    setTile(position, tile) {
        this.grid[position.row][position.column] = tile;
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
        }
        return new Position(row, column);
    }
}