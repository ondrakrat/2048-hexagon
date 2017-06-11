# 2048 - Hexagonal edition
This is a semestral project for the A0M33KAJ subject at FEE CTU. It is a fork of the 
popular game [2048](https://en.wikipedia.org/wiki/2048_(video_game)), but instead of 
the original square game grid, the tiles can be moved in six directions.

[Play 2048-hexagon online](https://ondrakrat.github.io/2048-hexagon/dist/)
 
## Rules and controls
The goal of the game is to merge tiles with the same value in order to create a single tile 
with the value of 2048 (or the highest power of two you can get). 

The tiles can be moved with numpad keys 4 and 6 for horizontal movement, and 1, 3, 7 and 9 for 
 vertical diagonal movement, respectively. For users without numeric keyboard, the tiles can 
 be controlled alternatively with Q, E, A, D, Y and C keys. After every move, one or two tiles 
 are generated at random positions of the grid with value of 2 or 4. The game can be 
 (re)started with the 'New game' button, and if there are no valid moves to be done, the game 
 ends.

## Compilation, project structure
The JavaScript source files are written in ES6 syntax, and are transpiled via 
[babel](https://babeljs.io/) into generally compatible code. The project is bundled together
with [webpack](https://webpack.github.io/), which can be triggered in the root directory 
with the ```npm run webpack``` command. For styling, [less](http://lesscss.org/) is used 
in this project.

The files are ordered in a standard way into following structure:
* ```/dist``` - static content and compiled JS files
    * ```/css``` - LESS source files are located in the ```/less``` subfolder and are compiled 
    into the ```/build``` subfolder as .css files
    * ```/js``` - transpiled JavaScript files by babel
    * ```index.html``` - the page with the application
* ```/src``` - JavaScript source files in the ES6 syntax