import WebGLContext from "./lib/WebGLContext.ts";
import Uniform from "./lib/Uniform.ts";
import Definition from "./lib/Definition.ts";
import SplatScene from "./SplatScene.ts";
import Vec3 from "./Vec3.ts";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

const canvasWidth = 500;
const canvasHeight = 500;

const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
const webglContext = new WebGLContext(canvas);

const z_dist = 1;
const shape = [4, 4, 4];
const gauss_data = new Float32Array([0,0,0,0.01, -1,0,0,0.01, 1,0,0,0.01]);

// Adding some preprocessor definitions
const n_gaussians = shape.reduce((acc, v) => acc * v, 1); // number of gaussians

const definitions = [
  new Definition("n_gaussians", n_gaussians),
  new Definition("z_dist", z_dist),
];

const uniforms = [
  new Uniform("brightness", "1f", 2),
  new Uniform("scene_shape", "3i", ...shape),
  new Uniform("gaussians", "4fv", gauss_data)
];

webglContext.resize(canvasWidth, canvasHeight);
webglContext.initScene(vertex, fragment, uniforms, definitions);

const draw = () => {

  webglContext.drawImage();
  requestAnimationFrame(draw);
}

draw();
