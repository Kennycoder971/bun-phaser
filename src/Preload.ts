import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.tilemapTiledJSON("map", "/level1.tmj");
    this.load.image("tiles1", "/assets/Assets/Tiles.png");
  }

  create() {
    this.scene.start("PlayScene");
  }
}

export default Preload;
