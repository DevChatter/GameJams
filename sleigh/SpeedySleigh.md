# Speedy Sleigh Game

Welcome to the Speedy Sleigh game jam! Our goal is to build this game from (mostly) scratch today!

## Game Goal

In this game, the player will control a sleigh, pulled by reindeer as he/she brings on more reindeer and presents.

## Game Features

This is the (in no order) list of features for the game.

### Start Screen

When the game loads, it should not yet be running. This will prevent an immediate crash. The player needs to press the space bar (or click a button?) to start the game playing.

### Background

The background should be random snow tiles with barriers around the edge on top of those tiles. There should be a house on the top, and the trees/logs should orient correctly.

#### Background reset each round

We should regenerate the background each game start for variety.

### Starting Train Pieces

When the game starts, the train will consist of a reindeer and a sleigh.

### Automatic Movement

While playing, the train will automatically move 1 space in its current direction.

#### Variable Movement Speed

Let's start with consistent movement, but we could have the speed increase with each added reindeer and decrease a smaller amount with each present.

### Changing Direction

Players can change the direction of the lead reindeer in the sequence using arrow keys (or WASD). Each other piece will move like a train or a snake, following the preceding piece's path.

### Generating Objects

At the start of play and when there are no loose presents/reindeer, we should add a new one to the screen.

#### New Item Rules

If the sleigh is being pulled by 8 reindeer, all new items are gifts.
Else, our random selection should prioritize new reindeer over new gifts.

### Collision with Loose Reindeer

Colliding with a loose reindeer will add him/her to the front of the train, pulling the sleigh.

### Collision with Loose Presents

Colliding with a loose present will add it to the end of the train, being pulled behind the sleigh and other presents.

### Collision With Border Edges

Colliding with the border of the game will cause end-game.

### Collision with Self

Colliding with a reindeer, sleigh, or present that is part of the train will cause end-game.

#### Self-Collision Edge Case

If the head of the train is going to move into the space being vacated by the tail in the same movement, this should not cause a crash.

### Reversing Direction

If the player inputs tries to move in the opposite direction, we will ignore that input. Example: Current direction is up. Player presses down key. Train continues going up.

### Handling End-Game

When the player crashes, we will show an end-game screen, displaying the number of reindeer and presents obtained as well as the total playtime.

### Restart Game

While we're on the End Game screen, the player can press the space keyboard (or maybe also click a button) to start the game again.

### Display Statistical Information

While playing, the game should display some stats along the side.

- Current Score
- Number of Presents
- Number of Reindeer
- Current Playtime
- Previous High Score

### Display Insutrctions

We should display the game information, so that players know how to play without reading this document.

## Extra Credit Section

### Generated Item Variances

- Sometimes add more than one item at a time to give the player the choice. (Should the other one disappear when you pick up one?)
- Have carrots as an item to increase the speed.
- Have cookies as an item to slow the speed.

### Change size of the playing area

We could allow configuring the size of the gameplay area in some way.

### Game Levels

Once the player reaches some number of reindeer and presents, he/she can proceed to the next level where we start having obstacles to avoid.

- Level 2 adds static obstacles in the play area (rocks, trees, logs, etc.)
- Level 3 adds moving obstacles in the play area (penguins? - I haven't drawn this yet.)
