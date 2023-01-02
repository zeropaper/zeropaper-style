import { SceneCtx } from "../SceneCtx";
import * as THREE from "three";
import { ensure } from "./ensure";
import { degToRad } from "./degToRad";

export const ensureShadowCaster = (
  scene: SceneCtx["scene"],
  recreate = false
) => {
  return ensure<THREE.Mesh>(
    "shadow-caster",
    (_THREE) => {
      const geometry = new THREE.PlaneGeometry(500, 500, 10, 10);
      const material = new THREE.ShadowMaterial();
      material.opacity = 0.5;

      const instance = new THREE.Mesh(geometry, material);
      instance.receiveShadow = true;
      instance.position.y = -12;
      instance.rotation.x = degToRad(-90);
      return instance;
    },
    scene,
    recreate
  );
};
