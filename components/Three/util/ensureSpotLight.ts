import { SceneCtx } from "../SceneCtx";
import * as THREE from "three";
import { ensure } from "./ensure";

export const ensureSpotLight = (scene: SceneCtx["scene"], recreate = false) => {
  return ensure<THREE.SpotLight>(
    "spot-light",
    (_THREE) => {
      const instance = new THREE.SpotLight(0xffffff, 0.3);
      // let helper = scene.getObjectByName('spot-light-helper') as THREE.SpotLightHelper | undefined
      // if (helper) scene.remove(helper)
      // helper = new THREE.SpotLightHelper(instance, 0x0000aa);
      // helper.name = 'spot-light-helper'
      // scene.add(helper)
      // helper.update()
      instance.castShadow = true;
      instance.shadow.mapSize.width = 2048 * 2;
      instance.shadow.mapSize.height = 2048 * 2;
      instance.shadow.camera.near = 1;
      instance.shadow.camera.far = 500;
      instance.shadow.focus = 0.5;
      instance.lookAt(scene.position);
      return instance;
    },
    scene,
    recreate
  );
};
