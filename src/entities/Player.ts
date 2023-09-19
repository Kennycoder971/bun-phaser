import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  public speed = 200;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setMass(1);

    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.play("idle");
  }
}

export default Player;
