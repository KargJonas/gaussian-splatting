import WebGLContext from "./lib/WebGLContext.ts";
import Uniform from "./lib/Uniform.ts";
import Definition from "./lib/Definition.ts";
import SplatScene from "./SplatScene.ts";
import Vec3 from "./Vec3.ts";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

const canvasWidth = 500;
const canvasHeight = 500;

const COMPONENTS_PER_GAUSSIAN = 5;

const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
const webglContext = new WebGLContext(canvas);

const brightness = 1;
const z_dist = 1.5;
const shape = new Array(3).fill(7);
const n_gaussians = shape.reduce((acc, v) => acc * v, 1);
const gauss_data = [];

for (let i = 0; i < n_gaussians; i++) {
  const color = [
    Math.sin(i) + 1,
    Math.sin(i + 1) + 1,
    Math.sin(i + 2) + 1
  ];

  const opacity = .3;
  const density = .05;

  gauss_data.push(...color, opacity, density);
}

const definitions = [
  new Definition("n_gaussians", n_gaussians),
  new Definition("n_gauss_comps", COMPONENTS_PER_GAUSSIAN),
  new Definition("z_dist",      z_dist),
];

const uniforms = [
  new Uniform("brightness",  "1f",  brightness),
  new Uniform("scene_shape", "3i",  ...shape),
  new Uniform("gauss_data",   "1fv", new Float32Array(gauss_data))
];

webglContext.resize(canvasWidth, canvasHeight);
webglContext.initScene(vertex, fragment, uniforms, definitions);

const draw = () => {

  webglContext.drawImage();
  requestAnimationFrame(draw);
}

draw();
