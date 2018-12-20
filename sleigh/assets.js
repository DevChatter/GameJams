import { Direction, TileSize } from './metadata.js';

const house = new Image();
house.src = './images/FullHouse.png';

const snowTiles = [];
const boulders = [];
const logs = [];
const trees = [];

function createSnowTiles() {
    for(let i = 1; i < 2; i++) {
        const snowTile = new Image();
        snowTile.src = `./images/Tiles/SnowTile-${i.toString()}.png`;
        snowTiles.push(snowTile);
    }
}

function createBoulderTiles() {
    for (let i = 1; i < 5; i++) {
        const boulderTile = new Image();
        boulderTile.src = `./images/Walls/LargeBoulderTransparent-${i.toString()}.png`;
        boulders.push(boulderTile);
    }
}

function createLogTiles() {
    for (let i = 1; i < 5; i++) {
        const logTile = new Image();
        logTile.src = `./images/Walls/LogTransparent-${i.toString()}.png`;
        logs.push(logTile);
    }
}

function createTreeTiles() {
    for (let i = 1; i < 7; i++) {
        const treeTile = new Image();
        treeTile.src = `./images/Walls/SnowTree-${i.toString()}.png`;
        trees.push(treeTile);
    }
}

createSnowTiles();
createBoulderTiles();
createLogTiles();
createTreeTiles();

export const BackgroundAssets = {
    houseImage: house,
    boulderImages: boulders,
    logImages: logs,
    snowTreeImages: trees,
    snowTiles: snowTiles,
}

let redGiftImage = new Image();
let blueGiftImage = new Image();
let greenGiftImage = new Image();

redGiftImage.src = './images/gift-red-1.png';
blueGiftImage.src = './images/gift-blue-1.png';
greenGiftImage.src = './images/gift-green-1.png';

export const giftImages = [redGiftImage, blueGiftImage, greenGiftImage];

const sleighImage = new Image();
sleighImage.src = './images/sleigh/sleigh.png';

const runningReindeerImage = new Image();
runningReindeerImage.src = './images/Running-Reindeer-1.png';

const deerImage = new Image();
deerImage.src = './images/Reindeer-1.png';

export const MapAssets = {
    sleighImage: sleighImage,
    giftImages: giftImages,
    deerImage: deerImage,
    runningReindeerImage: runningReindeerImage
}

export function drawImageTile(ctx, piece, image) {
    const xScale = piece.facing === Direction.Left ? -1 : 1;
    const xLocation = piece.facing === Direction.Left ? (piece.x + 1) * TileSize : piece.x * TileSize;
    
    ctx.save();
    ctx.translate(xLocation, piece.y * TileSize);
    ctx.scale(xScale, 1);
    ctx.drawImage(image, 0, 0, TileSize, TileSize, 0, 0, TileSize, TileSize); 
    ctx.restore();
}
