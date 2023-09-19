import Phaser from "phaser";

class Play extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const map = this.createMap();
    this.createLayers(map);
  }

  createMap() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("Tiles", "tiles1");
    return map;
  }
  createLayers(map: Phaser.Tilemaps.Tilemap) {
    const tileset = map.getTileset("Tiles");
    if (tileset) {
      const layer = map.createLayer("platforms", tileset, 0, 0);
      const layer2 = map.createLayer("decorations", tileset, 0, 0);
    }
  }
}

export default Play;
