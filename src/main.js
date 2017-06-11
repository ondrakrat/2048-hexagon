import 'babel-polyfill';
import GameState from './GameState';
import {Direction} from "./constants";

const game = new GameState();

// start game handler
document.querySelector('#newgame').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#game-over-overlay').style.display = 'none';
    game.newGame();
});

// movement handler
document.onkeypress = (e) => {
    if (!game.started) {
        return;
    }
    switch (e.code) {
        case 'KeyZ':
        case 'Numpad1':
            game.handleMove(Direction.DOWN_LEFT);
            break;
        case 'KeyC':
        case 'Numpad3':
            game.handleMove(Direction.DOWN_RIGHT);
            break;
        case 'KeyA':
        case 'Numpad4':
            game.handleMove(Direction.LEFT);
            break;
        case 'KeyD':
        case 'Numpad6':
            game.handleMove(Direction.RIGHT);
            break;
        case 'KeyQ':
        case 'Numpad7':
            game.handleMove(Direction.UP_LEFT);
            break;
        case 'KeyE':
        case 'Numpad9':
            game.handleMove(Direction.UP_RIGHT);
            break;
    }
};