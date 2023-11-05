import Scene from "../Scene.ts";
import {Vec3} from "../util/types.ts";


export default function sphere(pos: Vec3, i: number, scene: Scene) {
  let dist = pos
    .map((comp, index) => comp - scene.centroid[index])     // Compute displacement from center in R3
    .reduce((acc, comp) => acc + Math.pow(comp, 2), 0);  // Compute distance from center as scalar

  dist = Math.sqrt(dist) / scene.max_dim_size;

  const color = [1, 1, 1];
  const density = .06;
  const opacity = dist > .4
    ? 0
    : .13;

  return [...color, opacity, density];
}
