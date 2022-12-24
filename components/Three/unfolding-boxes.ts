import { SceneCtx } from "./SceneCtx";
import * as THREE from "three";
import {
  ensure,
  updateCamera,
  updateCameraSide,
  updateCameraTop,
  ensureSceneHelper,
  ensureSpotLight,
  ensureShadowCaster,
  ensureAmbientLight,
  degToRad,
} from "./util";

// ------------------------------------------------------------

type MeshMaterial =
  | THREE.MeshStandardMaterial
  | THREE.MeshBasicMaterial
  | THREE.MeshLambertMaterial;

class UnfoldingCube extends THREE.Group {
  constructor() {
    super();
    this.group = new THREE.Group();
    this.add(this.group);
    this.faces = this.init();
    this.unfold(0);
  }

  private group: THREE.Group;

  private faces: {
    left: THREE.Mesh;
    right: THREE.Mesh;
    top: THREE.Mesh;
    bottom: THREE.Mesh;
    front: THREE.Mesh;
    backGroup: THREE.Group;
    back: THREE.Mesh;
  };

  private init() {
    const { group } = this;

    const geometry = new THREE.BoxGeometry(1, 0.01, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.75,
      metalness: 0.25,
    });

    const bottom = new THREE.Mesh(geometry, material);

    const left = new THREE.Mesh(geometry.clone(), material);
    left.geometry.translate(0, 0, -0.5);
    left.position.z = -0.5;

    const right = new THREE.Mesh(geometry.clone(), material);
    right.geometry.translate(0, 0, -0.5);
    right.position.z = 0.5;

    const front = new THREE.Mesh(geometry.clone(), material);
    front.geometry.translate(0, 0, -0.5);
    front.position.x = -0.5;

    const backGroup = new THREE.Group();
    backGroup.position.x = 0.5;

    const back = new THREE.Mesh(geometry.clone(), material);
    back.position.x = 0.5;

    const top = new THREE.Mesh(geometry.clone(), material);
    top.position.x = 1;
    top.geometry.translate(0.5, 0, 0);

    backGroup.add(back);
    backGroup.add(top);

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

    return {
      front,
      backGroup,
      back,
      left,
      right,
      top,
      bottom,
    };
  }

  unfold = (f = 1) => {
    const { group } = this;
    const distance = degToRad(180);
    const leftStart = degToRad(-90);
    const rightStart = degToRad(-90);
    const frontStart = degToRad(-180);
    const backGroupStart = degToRad(-90);
    const topStart = degToRad(-90);

    const {
      left,
      right,
      top,
      // bottom,
      front,
      // back,
      backGroup,
    } = this.faces;

    left.rotation.set(leftStart + distance * f, 0, 0);
    right.rotation.set(rightStart - distance * f, 0, 0);
    front.rotation.set(degToRad(90), frontStart - distance * f, degToRad(90));
    backGroup.rotation.set(0, 0, backGroupStart + distance * f);
    top.rotation.set(0, 0, topStart + distance * f);

    group.position.set(0, 0, 0);
    group.translateY(1 - f - 0.5);
  };

  setColor = (color: number | string) => {
    const { left, right, top, bottom, front, back } = this.faces;

    const set = (m: THREE.Mesh["material"]) => {
      if (Array.isArray(m)) {
        m.forEach(set);
      } else {
        (m as MeshMaterial).color.set(color);
      }
    };

    set(left.material);
    set(right.material);
    set(top.material);
    set(bottom.material);
    set(front.material);
    set(back.material);
  };
}

let fraction = 1;
// let unfold = (f = fraction) => { }
const ensureOtherCube = (
  scene: SceneCtx["scene"],
  recreate = false,
  name = "other-cube"
) => {
  return ensure(
    name,
    (_THREE) => {
      return new UnfoldingCube();
    },
    scene,
    recreate
  );
};

// ------------------------------------------------------------

// export const onResize = (scene: SceneCtx['scene'], recreate = false) => {
//   updateCamera(scene);
//   updateCameraSide(scene);
//   updateCameraTop(scene);
// }

const randBool = () => Math.random() > 0.5;

let cubes: UnfoldingCube[][][];
export const onMount = ({ scene, clock }: SceneCtx) => {
  // @ts-ignore
  window.__scene = scene;
  // @ts-ignore
  window.__clock = clock;

  updateCamera(scene);

  // ensureSceneHelper(scene, true);
  ensureShadowCaster(scene, true);
  ensureAmbientLight(scene, true);
  ensureSpotLight(scene, true);

  const dist = 4;
  const w = 3;
  const h = 3;
  const d = 3;
  // const cube = ensureOtherCube(scene, true);
  cubes = new Array(w).fill(1).map((_, a) =>
    new Array(h).fill(1).map((__, b) =>
      new Array(d).fill(1).map((___, c) => {
        const cube = ensureOtherCube(
          scene,
          true,
          `clone-${a}-${b}-${c}`
        ) as UnfoldingCube;
        cube.position.x = w * -2 + a * dist + dist * 0.5;
        cube.position.y = h * -2 + b * dist + dist * 0.5;
        cube.position.z = d * -2 + c * dist + dist * 0.5;
        if (randBool()) cube.rotateX(degToRad(randBool() ? -90 : 90));
        if (randBool()) cube.rotateY(degToRad(randBool() ? -90 : 90));
        if (randBool()) cube.rotateZ(degToRad(randBool() ? -90 : 90));
        return cube;
      })
    )
  );
};

let frameCounter = 0;
let prevNow = 0;
let prevColor: any;
export const onRender = (ctx: SceneCtx) => {
  const { scene, clock, theme } = ctx;
  if (!cubes?.length) return;

  // @ts-ignore
  if (!!window?.__recreateScene) {
    onMount(ctx);
    // @ts-ignore
    window.__recreateScene = false;
  }
  let changeColor = false;
  const themeColor = theme?.colors[theme?.primaryColor][2];
  if (!prevColor || prevColor !== themeColor) {
    prevColor = themeColor;
    changeColor = true;
  }

  updateCameraSide(scene);
  updateCameraTop(scene);

  // const deltaTime = clock.getDelta()
  const now = clock.elapsedTime;
  const deltaTime = now - prevNow;

  const spotLight = ensureSpotLight(scene) as THREE.SpotLight;
  spotLight.position.y = 120;
  spotLight.position.x = Math.cos(now * 0.1) * 5 + 5;
  spotLight.position.z = Math.sin(now * 0.1) * 5 + 2.5;
  spotLight.lookAt(scene.position);

  (
    scene.getObjectByName("spot-light-helper") as
    | THREE.SpotLightHelper
    | undefined
  )?.update();

  const fraction = 1 - ((now * 0.1) % 1);
  cubes.forEach((layer, a) => {
    layer.forEach((row, b) => {
      row.forEach((cube, c) => {
        if (changeColor) cube.setColor(prevColor);
        cube.unfold(fraction);
      });
    });
  });

  if (frameCounter >= 60) {
    frameCounter = 0;
    // debugger
  }
  frameCounter += 1;
  prevNow = now;
};
