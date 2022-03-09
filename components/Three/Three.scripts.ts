import { SceneCtx } from './SceneCtx';
import {
  OrthographicCamera,
  DirectionalLight,
  DirectionalLightHelper,
  Group,
  GridHelper,
  AxesHelper,
  TorusKnotGeometry,
  // MeshBasicMaterial,
  MeshPhongMaterial,
  Mesh,
} from 'three';

function updateCamera(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera');

  if (!camera) return;
  const now = Date.now() * 0.001;
  camera.position.x = Math.sin(now) * 100;
  camera.position.z = Math.cos(now) * 100;
  camera.position.y = Math.cos(now) * 10;
  camera.lookAt(scene.position);
}

function updateCameraSide(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera-side') as OrthographicCamera | undefined;

  if (!camera) return;
  const now = Date.now() * 0.001;
  camera.position.x = 0;
  camera.position.y = 50;
  camera.position.z = 0;
  camera.near = 0.1
  camera.far = 100
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
}

function updateCameraTop(scene: SceneCtx['scene']) {
  const camera = scene.getObjectByName('camera-top') as OrthographicCamera | undefined;

  if (!camera) return;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;
  camera.near = 0.1
  camera.far = 100
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
}

const directinalLightName = 'directional-light';

function addDirectionalLight(scene: SceneCtx['scene']) {
  const instance = new DirectionalLight(0xffffff, 1);
  instance.name = directinalLightName;
  const instanceHelper = new DirectionalLightHelper(instance, 5);
  instanceHelper.name = `${directinalLightName}-helper`;
  scene.add(instance);
  scene.add(instanceHelper);
}

function updateDirectionalLight(scene: SceneCtx['scene']) {
  const instance = scene.getObjectByName(directinalLightName) as DirectionalLight | undefined;

  if (!instance) return;
  instance.position.x = 50;
  instance.position.y = 50;
  instance.position.z = 50;
  instance.lookAt(scene.position);

  const instanceHelper = scene.getObjectByName(`${directinalLightName}-helper`) as DirectionalLightHelper | undefined;
  if (!instanceHelper) return;
  instanceHelper.update();
}

const sceneObjectName = 'scene-object';
function makeSceneObject(scene: SceneCtx['scene']) {
  const geometry = new TorusKnotGeometry(10, 3, 100, 16);
  const material = new MeshPhongMaterial({ color: 0x666622, wireframe: false });
  const instance = new Mesh(geometry, material)
  instance.name = sceneObjectName;
  scene.add(instance);
}

const sceneHelperName = 'scene-helper'
const makeSceneHelper = () => {
  const group = new Group()
  group.name = sceneHelperName;
  const grid = new GridHelper(100, 10);
  group.add(grid)
  const gridX = grid.clone()
  gridX.rotateX(Math.PI / 2)
  group.add(gridX)
  const gridZ = grid.clone()
  gridZ.rotateZ(Math.PI / 2)
  group.add(gridZ)
  group.add(new AxesHelper(10))
  return group
}

// export const onResize = (scene: SceneCtx['scene']) => {
//   updateCamera(scene);
//   updateCameraSide(scene);
//   updateCameraTop(scene);
// }

export const onMount = ({ scene }: SceneCtx) => {
  makeSceneObject(scene)
  scene.add(makeSceneHelper())
  updateCamera(scene);
  updateCameraSide(scene);
  updateCameraTop(scene);
  addDirectionalLight(scene);
};

let frameCounter = 0;
export const onRender = ({ scene, clock }: SceneCtx) => {
  updateCamera(scene);
  updateCameraSide(scene);
  updateCameraTop(scene);

  updateDirectionalLight(scene);

  if (frameCounter >= 60) {
    frameCounter = 0;
    // console.info('Three render', clock.elapsedTime, clock.getElapsedTime())
  }
  frameCounter += 1;
};