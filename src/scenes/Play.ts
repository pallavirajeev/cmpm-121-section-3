import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  starfield?: Phaser.GameObjects.TileSprite;
  spinner?: Phaser.GameObjects.Shape;

  rotationSpeed = Phaser.Math.PI2 / 1000; // radians per millisecond

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");

    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);

    this.spinner = this.add.rectangle(100, 400, 50, 50, 0x00d3d8);

    //this.enemy = this.add.rectangle(100,100, 20,20, "red");
  }

  update(_timeMs: number, delta: number) {
    this.starfield!.tilePositionX -= 4;

    if (this.left!.isDown) {
      this.spinner!.x -= 3;
    }
    if (this.right!.isDown) {
      this.spinner!.x += 3;
    }
    if (this.fire!.isDown) {
      this.left!.enabled = false;
      this.right!.enabled = false;
      this.tweens.add({
        targets: this.spinner,
        y: delta * this.rotationSpeed,
        duration: 2000,
        onComplete: () => {
          this.spinner!.y = 400;
          this.left!.enabled = true;
          this.right!.enabled = true;
        },
      });
    }
  }
}
