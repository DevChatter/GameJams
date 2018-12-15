export class BlockManager {
    constructor(gameState) {
        this.grid = [];
        this._addEmptyRows(20);
        this.x = 0;
        this.y = 0;
        this.gameState = gameState;
    }

    addBlocks(blocks) {
        blocks.forEach(block => {
            block.container = this;
            this.grid[block.y][block.x] = block;
        });
        const rowCount = this.clearCompleteRows(blocks.map(block => block.y));
        this.gameState.recordClearedRows(rowCount, 1);
    }

    hasAtLocation(x, y) {
        return this.grid[y][x] !== null;
    }

    clearCompleteRows(rowsToCheck) {
        this.grid = this.grid.filter(row => row.some(block => block === null));
        let countRemoved = 20 - this.grid.length;
        if (countRemoved > 0) {
            this._addEmptyRows(countRemoved);
            this._setNewBlockLocations();
        }
        return countRemoved;
    }

    _setNewBlockLocations() {
        this.grid.forEach((row, y) => {
            row.forEach(block => {
                if (block !== null) {
                    block.y = y;
                }
            });
        });
    }

    _addEmptyRows(count) {
        let rowsToAdd = new Array(count).fill(null).map(() => new Array(10).fill(null));
        this.grid = rowsToAdd.concat(this.grid);
    }
}