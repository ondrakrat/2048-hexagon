/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
import Position from './Position';

export default class Tile {

    constructor(value, position) {
        this.value = value;
        this.position = position;
        this.element = null;
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