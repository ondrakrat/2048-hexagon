/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
import Position from './Position';
import Tile from "./Tile";
import {NEW_TILE_VALUE} from './constants';

export default class GameState {

    constructor() {
        this._deleteTiles();
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
        console.log('New game', this.grid);
    }

    _deleteTiles() {
        this.grid = [
            [],
            [],
            [],
            [],
            []
        ];
        const overlay = document.querySelector('.tile-overlay');
        const tiles = document.querySelectorAll('.tile');
        if (!!tiles) {
            tiles.forEach(tile => overlay.removeChild(tile));
        }
    }

    getTile(position) {
        return this.grid[position.row][position.column];
    }

    setTile(position, tile) {
        this.grid[position.row][position.column] = tile;
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