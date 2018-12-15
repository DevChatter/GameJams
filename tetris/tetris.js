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
            13: () => this.start(),
            32: () => this.start(),
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

    start() {
        this.keyMap = this.gameKeyMappings;
        this._updateCounter = 0;

        this.blockManager = new BlockManager();
        this.piece = new Piece(this.blockManager);
        this._animationLoop = window.requestAnimationFrame(this._updateHandler);
    }

    stop() {
        window.cancelAnimationFrame(this._animationLoop);
        document.removeEventListener('keydown', this._keyDownHandler); // switch to other mappings?
    }

    _update() {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) { times.shift(); }
        times.push(now);
        fps = times.length;
        this.fpsDisplay.innerText = `FPS ${fps}`;

        this._updateCounter++;
        if (this.piece.doneMoving) {
            this.piece = new Piece(this.blockManager);
        }
        if (this._updateCounter >= 30) {
            this._updateCounter = 0;
            this.piece.moveDown();
        }

        this._screenDisplay.draw(this.piece, this.blockManager);
        this._animationLoop = window.requestAnimationFrame(this._updateHandler);
    }

    _onKeyDown(event) {
        this.keyMap[event.keyCode]();
        // switch (event.keyCode) {
        //     case 87: // w
        //     case 38: // up
        //         this.piece.rotate();
        //         break;
        //     case 65: // a
        //     case 37: // left
        //         this.piece.moveLeft();
        //         break;
        //     case 83: // s
        //     case 40: // down
        //         this.piece.moveDown();
        //         break;
        //     case 68: // d
        //     case 39: // right
        //         this.piece.moveRight();
        //         break;
        //     default:
        //         break;
        // }
    }
}

let app = new Tetris()
app.initialize();