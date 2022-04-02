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

  const [camera, controls] = useMemo<
    [PerspectiveCamera | OrthographicCamera, OrbitControls | null]
  >(() => {
    let instance;
    let ctrls: OrbitControls | null = null;
    if (id === 'camera') {
      const found = scene.getObjectByName('camera') as PerspectiveCamera | null;
      instance = found || new PerspectiveCamera();
      instance.name = 'camera';
      if (
        destinationCanvasRef.current?.width &&
        destinationCanvasRef.current?.height
      ) {
        ctrls = new OrbitControls(instance, destinationCanvasRef.current);
        // @ts-ignore
        ctrls.listenToKeyEvents(window); // optional

        ctrls.enablePan = true;
        ctrls.enableZoom = true;

        ctrls.screenSpacePanning = false;

        ctrls.minDistance = 1;
        ctrls.maxDistance = 12;

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
