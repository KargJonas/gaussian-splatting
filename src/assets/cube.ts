import {Vec3} from "../util/types.ts";
import Scene from "../Scene.ts";


export default function cube(pos: Vec3, i: number, scene: Scene) {

  const color = [1, 1, 1];

  const density = .1;
  const opacity = .2;

  return [...color, opacity, density];
}
