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
import { PointerHandler } from "./Renderer";
import { Mesh, NumberKeyframeTrack } from "three";

// ------------------------------------------------------------

const ensureBoxes = (scene: SceneCtx["scene"], recreate = false) => {
  for (let i = 0; i < 100; i++) {
    ensure(
      `box-${i}`,
      (_THREE) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 1,
          // wireframe: true
        });
        const instance = new THREE.Mesh(geometry, material);
        instance.castShadow = false;
        instance.receiveShadow = true;
        instance.position.x = Math.random() * 10 - 5;
        instance.position.y = Math.random() * 10 - 5;
        instance.position.z = Math.random() * 10 - 5;
        return instance;
      },
      scene,
      recreate
    );
  }
};

class Box extends THREE.Group {
  constructor() {
    super();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 1,
      // wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    this.#mesh = mesh;

    this.#mixer = new THREE.AnimationMixer(mesh);
    const moveKF = new THREE.VectorKeyframeTrack(
      ".position",
      [0, 0.5],
      [0, 0, 0, 2, 0, 0],
      THREE.InterpolateSmooth
    );
    const moveClip = new THREE.AnimationClip("moveIn", 0.5, [moveKF]);
    const move = this.#mixer.clipAction(moveClip);
    move.loop = THREE.LoopOnce;
    move.repetitions = 1;
    move.clampWhenFinished = true;
    this.#move = move;

    this.add(mesh);
  }

  #mesh: THREE.Mesh;
  #mixer: THREE.AnimationMixer;
  #move: THREE.AnimationAction;
  #state: "idle" | "moving" = "idle";
  #isIn: boolean = false;
  #animationTimeout: string | number | null = null;

  get isIn() {
    return this.#isIn;
  }

  update(delta: number) {
    this.#mixer.update(delta);
  }

  turnOn() {
    if (this.#isIn || this.#state === "moving") return;
    this.#state = "moving";

    const duration = this.#move.getClip().duration;
    this.#move.paused = false;
    this.#move.timeScale = 1;
    this.#animationTimeout = setTimeout(() => {
      this.#isIn = true;
      this.#state = "idle";
      this.#move.paused = true;
    }, duration * 1000) as any;

    this.#move.play();
  }

  turnOff() {
    if (!this.#isIn || this.#state === "moving") return;
    this.#state = "moving";

    const duration = this.#move.getClip().duration;
    this.#move.paused = false;
    this.#move.timeScale = -1;
    this.#animationTimeout = setTimeout(() => {
      this.#isIn = false;
      this.#state = "idle";
      this.#move.paused = true;
    }, duration * 1000) as any;

    this.#move.play();
  }

  dispose() {
    this.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }
}

const ensureBox = (scene: SceneCtx["scene"], name: string, recreate = false) =>
  ensure<Box>(name, (_THREE) => new Box(), scene, recreate);

// ------------------------------------------------------------

let mixer: THREE.AnimationMixer | null = null;
let action: THREE.AnimationAction | null = null;

const cells: THREE.Object3D[][] = [];
export const onMount = ({ scene, clock }: SceneCtx) => {
  // @ts-ignore
  window.__scene = scene;
  // @ts-ignore
  window.__clock = clock;

  updateCamera(scene);

  const box = ensureBox(scene, "box", true);
  mixer = new THREE.AnimationMixer(box);
  const kFTrack = new THREE.VectorKeyframeTrack(
    ".position",
    [0, 1],
    [0, 0, 0, 2, 0, 0]
  );
  const moveX = new THREE.AnimationClip("moveX", 5, [kFTrack]);
  action = mixer.clipAction(moveX);
  action.repetitions = 1;

  // ensureSceneHelper(scene, true);
  // ensureShadowCaster(scene, true);
  ensureAmbientLight(scene, true);
  ensureSpotLight(scene, true);
};

let frameCounter = 0;
let prevNow = 0;
let prevColor: any;
export const onRender = (ctx: SceneCtx) => {
  const { scene, clock, theme } = ctx;

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

  const now = clock.elapsedTime;
  const delta = now - prevNow;

  const box = ensureBox(scene, "box");
  box.update(delta);

  const spotLight = ensureSpotLight(scene);
  spotLight.position.x = 10;
  spotLight.position.y = 30;
  spotLight.position.z = 10;
  spotLight.lookAt(scene.position);

  if (frameCounter >= 60) {
    frameCounter = 0;
    // debugger
  }
  frameCounter += 1;
  prevNow = now;
};

export const onPointerEnter: PointerHandler<"pointerenter"> = ({ object }) => {
  if (!(object instanceof Mesh)) return;
  object.userData.currentHex = object.material.color.getHex();
  object.material.color.set(0xaaaa00);
};

export const onPointerLeave: PointerHandler<"pointerleave"> = ({ object }) => {
  if (!(object instanceof Mesh)) return;
  object.material.color.set(object.userData.currentHex);
};

export const onClick: PointerHandler<"click"> = ({ object }) => {
  if (!(object?.parent instanceof Box)) return;
  console.info("click", object);
  const box = object.parent;
  if (box.isIn) {
    box.turnOff();
  } else {
    box.turnOn();
  }
};
