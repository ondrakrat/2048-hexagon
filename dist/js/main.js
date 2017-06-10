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
        }
    }, {
        key: "column",
        get: function get() {
            return this._column;
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Ondřej Kratochvíl on 10.6.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Position = __webpack_require__(0);

var _Position2 = _interopRequireDefault(_Position);

var _Tile = __webpack_require__(2);

var _Tile2 = _interopRequireDefault(_Tile);

var _constants = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameState = function () {
    function GameState() {
        _classCallCheck(this, GameState);

        this._deleteTiles();
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
            console.log('New game', this.grid);
        }
    }, {
        key: '_deleteTiles',
        value: function _deleteTiles() {
            this.grid = [[], [], [], [], []];
            var overlay = document.querySelector('.tile-overlay');
            var tiles = document.querySelectorAll('.tile');
            if (!!tiles) {
                tiles.forEach(function (tile) {
                    return overlay.removeChild(tile);
                });
            }
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
            }
            return new _Position2.default(row, column);
        }
    }]);

    return GameState;
}();

exports.default = GameState;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function () {
    function Tile(value, position) {
        _classCallCheck(this, Tile);

        this.value = value;
        this.position = position;
        this._renderTile();
    }

    _createClass(Tile, [{
        key: '_renderTile',
        value: function _renderTile() {
            var element = document.createElement('div');
            element.appendChild(document.createTextNode(this.value));
            element.classList.add('tile', 'tile-' + this.value);
            document.querySelector('.tile-overlay').appendChild(element);
            var gridElement = document.querySelectorAll('#grid-row-' + this.position.row + ' > div')[this.position.column];
            var gridRect = gridElement.getBoundingClientRect();
            element.style.top = gridRect.top + 'px';
            element.style.left = gridRect.left + 'px';
        }
    }]);

    return Tile;
}();

exports.default = Tile;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NEW_TILE_VALUE = exports.NEW_TILE_VALUE = 2;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameState = __webpack_require__(1);

var _GameState2 = _interopRequireDefault(_GameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _GameState2.default();

document.querySelector('#newgame').addEventListener('click', function (e) {
    e.preventDefault();
    game.newGame();
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map