import { Piece } from './piece.js';
import { BlockManager } from './blockManager.js';
import { ScreenDisplay } from './screenDisplay.js';

const times = [];
let fps;
const canvas = document.getElementById('gridCanvas');
const bgCanvas = document.getElementById('bgCanvas');

export class Tetris {
    constructor() {
        this._keyDownHandler = this._onKeyDown.bind(this);
        this._updateHandler = this._update.bind(this);

        this.fpsDisplay = document.getElementById('fps');

        this.startKeyMappings = {
            13: () => this.startGame(), // enter
            32: () => this.startGame(), // space
        };
        this.gameKeyMappings = {
            87: () => this.piece.rotate(), // w
            38: () => this.piece.rotate(), // up
            65: () => this.piece.moveLeft(), // a
            37: () => this.piece.moveLeft(), // left
            83: () => this.piece.moveDown(), // s
            40: () => this.piece.moveDown(), // down
            68: () => this.piece.moveRight(), // d
            39: () => this.piece.moveRight(), // right
        };
    }

    initialize() {
        this.keyMap = this.startKeyMappings;
        this._screenDisplay = new ScreenDisplay(canvas, bgCanvas);
        this._screenDisplay.drawBackground();
        this._screenDisplay.displayStartScreen();
        document.addEventListener('keydown', this._keyDownHandler);
    }

    startGame() {
        this.keyMap = this.gameKeyMappings;
        this._updateCounter = 0;

        this.blockManager = new BlockManager();
        this.piece = new Piece(this.blockManager);
        this._animationLoop = window.requestAnimationFrame(this._updateHandler);
    }

    endGame() {
        window.cancelAnimationFrame(this._animationLoop);
        this.keyMap = this.startKeyMappings;
        this._screenDisplay.displayGameOver();
        this._screenDisplay.displayStartScreen();
    }

    _update() {
        this._animationLoop = window.requestAnimationFrame(this._updateHandler);
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) { times.shift(); }
        times.push(now);
        fps = times.length;
        this.fpsDisplay.innerText = `FPS ${fps}`;

        this._updateCounter++;
        if (this.piece.doneMoving) {
            this.piece = new Piece(this.blockManager);
        }
        if (this._isGameOver()) {
            this.endGame();
            return;
        }
        if (this._updateCounter >= 30) {
            this._updateCounter = 0;
            this.piece.moveDown();
        }

        this._screenDisplay.draw(this.piece, this.blockManager);
    }

    _isGameOver() {
        return this.piece.blocks.some(block => this.blockManager.hasAtLocation(block.x, block.y));
    }

    _onKeyDown(event) {
        const keyHandler = this.keyMap[event.keyCode];
        if (keyHandler) {
            event.preventDefault();
            keyHandler();
        }
    }
}

let app = new Tetris();
app.initialize();
