import {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  WebGLRenderer,
  PerspectiveCamera,
  OrthographicCamera,
  CameraHelper,
  PCFSoftShadowMap,
  PCFShadowMap,
} from 'three'

import { useScene } from './hooks'
import { RendererCtx, RendererContext } from './RendererCtx'

const Renderer = ({
  id,
  children,
  onMount,
  onUnmount,
  onContextChange,
  widthPrct = 100,
  heightPrct = 100,
  leftPrct = 0,
  topPrct = 0,
}: PropsWithChildren<{
  id: string;
  onMount: (ctx: RendererCtx) => void,
  onUnmount: (ctx: RendererCtx) => void,
  onContextChange?: (ctx: RendererCtx) => void,
} & Partial<Pick<RendererCtx, 'heightPrct' | 'leftPrct' | 'topPrct' | 'widthPrct'>>>) => {
  const scene = useScene()
  const renderer = useMemo<WebGLRenderer>(() => {
    const instance = new WebGLRenderer({ alpha: true })
    instance.shadowMap.enabled = true;
    instance.shadowMap.type = PCFSoftShadowMap;
    return instance
  }, [])
  const camera: PerspectiveCamera | OrthographicCamera = useMemo(() => {
    let instance;
    if (id === 'camera') {
      instance = new PerspectiveCamera()
      instance.name = 'camera'
    } else {
      instance = new OrthographicCamera()
      instance.name = `camera-${id}`
    }
    console.info('Three camera', id, instance.uuid)
    return instance;
  }, [id])

  // const cameraHelper = useMemo(() => {
  //   const instance = new CameraHelper(camera)
  //   instance.name = `${camera.name}-helper`
  //   return instance
  // }, [camera])

  const context = useMemo(() => ({
    id,
    render: () => {
      if (!scene) return;
      // cameraHelper.update()
      renderer.render(scene, camera)
    },
    renderer,
    camera,
    widthPrct,
    heightPrct,
    leftPrct,
    topPrct,
  }), [id, renderer, camera, widthPrct, heightPrct, leftPrct, topPrct, scene])

  useEffect(() => {
    scene.add(camera)
    // scene.add(cameraHelper)
    return () => {
      if (camera) scene.remove(camera)
      // if (cameraHelper) scene.remove(cameraHelper)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene])

  useEffect(() => {
    if (onMount) onMount(context)
    return () => {
      if (onUnmount) onUnmount(context)
    }
  }, [])

  useEffect(() => {
    if (typeof onContextChange === 'function') onContextChange(context)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context])

  return (
    <RendererContext.Provider value={context}>
      {children}
    </RendererContext.Provider>
  )
}


export default Renderer