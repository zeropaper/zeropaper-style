import { SceneCtx } from "../SceneCtx";
import * as THREE from "three";

export function updateCamera(scene: SceneCtx["scene"]) {
  const camera = scene.getObjectByName("camera");

  if (!camera)
    return;
  camera.position.x = camera.position.x || -15;
  camera.position.y = camera.position.y || 15;
  camera.position.z = camera.position.z || -15;
  camera.lookAt(scene.position);
  // camera.updateMatrix()
  return camera;
}
export function updateCameraSide(scene: SceneCtx["scene"]) {
  const camera = scene.getObjectByName("camera-side") as
    | THREE.OrthographicCamera
    | undefined;

  if (!camera) return;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 20;
  camera.zoom = camera.position.z * 0.75;
  camera.near = 0.001;
  camera.far = camera.position.z * 2;
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  return camera;
}
export function updateCameraTop(scene: SceneCtx["scene"]) {
  const camera = scene.getObjectByName("camera-top") as
    | THREE.OrthographicCamera
    | undefined;

  if (!camera) return;
  camera.position.x = 0;
  camera.position.y = 20;
  camera.position.z = 0;
  camera.zoom = camera.position.y * 0.75;
  camera.near = 0.001;
  camera.far = camera.position.y * 2;
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  return camera;
}
