import { KEY } from '../shared/keymap.js'

const canvas = document.getElementById('gridCanvas');
const bgCanvas = document.getElementById('bgCanvas');
const keyMap = {};

export class Sleigh {
    constructor() {
        this._keyDownHandler = this._onKeyDown.bind(this);

        keyMap[KEY.ENTER] = () => this._startGame();
        keyMap[KEY.SPACE] = () => this._startGame();
    }

    _startGame() {
        // Play Game
    }

    _onKeyDown(event) {
        const keyAction = this.keyMap[event.keyCode];
        if (keyAction) {
            event.preventDefault();
            keyAction();
        }
    }
}

let sleigh = new Sleigh();
