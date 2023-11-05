import Scene from "../Scene.ts";

export type Vec3 = number[];
export type Gaussian = number[];
export type VolumetricFn = (pos: Vec3, index: number, scene: Scene) => Gaussian;
