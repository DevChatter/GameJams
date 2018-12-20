import { TileSize } from './metadata.js'

export class ScreenDisplay {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
    }

    _clearCanvas() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    paintGame(train, gameGrid) {
        this._clearCanvas()
        if (train) train.paint(this._context);
        if (gameGrid) gameGrid.looseItems.forEach(item => {
            this._context.drawImage(item.image, item.x * TileSize, item.y * TileSize);
        });
    }
}
