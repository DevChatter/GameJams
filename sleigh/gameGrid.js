import { Dimensions } from './metadata.js'
import { MapAssets } from "./assets.js";

/**
 * Tracks the stuff on the grid
 */
export class GameGrid {
    constructor (train) {
        this.train = train;
        this.looseItems = [];
        this.addRandomItem();
    }

    itemPickedUp(item) {
        // todo: make it so that we're not nuking the map, just removing item ^^
        this.looseItems = [];
        this.addRandomItem();
    }

    _createGift(x, y) {
        return { x:x, y:y, itemType:'Gift', image:MapAssets.giftImages[0] };
    }

    _createDeer(x, y) {
        return { x:x, y:y, itemType:'Deer', image:MapAssets.deerImage };
    }

    /**
     * Adds either a gift or a reindeer.
     */
    addRandomItem() {
        let x = 0;
        let y = 0;
        do {
          x = Math.floor(Math.random() * Dimensions.GridWidth);
          y = Math.floor(Math.random() * Dimensions.GridHeight);
        } while (this.train.hasPieceAt(x,y));

        if (this.train.reindeerCount >= 8) {
            let gift = this._createGift(x, y);
            this.looseItems.push(gift);
        } else if (Math.random() > 0.3) {
            let deer = this._createDeer(x, y);
            this.looseItems.push(deer);
        } else {
            let gift = this._createGift(x, y);
            this.looseItems.push(gift);
        }

        // Choose a 🎁 to add to the map 
        // 🛷 🔔 💍, 🏴‍☠️ U 👂
    }
}