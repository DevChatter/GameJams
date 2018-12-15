export class GameState {
    constructor () {
        this.pointsDisplay = document.getElementById('points');
        this.rowsDisplay = document.getElementById('rows');
        this.piecesDisplay = document.getElementById('pieces');
        this.reset();
    }

    displayData() {
        this.pointsDisplay.innerText = `Points: ${this.points}`;
        this.rowsDisplay.innerText = `Rows: ${this.rowsCleared}`;
        this.piecesDisplay.innerText = `Pieces: ${this.pieceCount}`;
    }

    reset() {
        this.isRunning = false;
        this.points = 0;
        this.rowsCleared = 0;
        this.pieceCount = 0;
    }

    start() {
        this.isRunning = true;
    }

    end() {
        this.isRunning = false;
    }

    recordClearedRows(rowCount, level) {
        const pointsToAdd = rowCount * rowCount * 1000 * level;
        this.points += pointsToAdd;
        this.rowsCleared += rowCount;
    }

    recordPiece(piece) {
        this.pieceCount++;
    }
}