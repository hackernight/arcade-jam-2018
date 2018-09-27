# arcade-jam-2018

## Getting Started

1. Install Yarn
1. `yarn install` to install dependencies to your machine (You can also just run `yarn` for this)

## Adding new components or scenes

### Creating a new Prefab

Prefabs are great for encapsulating things like a sprite with behavior, or some text that you want to update separately. To make a new one, run

`yarn phaser:prefab`

### Creating a new Shader

These are black magic. They run on the graphics card to mutate or create what's rendered. Would not recommend for a game jam but here's the command nonetheless. To create a new one, run

`yarn phaser:shader`

### Creating a new State

Ideally we don't need any of these in a game jam, but if you do decide we need a new state somewhere between `src/states/game.js` and `src/states/gameover.js`, you can get one by running

`yarn phaser:state`

## Relevant API docs

We're using Phaser Community Edition (CE) 2.11. This is a community continuation of Phaser 2, which officially ended at 2.6.2.

All of the Phaser CE docs are for latest version only, so if this project gets outdated, you may be misled.

- [Phaser CE specific docs](https://photonstorm.github.io/phaser-ce/index.html)
- [Phaser CE specific examples](https://codepen.io/collection/AMbZgY/)
- [Phaser CE source code](https://github.com/photonstorm/phaser-ce)

Older but still useful

- [Phaser 2.6.2 docs](https://www.phaser.io/docs/2.6.2/index)
- [Phaser 2.6.2 examples](https://www.phaser.io/examples) (this link will probably be misleading when Phaser 3 becomes stable)

Shader-specific

- [Neat shader library](http://glslsandbox.com/) constantly updated
