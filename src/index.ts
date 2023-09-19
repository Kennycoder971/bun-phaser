import "phaser";

import PlayScene from "./Play";
import Preload from "./Preload";

const SHARED_CONFIG = {
  width: 1280,
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
