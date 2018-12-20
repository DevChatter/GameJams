import { TileSize, Dimensions } from './metadata.js';
import { BackgroundAssets } from "./assets.js";

export class Background {

    /**
     * Creates a new instance of the Background
     */
    constructor(canvas) {
        this._canvas = canvas;
        this._context = this._canvas.getContext('2d');
        this._tilesWidth = Dimensions.BgWidth;
        this._tilesHeight = Dimensions.BgHeight;

        this._hOffset = 0;
        this._wOffset = 0;

        this._loadFromPassedAssets(BackgroundAssets);

        this._backgroundMap = [];

        this._populateSnowMap();
    }

    /**
     * Loads the backtround image assets.
     */
    _loadFromPassedAssets(bgAssets) {
        this._houseImage = bgAssets.houseImage;
        this._snowTiles = bgAssets.snowTiles;
        this._boulders = bgAssets.boulderImages;
        this._treeLogs = bgAssets.logImages;
        this._snowTreeImages = bgAssets.snowTreeImages;
    }

    /**
     * Populates the map with snow tiles.
     */
    _populateSnowMap() {
        const tileMap = [];
        for (let i = 0; i < this._tilesHeight; i++) {
            tileMap.push(this._getRandomSnowRow());
        }

        for (let h = 0; h < this._tilesHeight; h++) {
            this._backgroundMap[h] = [];
            for (let w = 0; w < this._tilesWidth; w++) {
                this._backgroundMap[h].push(tileMap[h][w]);
            }
        }
    }

    /**
     * Gets a random snow tile from the snow tiles array.
     */
    _randomFromTileArray(tileArray) {
        return tileArray[Math.floor(Math.random() * tileArray.length)];
    }

    /**
     * Returns an array of random snow tiles
     */
    _getRandomSnowRow() {
        const row = [];
        for (let w = 0; w < this._tilesWidth; w++) {
            row.push(this._randomFromTileArray(this._snowTiles));
        }
        return row;
    }

    /**
     * Renders all snowy tiles
     */
    _renderSnowyBackground() {
        for (let h = 0; h < this._tilesHeight; h++) {
            for (let w = 0; w < this._tilesWidth; w++) {
                this._context.drawImage(this._backgroundMap[h][w], h * TileSize + this._hOffset, w * TileSize + this._wOffset);
            }
        }
    }

    /**
     * Renders the house at the top center of the canvas
     */
    _renderHouse() {
        this._context.drawImage(this._houseImage, (TileSize * (Math.floor(this._tilesWidth/2))) - TileSize, TileSize);
    }

    /**
     * Renders a border of Boulders
     */
    _renderBorderAssets() {
        const leftLogIndex = Math.floor((this._tilesWidth / 2)) - 1;
        const leftTreeIndex = Math.floor((this._tilesHeight / 2)) - 3;
        for (let i = 1; i < this._tilesHeight - 1; i++) {
            // left border
            this._context.drawImage(this._boulders[0], TileSize, i * TileSize);

            // right border
            this._context.drawImage(this._boulders[1], (this._tilesHeight - 2) * TileSize, i * TileSize);
        }

        this._context.drawImage(this._snowTreeImages[0], leftTreeIndex * TileSize, 0);
        this._context.drawImage(this._snowTreeImages[1], (leftTreeIndex + 1) * TileSize, 0);

        for (let i = 1; i < this._tilesWidth - 1; i++) {
            if (i < leftTreeIndex || i > leftTreeIndex + 1) {
                this._context.drawImage(this._boulders[0], i * TileSize, TileSize);
            } else {
               if (i == leftTreeIndex) {
                    this._context.drawImage(this._snowTreeImages[2], leftTreeIndex * TileSize, TileSize);
               } else {
                    this._context.drawImage(this._snowTreeImages[3], (leftTreeIndex + 1) * TileSize, TileSize)
               }
                
            }
            
            // Render left tree log
            if (i === leftLogIndex - 1) {
                this._context.drawImage(this._treeLogs[0], i * TileSize, (this._tilesWidth - 2) * TileSize);
                continue;
            }

            // Render right tree log
            if (i === leftLogIndex) {
                this._context.drawImage(this._treeLogs[1], i * TileSize, (this._tilesWidth - 2) * TileSize);
                continue;
            }

            // bottom border
            this._context.drawImage(this._boulders[1], i * TileSize, (this._tilesWidth - 2) * TileSize);
        }
    }

    /**
     * Sets the screen coordinate offset of the background
     * @param {number} x
     * @param {number} y
     */
    setOffset(x, y) {
        this._hOffset = y;
        this._wOffset = x;
    }

    /**
     * Paints the canvas with the background image tiles.
     */
    paint() {
        this._renderSnowyBackground();
        this._renderBorderAssets();
        this._renderHouse();
    }
}