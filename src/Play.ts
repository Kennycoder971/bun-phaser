import Phaser from "phaser";
import Player from "./entities/Player";

class Play extends Phaser.Scene {
  private player: Player | undefined;

  constructor() {
    super("PlayScene");
    this.player = undefined;
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    this.player = this.createPlayer();
    this.physics.add.collider(this.player, layers.collidables);
  }

  createMap() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("Tiles", "tiles1");
    return map;
  }
  createLayers(map: Phaser.Tilemaps.Tilemap) {
    const tileset = map.getTileset("Tiles")!;
    const platforms = map.createLayer("platforms", tileset, 0, 0);
    const decorations = map.createLayer("decorations", tileset, 0, 0);
    const collidables = map.createLayer("collidables", tileset, 0, 0)!;
    collidables.setCollision([14], true);
    return { decorations, platforms, collidables };
  }
  createPlayer() {
    return new Player(this, 100, 200);
  }

  update(time: number, delta: number): void {}
}

export default Play;
