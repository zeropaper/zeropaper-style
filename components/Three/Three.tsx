import React, { Component, useMemo } from 'react';

import {
  useRef,
  useEffect,
  PropsWithChildren,
  MutableRefObject,
  useCallback,
} from 'react';
import { useResizeObserver } from '@mantine/hooks';
import { createStyles, MantineTheme, useMantineTheme } from '@mantine/core';
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
import { useTheme } from '../../themes/Theme';

export type PropTypes = {
  onMount?: (ctx: SceneCtx) => void;
  onRender?: (ctx: SceneCtx) => void;
};

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
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
  const theme = useTheme();
  function getTheme() {
    return theme;
  }
  console.info(
    'theme.colors[theme.primaryColor][2]',
    theme.primaryColor,
    theme.colors[theme.primaryColor][2]
  );

  useEffect(() => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  }, [width, height, canvas]);

  useEffect(() => {
    contexts?.current.forEach((ctx) => {
      const { renderer, camera } = ctx;
      const w = Math.round(width * ctx.widthPrct * 0.01);
      const h = Math.round(height * ctx.heightPrct * 0.01);
      const orthoZoom = 7;

      if (renderer) {
        renderer.setSize(w, h);
      }

      if (camera instanceof PerspectiveCamera) {
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
    clock.stop();
    if (onMount) onMount({ scene, clock, theme });
    clock.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRendererMount = useCallback((ctx: RendererCtx) => {
    contexts.current.push(ctx);
  }, []);
  const handleRendererUnmount = useCallback((ctx: RendererCtx) => {
    contexts.current.splice(
      contexts.current.findIndex((c) => c.id === ctx.id),
      1
    );
  }, []);

  const renderFrame = (deltaTime: number) => {
    const destCtx = canvas.current?.getContext('2d');
    if (!canvas.current || !destCtx) return;
    if (clock) clock.getElapsedTime();

    if (onRender) onRender({ scene, clock, theme });

    destCtx.clearRect(0, 0, destCtx.canvas.width, destCtx.canvas.height);
    contexts.current.forEach((ctx) => {
      const { leftPrct, topPrct, renderer } = ctx;
      if (!renderer?.domElement || !canvas.current) return;
      ctx.render(deltaTime);

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
  };
  useAnimationFrame(renderFrame);

  const ratio = width / height;
  let canvases = [
    <Renderer
      destinationCanvasRef={canvas}
      key="camera"
      id="camera"
      onMount={handleRendererMount}
      onUnmount={handleRendererUnmount}
    />,
  ];

  // wide
  if (ratio > 1.5) {
    canvases = [
      <Renderer
        destinationCanvasRef={canvas}
        key="wide-top"
        id="top"
        heightPrct={100}
        leftPrct={0}
        topPrct={0}
        widthPrct={25}
        onMount={handleRendererMount}
        onUnmount={handleRendererUnmount}
      />,
      <Renderer
        destinationCanvasRef={canvas}
        key="wide-side"
        id="side"
        heightPrct={100}
        leftPrct={75}
        topPrct={0}
        widthPrct={25}
        onMount={handleRendererMount}
        onUnmount={handleRendererUnmount}
      />,
      <Renderer
        destinationCanvasRef={canvas}
        key="wide-camera"
        id="camera"
        heightPrct={100}
        leftPrct={25}
        topPrct={0}
        widthPrct={50}
        onMount={handleRendererMount}
        onUnmount={handleRendererUnmount}
      />,
    ];
    // tall
  } else if (ratio < 0.75) {
    canvases = [
      <Renderer
        destinationCanvasRef={canvas}
        key="tall-top"
        id="top"
        heightPrct={50}
        leftPrct={0}
        topPrct={50}
        widthPrct={50}
        onMount={handleRendererMount}
        onUnmount={handleRendererUnmount}
      />,
      <Renderer
        destinationCanvasRef={canvas}
        key="tall-side"
        id="side"
        heightPrct={50}
        leftPrct={50}
        topPrct={50}
        widthPrct={50}
        onMount={handleRendererMount}
        onUnmount={handleRendererUnmount}
      />,
      <Renderer
        destinationCanvasRef={canvas}
        key="tall-camera"
        id="camera"
        heightPrct={50}
        leftPrct={0}
        topPrct={0}
        widthPrct={100}
        onMount={handleRendererMount}
        onUnmount={handleRendererUnmount}
      />,
    ];
  }

  return (
    <>
      <canvas ref={canvas} width={width} height={height} />
      {canvases}
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
            width={Math.floor(rect.width)}
            height={Math.floor(rect.height)}
          />
        </Scene>
      </ErrorBoundary>
    </div>
  );
};

export default Three;
