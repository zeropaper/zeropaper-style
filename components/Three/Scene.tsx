import React, {
  PropsWithChildren,
  useMemo,
  useRef,
} from 'react'
import {
  Scene as TScene,
  Clock,
} from 'three'

import { SceneContext, SceneCtx } from './SceneCtx'

export const Scene = ({ children }: PropsWithChildren<{ width: number; height: number; }>) => {
  const scene = useRef(new TScene())
  const clock = useRef(new Clock(true))
  const context = useMemo((): SceneCtx => ({
    scene: scene.current,
    clock: clock.current,
  }), [scene, clock])
  return (
    <SceneContext.Provider value={context}>
      {children}
    </SceneContext.Provider>
  )
}

export default Scene