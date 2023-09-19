export default (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: "idle",
    frames: anims.generateFrameNumbers("idle", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "run",
    frames: anims.generateFrameNumbers("run", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
};