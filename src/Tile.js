/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
import Position from './Position';

export default class Tile {

    constructor(value, position) {
        this.value = value;
        this.position = position;
        this._renderTile();
    }

    _renderTile() {
        const element = document.createElement('div');
        element.appendChild(document.createTextNode(this.value));
        element.classList.add('tile', `tile-${this.value}`);
        document.querySelector('.tile-overlay').appendChild(element);
    }
}