import "phaser";

import PlayScene from "./Play";
import Preload from "./Preload";

const MAP_WIDTH = 1600;
const WIDTH = document.body.offsetWidth;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: 600,
};

const Scenes = [Preload, PlayScene];

const createScene = (
  Scene: new (config: Phaser.Types.Scenes.SettingsConfig) => Phaser.Scene
) => new Scene(SHARED_CONFIG);

const initScenes = () => Scenes.map(createScene);

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 500 },
    },
  },
  scene: initScenes(),
};

const game = new Phaser.Game(gameConfig);
