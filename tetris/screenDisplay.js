const borderWidth = 10;
const gridSize = 40;
const paddingSize = 1;
const blockSize = gridSize - (paddingSize * 2);

export class ScreenDisplay {
    constructor(canvas, bgCanvas) {
        this._canvas = canvas;
        this._bgCanvas = bgCanvas;
        this._context = this._canvas.getContext('2d');
        this._bgContext = this._bgCanvas.getContext('2d');
    }

    draw(piece, blockManager) {
        this._clearCanvas();
        piece.blocks.forEach(block => this._drawBlock(block));
        blockManager.grid.forEach(row => {
            row
              .filter(block => block !== null)
              .forEach(block => this._drawBlock(block));
        });
    }

    _clearCanvas() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawBackground() {
        this._bgContext.fillStyle = '#333333';
        this._bgContext.fillRect(0, 0, this._bgCanvas.width, this._bgCanvas.height);
        this._bgContext.strokeStyle = '#CCCCCC';
        this._bgContext.lineWidth = borderWidth;
        this._bgContext.rect(borderWidth / 2, borderWidth / -2, this._bgCanvas.width - borderWidth, this._bgCanvas.height);
        this._bgContext.stroke();
    }

    displayGameOver() {
        const fontSize = 40;
        this._context.font = `${fontSize}px Arial`;
        const text = 'Game Over';
        const measurement = this._context.measureText(text);

        this._context.fillStyle = '#CCCCCC';
        const h = 50;
        const w = measurement.width + 5;
        const x = this._canvas.width / 2 - w / 2;
        const y = this._canvas.height / 2 - h / 2;
        this._context.fillRect(x,y,w,h);

        this._context.fillStyle = '#FF0000';
        this._context.fillText(text, x, y + h /2 + fontSize / 2);
    }

    displayStartScreen() {
        const fontSize = 30;
        this._context.font = `${fontSize}px Arial`;
        const text = 'Press Enter to Start';
        const measurement = this._context.measureText(text);

        this._context.fillStyle = '#CCCCCC';
        const h = 50;
        const w = measurement.width + 5;
        const x = this._canvas.width / 2 - w / 2;
        const y = this._canvas.height / 2 - h / 2;
        this._context.fillRect(x,y,w,h);

        this._context.fillStyle = '#880000';
        this._context.fillText(text, x, y + h /2 + fontSize / 2);
    }

    _drawBlock(block) {
        this._context.fillStyle = block.color;
        const x = block.x * gridSize + paddingSize;
        const y = block.y * gridSize + paddingSize;
        this._context.fillRect(x, y, blockSize, blockSize);
    }
}