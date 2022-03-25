import { SceneCtx } from './SceneCtx';
import * as THREE from 'three';

const {
  DirectionalLight,
  DirectionalLightHelper,
  Group,
  GridHelper,
  AxesHelper,
  TorusKnotGeometry,
  // MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  PlaneGeometry,
} = THREE

function updateCamera(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera');

  if (!camera) return;
  camera.position.x = 100;
  camera.position.y = 50;
  camera.position.z = 100;
  // const now = Date.now() * 0.001;
  // camera.position.x = Math.sin(now) * 100;
  // camera.position.z = Math.cos(now) * 100;
  // camera.position.y = (Math.cos(now) * 10) + 25;
  camera.lookAt(scene.position);
  // camera.updateMatrix()
  return camera
}

function updateCameraSide(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera-side') as THREE.OrthographicCamera | undefined;

  if (!camera) return;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;
  camera.near = 0.1
  camera.far = 100
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  return camera
}

function updateCameraTop(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera-top') as THREE.OrthographicCamera | undefined;

  if (!camera) return;
  camera.position.x = 0;
  camera.position.y = 50;
  camera.position.z = 0;
  camera.near = 0.1
  camera.far = 100
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  return camera
}

// ------------------------------------------------------------

function ensure(name: string, creator: (lib: typeof THREE) => THREE.Object3D, object: THREE.Object3D, recreate = false) {
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

// function clear(name: string, object: THREE.Object3D) {
//   const found = object.getObjectByName(name);
//   if (!found) return;
//   object.remove(found);
// }

// ------------------------------------------------------------

const ensureSceneHelper = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('scene-helper', (lib) => {
    const group = new lib.Group()
    const grid = new lib.GridHelper(100, 10);
    group.add(grid)
    const gridX = grid.clone()
    gridX.rotateX(Math.PI / 2)
    group.add(gridX)
    const gridZ = grid.clone()
    gridZ.rotateZ(Math.PI / 2)
    group.add(gridZ)
    group.add(new lib.AxesHelper(10))
    return group;
  }, scene, recreate)
}

const ensureSpotLight = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('spot-light', (lib) => {
    const instance = new lib.SpotLight(0xffffff, 1);
    instance.castShadow = true;
    instance.shadow.mapSize.width = 512 * 4;
    instance.shadow.mapSize.height = 512 * 4;
    instance.shadow.camera.near = 0.5;
    instance.shadow.camera.far = 2000;
    instance.shadow.focus = 0.1;
    instance.lookAt(scene.position);
    return instance
  }, scene, recreate);
}

const ensureTorus = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('torus', (lib) => {
    const geometry = new lib.TorusKnotGeometry(10, 3, 100, 16);
    const material = new lib.MeshStandardMaterial({ color: 0xffffff, wireframe: false });
    const instance = new lib.Mesh(geometry, material)
    instance.castShadow = true; //default is false
    instance.receiveShadow = true; //default
    return instance
  }, scene, recreate);
}

const ensureShadowCaster = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('shadow-caster', (lib) => {
    const geometry = new lib.PlaneGeometry(500, 500, 10, 10);
    const material = new lib.ShadowMaterial()
    material.opacity = 0.5

    // const material = new lib.MeshStandardMaterial({ color: 0x666666, wireframe: false });

    const instance = new lib.Mesh(geometry, material)
    instance.receiveShadow = true;
    instance.position.y = -20
    instance.rotation.x = -90 * (Math.PI / 180)
    return instance
  }, scene, recreate);
}

const ensureAmbientLight = (scene: SceneCtx['scene'], recreate = false) => {
  return ensure('ambient-light', (lib) => {
    const instance = new lib.AmbientLight(0x111111, 1);
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
  console.info('Three: onMount')
  // @ts-ignore
  window.__scene = scene
  // @ts-ignore
  window.__clock = clock

  ensureSceneHelper(scene, true);
  ensureShadowCaster(scene, true);

  ensureAmbientLight(scene, true);
};

let frameCounter = 0;
let shift = 0
export const onRender = ({ scene, clock }: SceneCtx) => {
  // @ts-ignore
  if (!!window?.__recreateScene) {
    onMount({ scene, clock });
    // @ts-ignore
    window.__recreateScene = false;
  }

  const now = clock.elapsedTime

  const camera = updateCamera(scene);
  const side = updateCameraSide(scene);
  const top = updateCameraTop(scene);
  const helpers = ensureSceneHelper(scene);
  const torus = ensureTorus(scene);

  torus.rotation.y = now;

  helpers.position.x = 0
  helpers.position.y = 0
  helpers.position.z = 0

  // helpers.position.x = shift
  // helpers.position.y = shift
  // helpers.position.z = shift
  // if (Math.random() > 0.8) {
  //   shift = shift ? 0 : Math.random() * 10
  // }
  // helpers.visible = Math.random() > 0.9

  if (top) {
    top.lookAt(torus.position);
  }
  if (side) {
    side.position.y = torus.position.y;
    side.lookAt(torus.position);
  }
  if (camera) {
    camera.lookAt(torus.position);
  }

  const spotLight = ensureSpotLight(scene);
  spotLight.position.x = -50;
  spotLight.position.y = 150;
  spotLight.position.z = 50;
  spotLight.lookAt(torus.position);

  if (frameCounter >= 60) {
    frameCounter = 0;
    console.info('Three render', now)
  }
  frameCounter += 1;
};