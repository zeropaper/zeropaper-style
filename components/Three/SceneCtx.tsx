import { MantineTheme } from "@mantine/core";
import { createContext } from "react";
import { Scene, Clock } from "three";

export type SceneCtx = {
  scene: Scene;
  clock: Clock;
  theme?: MantineTheme;
};

const defaultScene: SceneCtx = {
  scene: new Scene(),
  clock: new Clock(),
};

export const SceneContext = createContext(defaultScene);
