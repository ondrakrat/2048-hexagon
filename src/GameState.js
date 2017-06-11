/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
import Position from './Position';
import Tile from "./Tile";
import {NEW_TILE_VALUE, MAIN_DIAGONAL, ANTI_DIAGONAL, Direction, LOCAL_STORAGE_KEY} from './constants';
import {storageAvailable} from './main';

export default class GameState {

    constructor() {
        this._deleteTiles();
        this.grid = null;
        this.started = false;
        this.movedThisTurn = false;
        this.score = 0;
        this.localStorageAvailable = storageAvailable('localStorage');
        if (this.localStorageAvailable && !localStorage.getItem(LOCAL_STORAGE_KEY)) {
            localStorage.setItem(LOCAL_STORAGE_KEY, 0);
        }
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
        document.querySelector('.tile-overlay').style.opacity = 1;
        this.movedThisTurn = false;
        this.started = true;
        this.score = 0;
        document.querySelector('svg text.score').textContent = this.score;
    }

    gameOver() {
        document.querySelector('.tile-overlay').style.opacity = 0.1;
        document.querySelector('#game-over-overlay').style.display = 'block';
        this.started = false;
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
        if (this.movedThisTurn) {
            this._generateRandomTiles();
            this.movedThisTurn = false;
            if (this._countEmpty() === 0) {
                this._checkGameOver();
            }
        }
        document.querySelector('svg text.score').textContent = this.score;
        if (this.localStorageAvailable && this.score > localStorage.getItem(LOCAL_STORAGE_KEY)) {
            localStorage.setItem(LOCAL_STORAGE_KEY, this.score);
            document.querySelector('svg text.high-score').textContent = localStorage.getItem(LOCAL_STORAGE_KEY);
        }
        this._deleteMergedFlag();
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
                    if (endPosition > 0 && !!row[endPosition - 1]
                        && row[endPosition - 1].value === tile.value && !row[endPosition - 1].justMerged) { // check for mergeable tile
                        tile.moveToPosition(false, i, endPosition - 1);
                        this.score += row[endPosition - 1].merge(tile);
                        row[j] = null;
                        this.movedThisTurn = true;
                        continue;
                    } else if (tile.compare(new Position(i, endPosition))) {
                        // while was not called, thus tile should not be shifted
                        continue;
                    }
                    row[endPosition] = tile;
                    row[j] = null;
                    tile.moveToPosition(false, i, endPosition);
                    this.movedThisTurn = true;
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
                    if (endPosition < row.length - 1 && !!row[endPosition + 1]
                        && row[endPosition + 1].value === tile.value && !row[endPosition + 1].justMerged) {
                        tile.moveToPosition(false, i, endPosition + 1);
                        this.score += row[endPosition + 1].merge(tile);
                        row[j] = null;
                        this.movedThisTurn = true;
                        continue;
                    } else if (tile.compare(new Position(i, endPosition))) {
                        // while was not called, thus tile should not be shifted
                        continue;
                    }
                    row[endPosition] = tile;
                    row[j] = null;
                    tile.moveToPosition(false, i, endPosition);
                    this.movedThisTurn = true;
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
                if (endPositionIndex > 0
                    && !!this.grid[row[endPositionIndex - 1].row][row[endPositionIndex - 1].column]
                    && this.grid[row[endPositionIndex - 1].row][row[endPositionIndex - 1].column].value === tile.value
                    && !this.grid[row[endPositionIndex - 1].row][row[endPositionIndex - 1].column].justMerged) {
                    const endPosition = row[endPositionIndex - 1];
                    tile.moveToPosition(false, endPosition.row, endPosition.column);
                    this.score += this.grid[endPosition.row][endPosition.column].merge(tile);
                    this.grid[position.row][position.column] = null;
                    this.movedThisTurn = true;
                    continue;
                } else if (tile.compare(row[endPositionIndex])) {
                    continue;
                }
                const endPosition = row[endPositionIndex];
                this.grid[endPosition.row][endPosition.column] = tile;
                this.grid[position.row][position.column] = null;
                tile.moveToPosition(false, endPosition.row, endPosition.column);
                this.movedThisTurn = true;
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
                if (endPositionIndex < row.length - 1
                    && !!this.grid[row[endPositionIndex + 1].row][row[endPositionIndex + 1].column]
                    && this.grid[row[endPositionIndex + 1].row][row[endPositionIndex + 1].column].value === tile.value
                    && !this.grid[row[endPositionIndex + 1].row][row[endPositionIndex + 1].column].justMerged) {
                    const endPosition = row[endPositionIndex + 1];
                    tile.moveToPosition(false, endPosition.row, endPosition.column);
                    this.score += this.grid[endPosition.row][endPosition.column].merge(tile);
                    this.grid[position.row][position.column] = null;
                    this.movedThisTurn = true;
                    continue;
                } else if (tile.compare(row[endPositionIndex])) {
                    // while was not called, thus tile should not be shifted
                    continue;
                }
                const endPosition = row[endPositionIndex];
                this.grid[endPosition.row][endPosition.column] = tile;
                this.grid[position.row][position.column] = null;
                tile.moveToPosition(false, endPosition.row, endPosition.column);
                this.movedThisTurn = true;
            }
        }
    }

    _generateRandomTiles() {
        const empty = this._countEmpty();
        if (empty === 0) {
            this.gameOver();
            return;
        }
        const generatedAmount = empty > 3 ? (Math.floor(Math.random() * 2) + 1) : 1;
        for (let i = 0; i < generatedAmount; ++i) {
            let position = GameState._randomPosition();
            while (!!this.grid[position.row][position.column]) {
                position = GameState._randomPosition();
            }
            // generate tile 4 with 25% probability
            const tile = new Tile(Math.random() * 100 > 75 ? 4 : 2, position);
            this.setTile(position, tile);
        }
    }

    _deleteMergedFlag() {
        this.grid.forEach(row => {
            row
                .filter(row => !!row)
                .forEach(tile => {
                tile.justMerged = false;
            });
        });
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

    _countEmpty() {
        let count = 0;
        this.grid.forEach(row => {
            row
                .filter(row => !row)
                .forEach(tile => {
                    ++count;
                });
        });
        return count;
    }

    _checkGameOver() {
        let canMove = false;
        this.grid.forEach(row => {
            let lastValue = -1;
            for (let i = 0; i < row.length; ++i) {
                if (!row[i] || row[i].value === lastValue) {    // check if right/left movement is possible
                    canMove = true;
                    return;
                }
                lastValue = row[i].value;
            }
        });
        MAIN_DIAGONAL.forEach(row => {
            let lastValue = -1;
            for (let i = 0; i < row.length; ++i) {
                const tile = this.grid[row[i].row][row[i].column];
                if (!tile || tile.value === lastValue) {    // check if main diagonal movement is possible
                    canMove = true;
                    return;
                }
                lastValue = tile.value;
            }
        });
        ANTI_DIAGONAL.forEach(row => {
            let lastValue = -1;
            for (let i = 0; i < row.length; ++i) {
                const tile = this.grid[row[i].row][row[i].column];
                if (!tile || tile.value === lastValue) {    // check if anti diagonal movement is possible
                    canMove = true;
                    return;
                }
                lastValue = tile.value;
            }
        });
        if (!canMove) {
            this.gameOver();
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