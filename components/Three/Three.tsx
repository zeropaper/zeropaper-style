import React from 'react';

import {
  useRef,
  useEffect,
  PropsWithChildren,
  MutableRefObject,
  useCallback,
} from 'react';
import { useResizeObserver } from '@mantine/hooks';
import { createStyles } from '@mantine/core';
import { PerspectiveCamera, OrthographicCamera } from 'three';

import type { RendererCtx } from './RendererCtx';
import type { SceneCtx } from './SceneCtx';
import Scene from './Scene';
import Renderer from './Renderer';
import { useAnimationFrame, useClock, useScene } from './hooks';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
// import onRender from './onRender';
// import onMount from './onMount';
import * as scripts from './Three.scripts';

export type PropTypes = {
  onMount?: (ctx: SceneCtx) => void;
  onRender?: (ctx: SceneCtx) => void;
};

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    flexGrow: 4,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    '& > canvas': {
      position: 'absolute',
      flexGrow: 1,
    },
  },
}));

export const RuntimeComponent = ({
  // container,
  width = 0,
  height = 0,
  onMount,
  onRender,
}: PropsWithChildren<
  {
    // container: MutableRefObject<any>;
    width: number;
    height: number;
  } & PropTypes
>) => {
  const contexts = useRef<RendererCtx[]>([]);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useScene();
  const clock = useClock();

  useEffect(() => {
    if (canvas.current) {
      // console.info('Three resize destination canvas', width, height)
      canvas.current.width = width;
      canvas.current.height = height;
    }
  }, [width, height, canvas]);

  useEffect(() => {
    // console.info('Three resize')
    contexts?.current.forEach((ctx) => {
      const { renderer, camera } = ctx;
      const w = Math.round(width * ctx.widthPrct * 0.01);
      const h = Math.round(height * ctx.heightPrct * 0.01);
      const orthoZoom = 7;

      if (renderer) {
        renderer.setSize(w, h);
      }

      if (camera instanceof PerspectiveCamera) {
        // console.info('Three camera perspective', camera, w, width, h, height)
        camera.aspect = w / h;
      } else if (camera instanceof OrthographicCamera) {
        camera.left = -w / orthoZoom;
        camera.right = w / orthoZoom;
        camera.top = h / orthoZoom;
        camera.bottom = -h / orthoZoom;
      }

      camera?.updateProjectionMatrix();
    });
  }, [width, height, contexts]);

  useEffect(() => {
    console.info('Three mount');
    clock.stop();
    if (onMount) onMount({ scene, clock });
    clock.start();
  }, []);

  const handleRendererMount = useCallback((ctx: RendererCtx) => {
    const { renderer } = ctx;

    contexts.current.push(ctx);
    // console.info('Three handleRendererMount', container, renderer, contexts.current.length)
  }, []);
  const handleRendererUnmount = useCallback((ctx: RendererCtx) => {
    const { renderer } = ctx;

    contexts.current.splice(
      contexts.current.findIndex((c) => c.id === ctx.id),
      1
    );
    // console.info('Three handleRendererUnmount', container, renderer, contexts.current.length)
  }, []);

  useAnimationFrame((deltaTime) => {
    const destCtx = canvas.current?.getContext('2d');
    if (!canvas.current || !destCtx) return;
    if (clock) clock.getElapsedTime();

    if (onRender) onRender({ scene, clock });
    contexts.current.forEach((ctx) => ctx.render(deltaTime));

    destCtx.clearRect(0, 0, destCtx.canvas.width, destCtx.canvas.height);
    contexts.current.forEach(({ leftPrct, topPrct, renderer }) => {
      if (!renderer?.domElement || !canvas.current) return;

      try {
        const { width: dw, height: dh } = canvas.current;
        const { width: sw, height: sh } = renderer.domElement;
        destCtx?.drawImage(
          renderer.domElement,
          0,
          0,
          sw,
          sh,
          leftPrct * 0.01 * dw,
          topPrct * 0.01 * dh,
          sw,
          sh
        );
      } catch (e) {}
    });
  });

  return (
    <>
      <canvas ref={canvas} width={width} height={height} />
      {[
        <Renderer
          key="top"
          id="top"
          widthPrct={25}
          heightPrct={50}
          onMount={handleRendererMount}
          onUnmount={handleRendererUnmount}
        />,
        <Renderer
          key="side"
          id="side"
          widthPrct={25}
          heightPrct={50}
          topPrct={50}
          onMount={handleRendererMount}
          onUnmount={handleRendererUnmount}
        />,
        <Renderer
          key="camera"
          id="camera"
          widthPrct={75}
          leftPrct={25}
          onMount={handleRendererMount}
          onUnmount={handleRendererUnmount}
        />,
      ]}
    </>
  );
};

export const Three = ({ onMount, onRender }: PropTypes) => {
  const [ref, rect] = useResizeObserver();
  const { classes } = useStyles();

  return (
    <div ref={ref} className={classes.root}>
      <ErrorBoundary>
        <Scene width={Math.floor(rect.width)} height={Math.floor(rect.height)}>
          <RuntimeComponent
            onMount={onMount || scripts.onMount}
            onRender={onRender || scripts.onRender}
            // container={ref}
            width={Math.floor(rect.width)}
            height={Math.floor(rect.height)}
          />
        </Scene>
      </ErrorBoundary>
    </div>
  );
};

export default Three;
