import Scene from "../Scene.ts";

export type Vec3 = number[3];
export type Gaussian = number[7];
export type VolumetricFn = (pos: Vec3, index: number, scene: Scene) => Gaussian;
