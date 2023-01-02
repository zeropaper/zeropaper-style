import { SceneCtx } from "./SceneCtx";
import { MantineTheme } from "@mantine/core";
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
import { Mesh, NumberKeyframeTrack, Vector3 } from "three";

// ------------------------------------------------------------

let theme: MantineTheme | null = null;
function paperColor() {
  return (
    (theme?.colorScheme === "dark" ? theme?.colors.dark[7] : theme?.white) ||
    0xffffff
  );
}

function textColor() {
  return (
    (theme?.colorScheme === "dark" ? theme?.colors.dark[0] : theme?.black) ||
    0x000000
  );
}

function primaryColor() {
  return theme?.fn.primaryColor(theme?.colorScheme) || 0x0ff000;
}

function accentColor() {
  return theme?.colors.lime[5] || 0x0ff000;
}
// ------------------------------------------------------------

type CellType =
  | "cube"
  | "cylinder"
  | "cone"
  | "torus"
  | "torusKnot"
  | "default"
  | "sphere";

class Cell extends THREE.Group {
  constructor(size: number = 1, type: CellType = "default") {
    super();
    this.#size = size;
    this.#type = type;
    this.#init();
  }

  #type: CellType = "default";

  #state: "default" | "selected" | "hover" = "default";

  #size: number = 1;

  #hexagon: THREE.Mesh | null = null;

  #icon: THREE.Mesh | null = null;

  #mixer: THREE.AnimationMixer | null = null;
  #move: THREE.AnimationAction | null = null;
  #animation: "idle" | "moving" = "idle";
  #isIn: boolean = false;

  #init() {
    this.#makeHexagon();
    this.add(this.#hexagon!);

    this.#makeIcon();
    this.add(this.#icon!);
  }

  #makeHexagon() {
    const size = this.#size;

    // create a regular hexagon shape
    const shape = new THREE.Shape();
    const cx = 0;
    const cy = 0;
    const sin60 = Math.sin(degToRad(60));
    const sin30 = Math.sin(degToRad(30));
    shape.moveTo(cx, cy - size);
    shape.lineTo(cx + sin60 * size, cy - sin30 * size);
    shape.lineTo(cx + sin60 * size, cy + sin30 * size);
    shape.lineTo(cx, cy + size);
    shape.lineTo(cx - sin60 * size, cy + sin30 * size);
    shape.lineTo(cx - sin60 * size, cy - sin30 * size);

    const extrudeSettings = {
      steps: 1,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: -0.05,
      bevelSegments: 1,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({
      color: paperColor(),
      transparent: true,
      opacity: 1,
      // wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "cell";
    mesh.rotateX(degToRad(90));
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    this.#hexagon = mesh;
  }

  #makeIcon() {
    const size = this.#size;
    let geometry: THREE.BufferGeometry;
    switch (this.#type) {
      case "cube":
        geometry = new THREE.BoxGeometry(size * 0.5, size * 0.5, size * 0.5);
        break;
      case "cylinder":
        geometry = new THREE.CylinderGeometry(
          size * 0.5,
          size * 0.5,
          size * 0.5,
          16
        );
        break;
      case "cone":
        geometry = new THREE.ConeGeometry(size * 0.5, size * 0.5, 16);
        break;
      case "torus":
        geometry = new THREE.TorusGeometry(size * 0.35, size * 0.1, 8, 24);
        break;
      case "torusKnot":
        geometry = new THREE.TorusKnotGeometry(size * 0.25, size * 0.05, 64, 8);
        break;

      case "sphere":
      case "default":
      default:
        geometry = new THREE.SphereGeometry(size * 0.5, 16, 16);
    }
    const material = new THREE.MeshPhongMaterial({
      color: primaryColor(),
      // transparent: true,
      // opacity: 1,
      // wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "icon";
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.y = -0.5;
    this.#icon = mesh;

    const duration = 0.25;
    // toggle animation
    this.#mixer = new THREE.AnimationMixer(this.#icon!);
    const moveKF = new THREE.VectorKeyframeTrack(
      ".position",
      [0, duration],
      [0, -0.5, 0, 0, 1, 0],
      THREE.InterpolateSmooth
    );
    const scaleKF = new THREE.VectorKeyframeTrack(
      ".scale",
      [0, duration],
      [0.1, 0.1, 0.1, 1, 1, 1],
      THREE.InterpolateSmooth
    );
    const moveClip = new THREE.AnimationClip("moveIn", duration, [
      moveKF,
      scaleKF,
    ]);
    const move = this.#mixer.clipAction(moveClip);
    move.loop = THREE.LoopOnce;
    move.repetitions = 1;
    move.clampWhenFinished = true;
    this.#move = move;
  }

  #handleThemeChange() {
    const icon = this.#icon!;
    const hexagon = this.#hexagon!;
    const iconMaterial = icon.material as THREE.MeshPhongMaterial;
    const hexagonMaterial = hexagon.material as THREE.MeshPhongMaterial;
    iconMaterial.color.set(accentColor());
    hexagonMaterial.color.set(paperColor());
  }

  update(delta: number, themeChanged?: boolean) {
    this.#mixer!.update(delta);

    this.#icon!.rotateY(degToRad(1));

    if (themeChanged) {
      this.#handleThemeChange();
    }
  }

  get isIn() {
    return this.#isIn;
  }

  showIcon() {
    if (this.#isIn || this.#animation === "moving") return;
    this.#animation = "moving";

    const duration = this.#move!.getClip().duration;
    this.#move!.paused = false;
    this.#move!.timeScale = 1;

    setTimeout(() => {
      this.#isIn = true;
      this.#animation = "idle";
      this.#move!.paused = true;
    }, duration * 1000) as any;

    this.#move!.play();
  }

  hideIcon() {
    if (!this.#isIn || this.#animation === "moving") return;
    this.#animation = "moving";

    const duration = this.#move!.getClip().duration;
    this.#move!.paused = false;
    this.#move!.timeScale = -1;

    setTimeout(() => {
      this.#isIn = false;
      this.#animation = "idle";
      this.#move!.paused = true;
    }, duration * 1000) as any;

    this.#move!.play();
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

type MatrixItem = {
  type: string;
  elevation: number;
};

function randomType() {
  const types = ["cube", "cylinder", "cone", "torus", "torusKnot", "sphere"];
  return types[Math.floor(Math.random() * types.length)] as CellType;
}

class CellGrid extends THREE.Group {
  constructor(width: number = 10, height: number = 10, cellSize: number = 1) {
    super();
    this.#width = width;
    this.#height = height;
    this.#cellSize = cellSize;
    this.#init();
  }

  static fromMatrix(matrix: MatrixItem[][], cellSize: number = 1) {
    const grid = new CellGrid(matrix[0].length, matrix.length, cellSize);
    grid.each((cell, x, y) => {
      const { elevation, type } = matrix[y][x];
    });
    return grid;
  }

  #width: number = 0;

  #height: number = 0;

  #cellSize: number = 1;

  #cells: Cell[][] = [];

  #init() {
    this.#createCells();
  }

  each(fn: (cell: Cell, x: number, y: number) => void) {
    this.#cells.forEach((row, x) => row.forEach((cell, y) => fn(cell, x, y)));
  }

  #createCells() {
    this.#clearCells();

    const cells: Cell[][] = [];
    for (let x = 0; x < this.#width; x++) {
      cells[x] = [];
      for (let y = 0; y < this.#height; y++) {
        const cell = new Cell(this.#cellSize, randomType());
        cell.name = `cell-${x}-${y}`;
        cells[x][y] = cell;
        this.add(cell);
      }
    }
    this.#cells = cells;
  }

  distributeCells() {
    const cellSize = this.#cellSize;
    const width = this.#width;
    const height = this.#height;
    const sqrt3 = Math.sqrt(3);

    const horiz = sqrt3 * cellSize;
    const startX = (width / 2) * -1 * horiz + cellSize * 0.5;
    const startY = (height / 2) * -1 * (cellSize * 1.5) + cellSize;

    this.each((cell, x, y) => {
      const offset = y % 2 === 0 ? 0 : horiz / 2;

      cell.position.x = startX + offset + x * cellSize * sqrt3;
      cell.position.y = 0;
      cell.position.z = startY + y * cellSize * 1.5;
    });
  }

  update(delta: number, themeChanged?: boolean) {
    this.each((cell) => cell.update(delta, themeChanged));
  }

  #clearCells() {
    this.each((cell) => {
      cell.dispose();
    });
  }

  dispose() {
    this.#clearCells();
  }
}

const ensureCellGrid = (
  scene: SceneCtx["scene"],
  recreate = true,
  name = "cellGrid"
) => {
  return ensure<CellGrid>(name, () => new CellGrid(4, 4, 1), scene, recreate);
};

// ------------------------------------------------------------

export const onMount = (ctx: SceneCtx) => {
  const { scene, clock, theme: _theme } = ctx;
  theme = _theme || null;

  // @ts-ignore
  window.__scene = scene;
  // @ts-ignore
  window.__clock = clock;

  updateCamera(scene);

  const cellGrid = ensureCellGrid(scene, true);
  cellGrid.distributeCells();
  ensureAmbientLight(scene, true);
  ensureSpotLight(scene, true);
};

function getScene(object: THREE.Object3D): THREE.Scene {
  if (object.parent) return getScene(object.parent);
  return object as THREE.Scene;
}
function getCamera(object: THREE.Object3D) {
  const scene = getScene(object);
  return scene.getObjectByName("camera") as THREE.Camera;
}
function getCameraTarget(object: THREE.Object3D) {
  const scene = getScene(object);
  return scene.getObjectByName("camera-target") as THREE.Group;
}

let lookAtMovements: THREE.Vector3[] = [];
let cameraMovements: THREE.Vector3[] = [];
let frameCounter = 0;
let prevNow = 0;
let prevTheme: MantineTheme | null = null;
export const onRender = (ctx: SceneCtx) => {
  const { scene, clock, theme: _theme } = ctx;
  theme = _theme || null;
  const themeChanged = prevTheme?.colorScheme !== theme?.colorScheme;
  prevTheme = theme;
  // @ts-ignore
  if (!!window?.__recreateScene) {
    onMount(ctx);
    // @ts-ignore
    window.__recreateScene = false;
  }

  if (lookAtMovements.length > 0) {
    const vector3 = lookAtMovements.shift()!;
    const cameraTarget = scene?.getObjectByName("camera-target") as THREE.Group;
    cameraTarget.position.set(vector3.x, vector3.y, vector3.z);
  }
  if (cameraMovements.length > 0) {
    const vector3 = cameraMovements.shift()!;
    const camera = scene?.getObjectByName("camera") as THREE.PerspectiveCamera;
    camera.position.set(vector3.x, vector3.y, vector3.z);
  }

  updateCameraSide(scene);
  updateCameraTop(scene);
  updateCamera(scene);

  const now = clock.elapsedTime;

  const cellGrid = ensureCellGrid(scene, false);
  cellGrid.update(now - prevNow, themeChanged);

  const spotLight = ensureSpotLight(scene);
  spotLight.position.x = 10;
  spotLight.position.y = 30;
  spotLight.position.z = 10;
  spotLight.lookAt(getCameraTarget(scene).position);

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
  object.material.color.set(theme?.fn.primaryColor());
};

export const onPointerLeave: PointerHandler<"pointerleave"> = ({ object }) => {
  if (!(object instanceof Mesh)) return;
  object.material.color.set(object.userData.currentHex);
};

function computeMovement(
  current: THREE.Vector3,
  target: THREE.Vector3,
  distance: number
) {
  const keysCount = Math.round(distance) * 3;
  return [
    current.clone(),
    ...Array(keysCount)
      .fill(0)
      .map((_, i) => {
        const t = i / keysCount;
        const x = current.x + (target.x - current.x) * t;
        const y = current.y + (target.y - current.y) * t;
        const z = current.z + (target.z - current.z) * t;
        return new THREE.Vector3(x, y, z);
      }),
    target.clone(),
  ];
}
function lookAt(object: THREE.Object3D) {
  if (lookAtMovements.length > 0) return;

  const cameraTarget = getCameraTarget(object);
  const current = cameraTarget.position;
  const target = object.position;
  const distance = current.distanceTo(target);

  lookAtMovements = computeMovement(current, target, distance);
}
function moveCamera(object: THREE.Object3D) {
  if (cameraMovements.length > 0) return;

  const camera = getCamera(object);
  const current = camera.position;
  const target = object.position.clone().add(current);
  const distance = current.distanceTo(target);

  cameraMovements = computeMovement(current, target, distance);
}
function getObjectCell(object: THREE.Object3D | Cell): Cell | undefined {
  return object instanceof Cell
    ? object
    : object && object.parent
    ? getObjectCell(object.parent)
    : undefined;
}
export const onClick: PointerHandler<"click"> = ({ object }) => {
  if (!(object instanceof Mesh)) return;
  const cell = getObjectCell(object);
  if (!cell || !(cell.parent instanceof CellGrid)) return;
  cell.parent.each((c) => {
    if (c !== cell) c.hideIcon();
  });
  if (cell.isIn) {
    cell.hideIcon();
  } else {
    lookAt(cell);
    moveCamera(cell);
    cell.showIcon();
  }
};
