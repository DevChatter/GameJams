import { KEY } from '../shared/keymap.js'
import { Background } from './background.js'; // why commented out? //couldn't use it while people were typing in it
import { ScreenDisplay } from './screenDisplay.js';
import { Train } from './train.js';
import { BackgroundAssets } from './assets.js';
import { Direction } from './metadata.js';
import { GameGrid } from './gameGrid.js';

const canvas = document.getElementById('gridCanvas');
const bgCanvas = document.getElementById('bgCanvas');
const startDiv = document.getElementById('start');
const keyMap = {};
const baseSpeed = 30;

export class Sleigh {
    constructor() {
        this.isRunning = false;
        this._keyDownHandler = this._onKeyDown.bind(this);
        this._updateHandler = this._update.bind(this);

        this.screen = new ScreenDisplay(canvas);

        keyMap[KEY.ENTER] = () => this._startGame();
        keyMap[KEY.SPACE] = () => this._startGame();
        keyMap[KEY.W] = keyMap[KEY.UP] = keyMap[KEY.NUMPAD_EIGHT] = () => this.train.setDirection(Direction.Up);
        keyMap[KEY.A] = keyMap[KEY.LEFT] = keyMap[KEY.NUMPAD_FOUR] = () => this.train.setDirection(Direction.Left);
        keyMap[KEY.S] = keyMap[KEY.DOWN] = keyMap[KEY.NUMPAD_TWO] = () => this.train.setDirection(Direction.Down);
        keyMap[KEY.D] = keyMap[KEY.RIGHT] = keyMap[KEY.NUMPAD_SIX] = () => this.train.setDirection(Direction.Right);
        this._addKeyHandler();
    } // long live the Grinch

    //
    _addKeyHandler() {
        window.addEventListener('keydown', this._onKeyDown);
    }

    _startGame() {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        this.tickCount = 0;
        this.background = new Background(bgCanvas, BackgroundAssets);
        
        // set startDiv opacity to zero to hide the element without moving the DOM elements
        startDiv.style.opacity = 0; 

        this.background.paint();

        this.train = new Train();
        this.gameGrid = new GameGrid(this.train);

        // Play Game
        this._animationLoop = window.requestAnimationFrame(this._updateHandler);
    }

    _update() {
        this.tickCount++;
        if (this.tickCount > (baseSpeed - this.train.reindeerCount * 2)) {
            this.tickCount = 0;
            this.train.move(this.gameGrid);
            this.screen.paintGame(this.train, this.gameGrid);
        }
        this._animationLoop = window.requestAnimationFrame(this._updateHandler);
    }

    _endGame() {
        window.cancelAnimationFrame(this._animationLoop);
        this.isRunning = false;
    }

    _onKeyDown(event) {
        const keyAction = keyMap[event.keyCode];
        if (keyAction) {
            event.preventDefault();
            keyAction();
        }
    }
}

const sleigh = new Sleigh();
