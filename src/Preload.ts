import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.tilemapTiledJSON("map", "/level1.tmj");
    this.load.image("tiles1", "/assets/Assets/Tiles.png");
    this.load.spritesheet("idle", "/assets/Character/Idle/Idle-Sheet.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("run", "/assets/Character/Run/Run-Sheet.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
  }

  create() {
    this.scene.start("PlayScene");
  }
}

export default Preload;
