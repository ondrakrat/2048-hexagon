/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Ondřej Kratochvíl on 10.6.17.
 */
var Position = function () {
    function Position(row, column) {
        _classCallCheck(this, Position);

        this._row = row;
        this._column = column;
    }

    _createClass(Position, [{
        key: "row",
        get: function get() {
            return this._row;
        },
        set: function set(row) {
            this._row = row;
        }
    }, {
        key: "column",
        get: function get() {
            return this._column;
        },
        set: function set(column) {
            this._column = column;
        }
    }]);

    return Position;
}();

exports.default = Position;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ANTI_DIAGONAL = exports.MAIN_DIAGONAL = exports.Direction = exports.NEW_TILE_VALUE = undefined;

var _Position = __webpack_require__(0);

var _Position2 = _interopRequireDefault(_Position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NEW_TILE_VALUE = exports.NEW_TILE_VALUE = 2;
var Direction = exports.Direction = {
    LEFT: Symbol('LEFT'),
    RIGHT: Symbol('RIGHT'),
    UP_LEFT: Symbol('UP_LEFT'),
    UP_RIGHT: Symbol('UP_RIGHT'),
    DOWN_LEFT: Symbol('DOWN_LEFT'),
    DOWN_RIGHT: Symbol('DOWN_RIGHT')
};
var MAIN_DIAGONAL = exports.MAIN_DIAGONAL = [[new _Position2.default(0, 1), new _Position2.default(1, 2), new _Position2.default(2, 3)], [new _Position2.default(0, 0), new _Position2.default(1, 1), new _Position2.default(2, 2), new _Position2.default(3, 2)], [new _Position2.default(1, 0), new _Position2.default(2, 1), new _Position2.default(3, 1), new _Position2.default(4, 1)], [new _Position2.default(2, 0), new _Position2.default(3, 0), new _Position2.default(4, 0)]];
var ANTI_DIAGONAL = exports.ANTI_DIAGONAL = [[new _Position2.default(0, 0), new _Position2.default(1, 0), new _Position2.default(2, 0)], [new _Position2.default(0, 1), new _Position2.default(1, 1), new _Position2.default(2, 1), new _Position2.default(3, 0)], [new _Position2.default(1, 2), new _Position2.default(2, 2), new _Position2.default(3, 1), new _Position2.default(4, 0)], [new _Position2.default(2, 3), new _Position2.default(3, 2), new _Position2.default(4, 1)]];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Ondřej Kratochvíl on 10.6.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Position = __webpack_require__(0);

var _Position2 = _interopRequireDefault(_Position);

var _Tile = __webpack_require__(3);

var _Tile2 = _interopRequireDefault(_Tile);

var _constants = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameState = function () {
    function GameState() {
        _classCallCheck(this, GameState);

        this._deleteTiles();
        this.grid = null;
        this.started = false;
        this.movedThisTurn = false;
    }

    _createClass(GameState, [{
        key: 'newGame',
        value: function newGame() {
            this._deleteTiles();
            for (var i = 0; i < 2; ++i) {
                var position = GameState._randomPosition();
                while (!!this.getTile(position)) {
                    // if a tile was already generated on the position
                    position = GameState._randomPosition();
                }
                this.setTile(position, new _Tile2.default(_constants.NEW_TILE_VALUE, position));
            }
            this.movedThisTurn = false;
            this.started = true;
        }
    }, {
        key: 'gameOver',
        value: function gameOver() {
            alert('Game over');
            this.started = false;
        }
    }, {
        key: 'handleMove',
        value: function handleMove(direction) {
            switch (direction) {
                case _constants.Direction.LEFT:
                    this._shiftLeft();
                    break;
                case _constants.Direction.RIGHT:
                    this._shiftRight();
                    break;
                case _constants.Direction.DOWN_RIGHT:
                    this._shiftDownRight();
                    break;
                case _constants.Direction.UP_LEFT:
                    this._shiftUpLeft();
                    break;
                case _constants.Direction.DOWN_LEFT:
                    this._shiftDownLeft();
                    break;
                case _constants.Direction.UP_RIGHT:
                    this._shiftUpRight();
                    break;
                default:
                    console.error('Invalid direction: ' + direction);
                    break;
            }
            if (this.movedThisTurn) {
                this._generateRandomTiles();
                this.movedThisTurn = false;
                if (this._countEmpty() === 0) {
                    this._checkGameOver();
                }
            }
            this._deleteMergedFlag();
        }
    }, {
        key: 'getTile',
        value: function getTile(position) {
            return this.grid[position.row][position.column];
        }
    }, {
        key: 'setTile',
        value: function setTile(position, tile) {
            this.grid[position.row][position.column] = tile;
        }
    }, {
        key: '_shiftLeft',
        value: function _shiftLeft() {
            for (var i = 0; i < this.grid.length; ++i) {
                var row = this.grid[i];
                for (var j = 1; j < row.length; ++j) {
                    var tile = row[j];
                    if (!!tile) {
                        // if there is a tile
                        var _tile = row[j];
                        var endPosition = j;
                        // move until next tile is encountered, up to start
                        while (endPosition - 1 >= 0 && !row[endPosition - 1]) {
                            --endPosition;
                        }
                        if (endPosition > 0 && !!row[endPosition - 1] && row[endPosition - 1].value === _tile.value && !row[endPosition - 1].justMerged) {
                            // check for mergeable tile
                            _tile.moveToPosition(false, i, endPosition - 1);
                            row[endPosition - 1].merge(_tile);
                            row[j] = null;
                            this.movedThisTurn = true;
                            continue;
                        } else if (_tile.compare(new _Position2.default(i, endPosition))) {
                            // while was not called, thus tile should not be shifted
                            continue;
                        }
                        row[endPosition] = _tile;
                        row[j] = null;
                        _tile.moveToPosition(false, i, endPosition);
                        this.movedThisTurn = true;
                    }
                }
            }
        }
    }, {
        key: '_shiftRight',
        value: function _shiftRight() {
            for (var i = 0; i < this.grid.length; ++i) {
                var row = this.grid[i];
                for (var j = row.length - 2; j >= 0; --j) {
                    var tile = row[j];
                    if (!!tile) {
                        // if there is a tile
                        var endPosition = j;
                        // move until next tile is encountered, up to end
                        while (endPosition + 1 < row.length && !row[endPosition + 1]) {
                            ++endPosition;
                        }
                        if (endPosition < row.length - 1 && !!row[endPosition + 1] && row[endPosition + 1].value === tile.value && !row[endPosition + 1].justMerged) {
                            tile.moveToPosition(false, i, endPosition + 1);
                            row[endPosition + 1].merge(tile);
                            row[j] = null;
                            this.movedThisTurn = true;
                            continue;
                        } else if (tile.compare(new _Position2.default(i, endPosition))) {
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
    }, {
        key: '_shiftDownRight',
        value: function _shiftDownRight() {
            for (var i = 0; i < _constants.MAIN_DIAGONAL.length; ++i) {
                var row = _constants.MAIN_DIAGONAL[i];
                this.__shiftDiagonalDown(i, row);
            }
        }
    }, {
        key: '_shiftUpLeft',
        value: function _shiftUpLeft() {
            for (var i = 0; i < _constants.MAIN_DIAGONAL.length; ++i) {
                var row = _constants.MAIN_DIAGONAL[i];
                this.__shiftDiagonalUp(i, row);
            }
        }
    }, {
        key: '_shiftDownLeft',
        value: function _shiftDownLeft() {
            for (var i = 0; i < _constants.ANTI_DIAGONAL.length; ++i) {
                var row = _constants.ANTI_DIAGONAL[i];
                this.__shiftDiagonalDown(i, row);
            }
        }
    }, {
        key: '_shiftUpRight',
        value: function _shiftUpRight() {
            for (var i = 0; i < _constants.ANTI_DIAGONAL.length; ++i) {
                var row = _constants.ANTI_DIAGONAL[i];
                this.__shiftDiagonalUp(i, row);
            }
        }
    }, {
        key: '__shiftDiagonalUp',
        value: function __shiftDiagonalUp(i, row) {
            for (var j = 1; j < row.length; ++j) {
                var position = row[j];
                var tile = this.grid[position.row][position.column];
                if (!!tile) {
                    var endPositionIndex = j;
                    while (endPositionIndex - 1 >= 0 && !this.grid[row[endPositionIndex - 1].row][row[endPositionIndex - 1].column]) {
                        --endPositionIndex;
                    }
                    if (endPositionIndex > 0 && !!this.grid[row[endPositionIndex - 1].row][row[endPositionIndex - 1].column] && this.grid[row[endPositionIndex - 1].row][row[endPositionIndex - 1].column].value === tile.value && !this.grid[row[endPositionIndex - 1].row][row[endPositionIndex - 1].column].justMerged) {
                        var _endPosition = row[endPositionIndex - 1];
                        tile.moveToPosition(false, _endPosition.row, _endPosition.column);
                        this.grid[_endPosition.row][_endPosition.column].merge(tile);
                        this.grid[position.row][position.column] = null;
                        this.movedThisTurn = true;
                        continue;
                    } else if (tile.compare(row[endPositionIndex])) {
                        continue;
                    }
                    var endPosition = row[endPositionIndex];
                    this.grid[endPosition.row][endPosition.column] = tile;
                    this.grid[position.row][position.column] = null;
                    tile.moveToPosition(false, endPosition.row, endPosition.column);
                    this.movedThisTurn = true;
                }
            }
        }
    }, {
        key: '__shiftDiagonalDown',
        value: function __shiftDiagonalDown(i, row) {
            for (var j = row.length - 2; j >= 0; --j) {
                var position = row[j];
                var tile = this.grid[position.row][position.column];
                if (!!tile) {
                    var endPositionIndex = j;
                    // move on diagonal if there is no tile, up to end
                    while (endPositionIndex + 1 < row.length && !this.grid[row[endPositionIndex + 1].row][row[endPositionIndex + 1].column]) {
                        ++endPositionIndex;
                    }
                    if (endPositionIndex < row.length - 1 && !!this.grid[row[endPositionIndex + 1].row][row[endPositionIndex + 1].column] && this.grid[row[endPositionIndex + 1].row][row[endPositionIndex + 1].column].value === tile.value && !this.grid[row[endPositionIndex + 1].row][row[endPositionIndex + 1].column].justMerged) {
                        var _endPosition2 = row[endPositionIndex + 1];
                        tile.moveToPosition(false, _endPosition2.row, _endPosition2.column);
                        this.grid[_endPosition2.row][_endPosition2.column].merge(tile);
                        this.grid[position.row][position.column] = null;
                        this.movedThisTurn = true;
                        continue;
                    } else if (tile.compare(row[endPositionIndex])) {
                        // while was not called, thus tile should not be shifted
                        continue;
                    }
                    var endPosition = row[endPositionIndex];
                    this.grid[endPosition.row][endPosition.column] = tile;
                    this.grid[position.row][position.column] = null;
                    tile.moveToPosition(false, endPosition.row, endPosition.column);
                    this.movedThisTurn = true;
                }
            }
        }
    }, {
        key: '_generateRandomTiles',
        value: function _generateRandomTiles() {
            var empty = this._countEmpty();
            if (empty === 0) {
                this.gameOver();
                return;
            }
            var generatedAmount = empty > 3 ? Math.floor(Math.random() * 2) + 1 : 1;
            for (var i = 0; i < generatedAmount; ++i) {
                var position = GameState._randomPosition();
                while (!!this.grid[position.row][position.column]) {
                    position = GameState._randomPosition();
                }
                // generate tile 4 with 25% probability
                var tile = new _Tile2.default(Math.random() * 100 > 75 ? 4 : 2, position);
                this.setTile(position, tile);
            }
        }
    }, {
        key: '_deleteMergedFlag',
        value: function _deleteMergedFlag() {
            this.grid.forEach(function (row) {
                row.filter(function (row) {
                    return !!row;
                }).forEach(function (tile) {
                    tile.justMerged = false;
                });
            });
        }
    }, {
        key: '_deleteTiles',
        value: function _deleteTiles() {
            this.grid = [[null, null], [null, null, null], [null, null, null, null], [null, null, null], [null, null]];
            var overlay = document.querySelector('.tile-overlay');
            var tiles = document.querySelectorAll('.tile');
            if (!!tiles) {
                tiles.forEach(function (tile) {
                    return overlay.removeChild(tile);
                });
            }
        }
    }, {
        key: '_countEmpty',
        value: function _countEmpty() {
            var count = 0;
            this.grid.forEach(function (row) {
                row.filter(function (row) {
                    return !row;
                }).forEach(function (tile) {
                    ++count;
                });
            });
            return count;
        }
    }, {
        key: '_checkGameOver',
        value: function _checkGameOver() {
            var _this = this;

            var canMove = false;
            this.grid.forEach(function (row) {
                var lastValue = -1;
                for (var i = 0; i < row.length; ++i) {
                    if (!row[i] || row[i].value === lastValue) {
                        // check if right/left movement is possible
                        console.log('Movement found horizontally', row[i].position);
                        canMove = true;
                        return;
                    }
                    lastValue = row[i].value;
                }
            });
            _constants.MAIN_DIAGONAL.forEach(function (row) {
                var lastValue = -1;
                for (var i = 0; i < row.length; ++i) {
                    var tile = _this.grid[row[i].row][row[i].column];
                    if (!tile || tile.value === lastValue) {
                        // check if main diagonal movement is possible
                        console.log('Movement found on main diagonal', tile.position);
                        canMove = true;
                        return;
                    }
                    lastValue = tile.value;
                }
            });
            _constants.ANTI_DIAGONAL.forEach(function (row) {
                var lastValue = -1;
                for (var i = 0; i < row.length; ++i) {
                    var tile = _this.grid[row[i].row][row[i].column];
                    if (!tile || tile.value === lastValue) {
                        // check if anti diagonal movement is possible
                        console.log('Movement found on anti diagonal', tile.position);
                        canMove = true;
                        return;
                    }
                    lastValue = tile.value;
                }
            });
            console.log('All checks failed, canMove: ' + canMove);
            if (!canMove) {
                this.gameOver();
            }
        }
    }], [{
        key: '_randomPosition',
        value: function _randomPosition() {
            var row = Math.floor(Math.random() * 5); // random <0; 4>
            var column = void 0;
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
                    console.error('Invalid row index: ' + row);
                    return null;
            }
            return new _Position2.default(row, column);
        }
    }]);

    return GameState;
}();

exports.default = GameState;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Ondřej Kratochvíl on 10.6.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Position = __webpack_require__(0);

var _Position2 = _interopRequireDefault(_Position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function () {
    function Tile(value, position) {
        _classCallCheck(this, Tile);

        this.value = value;
        this.position = position;
        this.element = null;
        this.justMerged = false;
        this._renderTile();
    }

    _createClass(Tile, [{
        key: 'moveToPosition',
        value: function moveToPosition(useCurrent, row, column) {
            if (!useCurrent) {
                this.position.row = row;
                this.position.column = column;
            }
            var gridElement = document.querySelectorAll('#grid-row-' + this.position.row + ' > div')[this.position.column];
            var gridRect = gridElement.getBoundingClientRect();
            this.element.style.top = gridRect.top + 'px';
            this.element.style.left = gridRect.left + 'px';
        }
    }, {
        key: 'merge',
        value: function merge(other) {
            this.element.classList.remove('tile-' + this.value);
            this.value *= 2;
            this.element.classList.add('tile-' + this.value);
            this.element.innerHTML = this.value;
            this.justMerged = true;
            // delete the other tile that was merged into this one
            var overlay = document.querySelector('.tile-overlay');
            overlay.removeChild(other.element);
            if (this.value > 65536) {
                this.element.style.fontSize = '30px';
            } else if (this.value > 8192) {
                this.element.style.fontSize = '35px';
            }
        }
    }, {
        key: 'compare',
        value: function compare(position) {
            return this.position.row === position.row && this.position.column === position.column;
        }
    }, {
        key: '_renderTile',
        value: function _renderTile() {
            this.element = document.createElement('div');
            this.element.appendChild(document.createTextNode(this.value));
            this.element.classList.add('tile', 'tile-' + this.value);
            document.querySelector('.tile-overlay').appendChild(this.element);
            this.moveToPosition(true);
        }
    }]);

    return Tile;
}();

exports.default = Tile;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameState = __webpack_require__(2);

var _GameState2 = _interopRequireDefault(_GameState);

var _constants = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _GameState2.default();

// start game handler
document.querySelector('#newgame').addEventListener('click', function (e) {
    e.preventDefault();
    game.newGame();
});

// movement handler
document.onkeypress = function (e) {
    if (!game.started) {
        return;
    }
    switch (e.code) {
        case 'Numpad1':
            game.handleMove(_constants.Direction.DOWN_LEFT);
            break;
        case 'Numpad3':
            game.handleMove(_constants.Direction.DOWN_RIGHT);
            break;
        case 'Numpad4':
            game.handleMove(_constants.Direction.LEFT);
            break;
        case 'Numpad6':
            game.handleMove(_constants.Direction.RIGHT);
            break;
        case 'Numpad7':
            game.handleMove(_constants.Direction.UP_LEFT);
            break;
        case 'Numpad9':
            game.handleMove(_constants.Direction.UP_RIGHT);
            break;
    }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map