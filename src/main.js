import GameState from './GameState';

const game = new GameState();

// start game handler
document.querySelector('#newgame').addEventListener('click', (e) => {
    e.preventDefault();
    game.newGame();
});

// movement handler
document.onkeypress = (e) => {
    if (!game.started) {
        return;
    }
    switch (e.code) {
        case 'Numpad4':   // move left
            game.shiftLeft();
            break;
        case 'Numpad6':   // move right
            game.shiftRight();
            break;
    }
};