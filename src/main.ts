import WebGLContext from "./lib/WebGLContext.ts";
import Uniform from "./lib/Uniform.ts";
import Definition from "./lib/Definition.ts";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import Scene from "./Scene.ts";
import rainbow from "./assets/rainbow.ts";
import sphere from "./assets/sphere.ts";

const canvasWidth = 256;
const canvasHeight = 256;

const COMPONENTS_PER_GAUSSIAN = 5;

const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
const webglContext = new WebGLContext(canvas);

const shape = [7, 7, 7];
const brightness = 1;
const z_dist = 1.5;

const scene = new Scene(shape).fromFn(rainbow);

const definitions = [
  new Definition("n_gaussians",   scene.n_gaussians),
  new Definition("n_gauss_comps", COMPONENTS_PER_GAUSSIAN),
  new Definition("z_dist",        z_dist),
];

const uniforms = [
  new Uniform("brightness",  "1f",  brightness),
  new Uniform("scene_shape", "3i",  ...scene.shape),
  new Uniform("gauss_data",   "1fv", scene.gauss_data)
];

webglContext.resize(canvasWidth, canvasHeight);
webglContext.initScene(vertex, fragment, uniforms, definitions);

const draw = () => {
  webglContext.drawImage();
  requestAnimationFrame(draw);
}

draw();
