import { createContext } from "react";
import { Renderer, PerspectiveCamera, OrthographicCamera } from "three";

export type RendererCtx = {
  widthPrct: number | 100;
  heightPrct: number | 100;
  leftPrct: number | 0;
  topPrct: number | 0;
  renderer: Renderer | null;
  camera: PerspectiveCamera | OrthographicCamera | null;
  render: (deltaTime: number) => void;
  id: string;
};

const defaultRenderer: RendererCtx = {
  widthPrct: 100,
  heightPrct: 100,
  leftPrct: 0,
  topPrct: 0,
  renderer: null,
  camera: null,
  id: "",
  render: (deltaTime: number) => {},
};

export const RendererContext = createContext(defaultRenderer);
