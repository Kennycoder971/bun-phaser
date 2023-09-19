import Phaser from "phaser";
import initAnimations from "./playerAnims";
class Player extends Phaser.Physics.Arcade.Sprite {
  public speed = 200;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setSize(20, 48);
    this.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard?.createCursorKeys();

    initAnimations(this.scene.anims);
  }

  createAnims() {}

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    const { left, right } = this
      .cursors as Phaser.Types.Input.Keyboard.CursorKeys;

    if (left.isDown) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      this?.setVelocityX(0);
    }

    this.body?.velocity.x !== 0
      ? this.play("run", true)
      : this.play("idle", true);

    this.updateHitboxForAnimation();
  }

  updateHitboxForAnimation() {
    const currentAnimation = this.anims.getName();

    if (currentAnimation === "run" && this.body!.velocity.x < 0) {
      this.setOffset(22, 15);
    } else if (currentAnimation === "run") {
      this.setOffset(40, 15);
    } else {
      this.setOffset(22, 15);
    }
  }
}

export default Player;
