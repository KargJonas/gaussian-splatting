import WebGLContext from "./lib/WebGLContext.ts";
import Uniform from "./lib/Uniform.ts";
import Definition from "./lib/Definition.ts";
import Scene from "./Scene.ts";

// Shaders
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

// Assets
// import cube from "./assets/cube.ts";
// import sphere from "./assets/sphere.ts";
import rainbow from "./assets/rainbow.ts";

const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
const webglContext = new WebGLContext(canvas);

const canvasWidth = 256;
const canvasHeight = 256;
const COMPONENTS_PER_GAUSSIAN = 5;

const shape = [7, 7, 7];
const brightness = 1;
const z_dist = 1.5;

// const scene = new Scene(shape).fromFn(cube);
// const scene = new Scene(shape).fromFn(sphere);
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
