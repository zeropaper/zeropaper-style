import {
  useContext,
  useRef,
  useEffect,
  useCallback
} from "react";
import {
  Scene,
  Object3D,
  Event,
  Renderer,
  Camera,
  Mesh
} from 'three'

import { SceneContext } from "./SceneCtx";
import { RendererContext } from "./RendererCtx";

export const useScene = () => {
  const context = useContext(SceneContext)
  return context.scene
}

type CreateObject = () => Mesh | Object3D<Event>

export const findOrAdd = (object: Scene | Object3D<Event>, name: string, create: CreateObject): Object3D<Event> => {
  const found = object.getObjectByName(name);
  if (found) return found;

  const created = create()
  created.name = name;
  object.add(created)
  return created
}

export const useFindOrAdd = (name: string, create: CreateObject): Object3D<Event> => {
  const scene = useScene()
  return findOrAdd(scene, name, create)
}

export const useClock = () => {
  const context = useContext(SceneContext)
  return context.clock
}

export const useRenderer = (): Renderer | null => {
  const context = useContext(RendererContext)
  return context.renderer
}

export const useCamera = (): Camera | null => {
  const context = useContext(RendererContext)
  return context.camera
}

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const cancel = () => {
    if (requestRef?.current) cancelAnimationFrame(requestRef?.current);
  }

  const animate = useCallback((time: number = 0) => {
    if (previousTimeRef?.current) {
      const deltaTime = time - (previousTimeRef?.current || 0);
      callback(deltaTime)
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return cancel
  }, [animate]);
}