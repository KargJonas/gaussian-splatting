// void addGauss( inout vec4 fragColor, vec3 pos, vec2 uv, float sigma, vec3 color )
import Vec3 from "./Vec3.ts";

export default class Gaussian {
  declare color: Vec3;
  declare sigma: number;

  constructor(color: Vec3, sigma: number) {
    this.color = color;
    this.sigma = sigma;
  }
}
