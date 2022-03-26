import { SceneCtx } from './SceneCtx';
import * as THREE from 'three';

function updateCamera(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera');

  if (!camera) return;
  camera.position.x = camera.position.x || -2;
  camera.position.y = camera.position.y || 4;
  camera.position.z = camera.position.z || 2;
  camera.lookAt(scene.position);
  // camera.updateMatrix()
  return camera
}

function updateCameraSide(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera-side') as THREE.OrthographicCamera | undefined;

  if (!camera) return;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 20;
  camera.zoom = camera.position.z * 0.75;
  camera.near = 0.001
  camera.far = camera.position.z * 2
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  return camera
}

function updateCameraTop(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera-top') as THREE.OrthographicCamera | undefined;

  if (!camera) return;
  camera.position.x = 0;
  camera.position.y = 20;
  camera.position.z = 0;
  camera.zoom = camera.position.y * 0.75;
  camera.near = 0.001
  camera.far = camera.position.y * 2
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  return camera
}

// ------------------------------------------------------------

function ensure(name: string, creator: (_THREE: typeof THREE) => THREE.Object3D, object: THREE.Object3D, recreate = false) {
  const found = object.getObjectByName(name);
  if (found) {
    if (!recreate) return found;
    object.remove(found);
  }

  const created = creator(THREE)
  created.name = name;
  object.add(created)
  return created
}

// ------------------------------------------------------------

const degToRad = (deg: number) => deg * Math.PI / 180

let fraction = 1;
let unfold = (f = fraction) => { }
const ensureOtherCube = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('other-cube', (_THREE) => {
    const group = new THREE.Group();

    const distance = degToRad(180)

    const geometry = new THREE.BoxGeometry(1, 0.01, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.75,
      metalness: 0.25
    });

    const bottom = new THREE.Mesh(geometry, material);

    const leftStart = degToRad(-90)
    const left = new THREE.Mesh(geometry.clone(), material);
    left.geometry.translate(0, 0, -0.5);
    left.position.z = -0.5;

    const rightStart = degToRad(-90)
    const right = new THREE.Mesh(geometry.clone(), material);
    right.geometry.translate(0, 0, -0.5);
    right.position.z = 0.5;

    const frontStart = degToRad(-180)
    const front = new THREE.Mesh(geometry.clone(), material);
    front.geometry.translate(0, 0, -0.5);
    front.position.x = -0.5;

    const backGroupStart = degToRad(-90)
    const backGroup = new THREE.Group();
    backGroup.position.x = 0.5;

    const back = new THREE.Mesh(geometry.clone(), material);
    back.position.x = 0.5;

    const topStart = degToRad(-90)
    const top = new THREE.Mesh(geometry.clone(), material);
    top.position.x = 1;
    top.geometry.translate(0.5, 0, 0);

    backGroup.add(back)
    backGroup.add(top)

    group.add(bottom);
    group.add(left);
    group.add(right);
    group.add(front);
    group.add(backGroup);

    top.castShadow = true;
    bottom.castShadow = true;
    left.castShadow = true;
    right.castShadow = true;
    front.castShadow = true;
    back.castShadow = true;
    top.receiveShadow = true;
    bottom.receiveShadow = true;
    left.receiveShadow = true;
    right.receiveShadow = true;
    front.receiveShadow = true;
    back.receiveShadow = true;

    group.translateY(1 - fraction);

    unfold = (f = fraction) => {
      left.rotation.set(leftStart + (distance * f), 0, 0)
      right.rotation.set(rightStart - (distance * f), 0, 0)
      front.rotation.set(degToRad(90), frontStart - (distance * f), degToRad(90))
      backGroup.rotation.set(0, 0, backGroupStart + (distance * f))
      top.rotation.set(0, 0, topStart + (distance * f))

      group.position.set(0, 0, 0)
      group.translateY((1 - f) - 0.5);
    }
    unfold(0)
    return group;
  }, scene, recreate);
}

// ------------------------------------------------------------

const ensureSceneHelper = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('scene-helper', (_THREE) => {
    const group = new THREE.Group()
    const grid = new THREE.GridHelper(5, 10);
    group.add(grid)
    const gridX = grid.clone()
    gridX.rotateX(Math.PI / 2)
    group.add(gridX)
    const gridZ = grid.clone()
    gridZ.rotateZ(Math.PI / 2)
    group.add(gridZ)
    group.add(new THREE.AxesHelper(3))
    return group;
  }, scene, recreate)
}

const ensureSpotLight = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('spot-light', (_THREE) => {
    const instance = new THREE.SpotLight(0xffffff, 0.7);
    // let helper = scene.getObjectByName('spot-light-helper') as THREE.SpotLightHelper | undefined
    // if (helper) scene.remove(helper)
    // helper = new THREE.SpotLightHelper(instance, 0x0000aa);
    // helper.name = 'spot-light-helper'
    // scene.add(helper)
    // helper.update()
    instance.castShadow = true;
    instance.shadow.mapSize.width = 1024;
    instance.shadow.mapSize.height = 1024;
    instance.shadow.camera.near = 1;
    instance.shadow.camera.far = 50;
    instance.shadow.focus = 0.1;
    instance.lookAt(scene.position);
    return instance
  }, scene, recreate);
}

const ensureShadowCaster = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('shadow-caster', (_THREE) => {
    const geometry = new THREE.PlaneGeometry(500, 500, 10, 10);
    const material = new THREE.ShadowMaterial()
    material.opacity = 0.5

    const instance = new THREE.Mesh(geometry, material)
    instance.receiveShadow = true;
    instance.position.y = -2
    instance.rotation.x = degToRad(-90)
    return instance
  }, scene, recreate);
}

const ensureAmbientLight = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('ambient-light', (_THREE) => {
    const instance = new THREE.AmbientLight(0x999999, 1);
    // instance.castShadow = true;
    instance.position.set(10, 10, 10);
    return instance
  }, scene, recreate);
}

// ------------------------------------------------------------

// export const onResize = (scene: SceneCtx['scene'], recreate = false) => {
//   updateCamera(scene);
//   updateCameraSide(scene);
//   updateCameraTop(scene);
// }

export const onMount = ({ scene, clock }: SceneCtx) => {
  // @ts-ignore
  window.__scene = scene
  // @ts-ignore
  window.__clock = clock

  updateCamera(scene);

  // ensureSceneHelper(scene, true);
  ensureShadowCaster(scene, true);
  ensureAmbientLight(scene, true);
  ensureSpotLight(scene, true);

  ensureOtherCube(scene, true);
};

// let frameCounter = 0;
let prevNow = 0
export const onRender = (ctx: SceneCtx) => {
  const { scene, clock, world } = ctx;
  // @ts-ignore
  if (!!window?.__recreateScene) {
    onMount(ctx);
    // @ts-ignore
    window.__recreateScene = false;
  }

  updateCameraSide(scene);
  updateCameraTop(scene);

  // const deltaTime = clock.getDelta()
  const now = clock.elapsedTime
  const deltaTime = now - prevNow

  const spotLight = ensureSpotLight(scene) as THREE.SpotLight;
  spotLight.position.y = 20
  spotLight.position.x = (Math.cos(now * 0.1) * 5) + 5;
  spotLight.position.z = (Math.sin(now * 0.1) * 5) + 2.5;
  spotLight.lookAt(scene.position);

  (scene.getObjectByName('spot-light-helper') as THREE.SpotLightHelper | undefined)?.update();

  unfold(1 - ((now * 0.1) % 1))

  // if (frameCounter >= 60) {
  //   frameCounter = 0;
  //   // debugger
  // }
  // frameCounter += 1;
  prevNow = now
};