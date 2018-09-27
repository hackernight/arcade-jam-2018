# arcade-jam-2018

## Getting Started

1. Install Yarn
1. `yarn install` to install dependencies to your machine (You can also just run `yarn` for this)
1. `yarn start` to start running the thing

## Working within Electron

- You can get to a console w/ error output via View -> Toggle Developer Tools (Ctrl+I on Windows, might actually be Ctrl+Shift+I)
- You can reload to pick up new changes from View -> Reload or View -> Force Reload (both Ctrl+R on Windows)

## Adding new components or states

### Creating a new Prefab

Prefabs are great for encapsulating things like a sprite with behavior, or some text that you want to update separately. To make a new one, run

`yarn phaser:prefab`

### Creating a new Shader

These are black magic. They run on the graphics card to mutate or create what's rendered. Would not recommend for a game jam but here's the command nonetheless. To create a new one, run

`yarn phaser:shader`

### Creating a new State

Ideally we don't need any of these in a game jam, but if you do decide we need a new state somewhere between `src/states/game.js` and `src/states/gameover.js`, you can get one by running

`yarn phaser:state`

After doing this, you'll need to edit `src/main.js` to register the state so it can be navigated to.

## Relevant API docs

We're using Phaser Community Edition (CE) 2.11. This is a community continuation of Phaser 2, which officially ended at 2.6.2.

We should have both Arcade Physics and P2 Physics installed and available for use. Arcade only works with non-rotated squares, P2 is more flexible but slower.

All of the Phaser CE docs are for latest version only, so if this project gets outdated, you may be misled.

- [Phaser CE specific docs](https://photonstorm.github.io/phaser-ce/index.html)
- [Phaser CE specific examples](https://codepen.io/collection/AMbZgY/)
- [Phaser CE source code](https://github.com/photonstorm/phaser-ce)

Older but still useful

- [Phaser 2.6.2 docs](https://www.phaser.io/docs/2.6.2/index)
- [Phaser 2.6.2 examples](https://www.phaser.io/examples) (this link will probably be misleading when Phaser 3 becomes stable)

Shader-specific

- [Neat shader library](http://glslsandbox.com/) constantly updated

## Additional random notes

Electron doesn't seem to support some of the newer ES6/7/8 syntaxes, and I'm too lazy to put a transpiler in here just yet. If something new and fancy doesn't work, try making it old and busted.
