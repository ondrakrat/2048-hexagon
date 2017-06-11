/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
import Position from './Position';

export default class Tile {

    constructor(value, position) {
        this.value = value;
        this.position = position;
        this.element = null;
        this.justMerged = false;
        this._renderTile();
    }

    moveToPosition(useCurrent, row, column) {
        if (!useCurrent) {
            this.position.row = row;
            this.position.column = column;
        }
        const gridElement = document.querySelectorAll(`#grid-row-${this.position.row} > div`)[this.position.column];
        const gridRect = gridElement.getBoundingClientRect();
        this.element.style.top = `${gridRect.top}px`;
        this.element.style.left = `${gridRect.left}px`;
    }

    merge(other) {
        this.element.classList.remove(`tile-${this.value}`);
        this.value *= 2;
        if (this.value > 2048) {
            this.element.classList.add('tile-high');
        } else {
            this.element.classList.add(`tile-${this.value}`);
        }
        this.element.innerHTML = this.value;
        this.justMerged = true;
        // delete the other tile that was merged into this one
        const overlay = document.querySelector('.tile-overlay');
        overlay.removeChild(other.element);
        if (this.value > 65536) {
            this.element.style.fontSize = '30px';
        } else if (this.value > 8192) {
            this.element.style.fontSize = '35px';
        }
        return this.value;  // score increment
    }

    compare(position) {
        return this.position.row === position.row && this.position.column === position.column;
    }

    _renderTile() {
        this.element = document.createElement('div');
        this.element.appendChild(document.createTextNode(this.value));
        this.element.classList.add('tile', `tile-${this.value}`);
        document.querySelector('.tile-overlay').appendChild(this.element);
        this.moveToPosition(true);
    }
}