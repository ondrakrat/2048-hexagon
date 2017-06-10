import GameState from './GameState';

const game = new GameState();

document.querySelector('#newgame').addEventListener('click', (e) => {
    e.preventDefault();
    game.newGame();
});