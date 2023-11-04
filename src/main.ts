import WebGLContext from "./WebGLContext.ts";
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import Uniform from "./Uniform.ts";

const canvasWidth = 500;
const canvasHeight = 500;

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
const webglContext = new WebGLContext(canvas);

const gaussians = new Uniform('u_gaussians', '1f');

webglContext.resize(canvasWidth, canvasHeight);
webglContext.initScene(vertex, fragment, [gaussians]);

const draw = () => {

  webglContext.drawImage();
  requestAnimationFrame(draw);
}

draw();
