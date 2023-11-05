import {Vec3} from "../util/types.ts";
import Scene from "../Scene.ts";


export default function rainbow(pos: Vec3, i: number, scene: Scene) {

  const color = [
    Math.sin(i) + 1,
    Math.sin(i + 1) + 1,
    Math.sin(i + 2) + 1
  ];

  const density = .1;
  const opacity = .3;

  return [...color, opacity, density];
}
