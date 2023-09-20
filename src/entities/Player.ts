import Phaser from "phaser";
import initAnimations from "./playerAnims";

class Player extends Phaser.Physics.Arcade.Sprite {
  public speed = 220;
  public jumpCount = 0;
  public consecutiveJump = 1;
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

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    this.handlePlayerMovement();
    this.handlePlayerAnim(this.body!.onFloor());
    this.handleHitboxForAnimation();
  }

  handleHitboxForAnimation() {
    const currentAnimation = this.anims.getName();
    const isJumping =
      currentAnimation === "jump" || currentAnimation === "jumpEnd";

    if (currentAnimation === "run" && this.body!.velocity.x < 0) {
      this.setOffset(22, 15);
    } else if (currentAnimation === "run" && this.body!.velocity.x > 0) {
      this.setOffset(40, 15);
    } else if (isJumping && this.flipX) {
      this.setOffset(30, 15);
    } else if (isJumping && !this.flipX) {
      this.setOffset(15, 15);
    } else if (currentAnimation === "idle") {
      this.setOffset(22, 15);
    }
  }

  handlePlayerAnim(onFloor: boolean) {
    if (onFloor) {
      this.body!.velocity.x !== 0
        ? this.play("run", true)
        : this.play("idle", true);
    } else if (this.body!.velocity.y > 0) {
      this.play("jumpEnd");
    } else {
      this.play("jump", true);
    }
  }

  handlePlayerMovement() {
    const { left, right, space, up } = this
      .cursors as Phaser.Types.Input.Keyboard.CursorKeys;

    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    const onFloor = this.body!.onFloor();

    if (left.isDown) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      this?.setVelocityX(0);
    }

    if (
      (isSpaceJustDown || isUpJustDown) &&
      (onFloor || this.jumpCount < this.consecutiveJump)
    ) {
      this.setVelocityY(-this.speed * 1.3);
      this.jumpCount++;
    }

    if (onFloor) {
      this.jumpCount = 0;
    }
  }

  addCollider(
    collider: Phaser.Types.Physics.Arcade.ArcadeColliderType,
    callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback
  ) {
    this.scene.physics.add.collider(this, collider, callback, undefined, this);
    return this;
  }
}

export default Player;
