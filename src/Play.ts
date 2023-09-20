import Phaser from "phaser";
import Player from "./entities/Player";

type playerZones = {
  start: Phaser.Types.Tilemaps.TiledObject | undefined;
  end: Phaser.Types.Tilemaps.TiledObject | undefined;
};

class Play extends Phaser.Scene {
  private player: Player | undefined;

  constructor(public config: any) {
    super("PlayScene");
    this.player = undefined;
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones!);
    this.player = this.createPlayer(playerZones);
    this.player.addCollider(layers.collidables);
    this.setupFolllowupCameraOn(this.player);
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
    const playerZones = map.getObjectLayer("player_zones");

    return { decorations, platforms, collidables, playerZones };
  }
  createPlayer({ start, end }: playerZones) {
    const x = start!.x || 200;
    const y = start!.y || 200;
    return new Player(this, x, y);
  }

  setupFolllowupCameraOn(player: Player) {
    const { height, width, mapOffset } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(1.5);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(playerZonesLayer: Phaser.Tilemaps.ObjectLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find((zone) => zone.name === "start_zone"),
      end: playerZones.find((zone) => zone.name === "end_zone"),
    };
  }
}

export default Play;
