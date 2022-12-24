import { SceneCtx } from "../SceneCtx";
import * as THREE from "three";
import { ensure } from "./ensure";

export const ensureAmbientLight = (scene: SceneCtx["scene"], recreate = false) => {
  return ensure<THREE.AmbientLight>(
    "ambient-light",
    (_THREE) => {
      const instance = new THREE.AmbientLight(0x999999, 1);
      // instance.castShadow = true;
      instance.position.set(10, 10, 10);
      return instance;
    },
    scene,
    recreate
  );
};
