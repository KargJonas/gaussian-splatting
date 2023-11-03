import WebGLContext from "./webgl.ts";
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
// import loadImage from "./util/loadImage.ts";

const canvasWidth = 500;
const canvasHeight = 500;

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
const webglContext = new WebGLContext(canvas);

webglContext.resize(canvasWidth, canvasHeight);
webglContext.initScene(vertex, fragment);
webglContext.drawImage();
