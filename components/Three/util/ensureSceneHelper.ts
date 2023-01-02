import { SceneCtx } from "../SceneCtx";
import * as THREE from "three";
import { ensure } from "./ensure";

export const ensureSceneHelper = (
  scene: SceneCtx["scene"],
  recreate = false
) => {
  return ensure<THREE.Group>(
    "scene-helper",
    (_THREE) => {
      const group = new THREE.Group();
      const grid = new THREE.GridHelper(24, 12);
      group.add(grid);
      const gridX = grid.clone();
      gridX.rotateX(Math.PI / 2);
      group.add(gridX);
      const gridZ = grid.clone();
      gridZ.rotateZ(Math.PI / 2);
      group.add(gridZ);
      group.add(new THREE.AxesHelper(3));
      return group;
    },
    scene,
    recreate
  );
};
