import { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import {
  WebGLRenderer,
  PerspectiveCamera,
  OrthographicCamera,
  CameraHelper,
  PCFSoftShadowMap,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { useScene } from './hooks';
import { RendererCtx, RendererContext } from './RendererCtx';

const ensureProxy = (original: HTMLElement): HTMLElement => {
  let proxy =
    original.parentElement?.querySelector<HTMLElement>('[data-proxy]');
  if (!proxy) {
    proxy = document.createElement('div');
    proxy.setAttribute('data-proxy', 'true');
    original.parentElement?.insertBefore(proxy, original);
  }
  return proxy;
};

const useCamera = ({
  id,
  scene,
  renderer,
  destinationCanvasRef,
  topPrct,
  leftPrct,
}: {
  id: string;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  destinationCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  topPrct: number;
  leftPrct: number;
}) =>
  useMemo<
    [PerspectiveCamera | OrthographicCamera, OrbitControls | null]
  >(() => {
    let instance;
    let ctrls: OrbitControls | null = null;
    if (id === 'camera') {
      const found = scene.getObjectByName('camera') as PerspectiveCamera | null;
      instance = found || new PerspectiveCamera();
      instance.name = 'camera';
      const destCanvas = destinationCanvasRef.current;
      if (destCanvas?.width && destCanvas?.height) {
        requestAnimationFrame(() => {
          const proxy = ensureProxy(destCanvas);
          proxy.style.top = `${(destCanvas?.height || 0) * (topPrct * 0.01)}px`;
          proxy.style.left = `${
            (destCanvas?.width || 0) * (leftPrct * 0.01)
          }px`;
          proxy.style.height = `${renderer.domElement?.height}px`;
          proxy.style.width = `${renderer.domElement?.width}px`;
          proxy.style.position = 'absolute';
          proxy.style.zIndex = '100';
          // proxy.style.background = 'lime';
          // proxy.style.opacity = '0.5';
        });

        ctrls = new OrbitControls(instance, ensureProxy(destCanvas));
        // @ts-ignore
        ctrls.listenToKeyEvents(window); // optional

        ctrls.enablePan = true;
        ctrls.enableZoom = true;

        ctrls.screenSpacePanning = false;

        ctrls.minDistance = 1;
        ctrls.maxDistance = 60;

        const controlSpeed =
          'ontouchstart' in window || navigator.maxTouchPoints ? 1 : 0.1;
        ctrls.rotateSpeed = controlSpeed;
        ctrls.panSpeed = controlSpeed;
        ctrls.zoomSpeed = controlSpeed;

        ctrls.maxPolarAngle = Math.PI / 2;
      }
    } else {
      const found = scene.getObjectByName(
        `camera-${id}`
      ) as OrthographicCamera | null;
      instance = found || new OrthographicCamera();
      instance.name = `camera-${id}`;
    }
    return [instance, ctrls];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    destinationCanvasRef.current?.width,
    destinationCanvasRef.current?.height,
  ]);

const Renderer = ({
  id,
  destinationCanvasRef,
  children,
  onMount,
  onUnmount,
  onContextChange,
  widthPrct = 100,
  heightPrct = 100,
  leftPrct = 0,
  topPrct = 0,
}: PropsWithChildren<
  {
    id: string;
    destinationCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    onMount: (ctx: RendererCtx) => void;
    onUnmount: (ctx: RendererCtx) => void;
    onContextChange?: (ctx: RendererCtx) => void;
  } & Partial<
    Pick<RendererCtx, 'heightPrct' | 'leftPrct' | 'topPrct' | 'widthPrct'>
  >
>) => {
  const scene = useScene();
  const renderer = useMemo<WebGLRenderer>(() => {
    const instance = new WebGLRenderer({ alpha: true });
    instance.shadowMap.enabled = true;
    // instance.shadowMap.autoUpdate = true;
    instance.shadowMap.type = PCFSoftShadowMap;
    // if (id === 'camera') {
    // }
    return instance;
  }, []);

  const [camera, controls] = useCamera({
    id,
    scene,
    renderer,
    destinationCanvasRef,
    topPrct,
    leftPrct,
  });

  const cameraHelper = useMemo<CameraHelper | null>(() => {
    if (id !== 'camera') return null;
    const instance = new CameraHelper(camera);
    instance.name = `${camera.name}-helper`;
    instance.visible = false;
    return instance;
  }, [camera, id]);

  const context = useMemo(
    () => ({
      id,
      render: () => {
        // @ts-ignore
        if (!scene || Number.isNaN(camera?.aspect)) return;
        cameraHelper?.update();
        controls?.update();
        renderer.render(scene, camera);
      },
      renderer,
      camera,
      widthPrct,
      heightPrct,
      leftPrct,
      topPrct,
    }),
    [
      id,
      renderer,
      camera,
      widthPrct,
      heightPrct,
      leftPrct,
      topPrct,
      scene,
      cameraHelper,
      controls,
    ]
  );

  useEffect(() => {
    scene.add(camera);
    if (cameraHelper) scene.add(cameraHelper);
    return () => {
      if (camera) scene.remove(camera);
      if (cameraHelper) scene.remove(cameraHelper);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useEffect(() => {
    if (onMount) onMount(context);
    return () => {
      if (onUnmount) onUnmount(context);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof onContextChange === 'function') onContextChange(context);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return (
    <RendererContext.Provider value={context}>
      {children}
    </RendererContext.Provider>
  );
};

export default Renderer;
