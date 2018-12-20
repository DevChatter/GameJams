import { drawImageTile, MapAssets } from "./assets.js";
import { TileSize, Direction, Dimensions } from "./metadata.js";

export class Train {

    constructor() {
        // pieces are added in grid co-ordinates
        this.pieces = [
            {
                x: 7,
                y: 7,
                facing: Direction.Right
            },
            {
                x: 6,
                y: 7,
                facing: Direction.Right
            }
        ];
        this.nextDirection = Direction.Right;
        this.direction = Direction.Right;
        this.reindeerCount = 1;
        this.gifts = [];
    }

    move(gridEntities) {

        const head = this.pieces[0];
        this.updateDirection();
        let newPiece = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y,
            facing: this.direction
        };

        // TODO: Check if there's an item at this location.
        // If so, add an item and skip the pop.
        let newTrainPiece = this._getPieceAt(gridEntities.looseItems, newPiece.x, newPiece.y);
        if(newTrainPiece){
            if(newTrainPiece.itemType === 'Gift') {
                this.addGift(newTrainPiece.image);
            } else {
                this.addReindeer();
            }
            gridEntities.itemPickedUp(newTrainPiece);
        }

        if(this._inBounds(newPiece)) {
            this.pieces.unshift(newPiece);
            if (!newTrainPiece) {
                this.pieces.pop();
            }
        }
        else {
            // trigger end game
        }
    }

    _getPieceAt(entites, x, y) {
        return entites.find(entity => entity.x === x && entity.y === y);
    }

    _inBounds(piece) {
        return !(piece.x > Dimensions.GridWidth-1 || piece.y > Dimensions.GridHeight-1 || piece.x < Dimensions.GridStart || piece.y < Dimensions.GridStart);
    }

    updateDirection() {
        if (this.direction === Direction.Down && this.nextDirection === Direction.Up) { return; }
        if (this.direction === Direction.Up && this.nextDirection === Direction.Down) { return; }
        if (this.direction === Direction.Left && this.nextDirection === Direction.Right) { return; }
        if (this.direction === Direction.Right && this.nextDirection === Direction.Left) { return; }
        this.direction = this.nextDirection;
    }

    setDirection(direction) {
        this.nextDirection = direction;
    }

    addGift(giftImageRef) {

        this.gifts.push(giftImageRef);

    }

    addReindeer() {
        this.reindeerCount++;
    }

    hasPieceAt(x,y) {
        return this.pieces.some(piece => piece.x === x && piece.y === y);
    }

    paint(ctx) {
        // train index will track our current position
        let currentIndex = 0;

        // paint all reindeer
        for(var i = 0; i< this.reindeerCount; i++){
            drawImageTile(ctx, this.pieces[currentIndex], MapAssets.runningReindeerImage);
            currentIndex++;
        }

        // paint the sled
        drawImageTile(ctx, this.pieces[currentIndex], MapAssets.sleighImage)
        currentIndex++;

        // paint all the gifts -- these are stored in our local array
        // so that the correct order of colors is maintained
        for(var i = 0; i< this.gifts.length; i++){
            drawImageTile(ctx, this.pieces[currentIndex], this.gifts[i]);
            currentIndex++;
        }

    }

}