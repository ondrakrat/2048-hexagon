import 'babel-polyfill';
import GameState from './GameState';
import {Direction, LOCAL_STORAGE_KEY} from "./constants";

const game = new GameState();
if (game.localStorageAvailable && !!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    document.querySelector('svg text.high-score').textContent = localStorage.getItem(LOCAL_STORAGE_KEY);
}

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

export function storageAvailable(type) {
    try {
        let storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}