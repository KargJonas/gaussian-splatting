import {Vec3, VolumetricFn} from "./util/types.ts";

export default class Scene {

  shape: Vec3;                // Scene shape [size_x, size_y, size_z]
  centroid: Vec3;             // Geometric center of scene [x, y, z]
  max_dim_size: number;       // Size of largest dimension ( =max(size_x, size_y, size_z) )
  n_gaussians: number;        // Number of gaussians in the scene
  gauss_data: Float32Array | undefined; // Raw gaussian data [r1, g1, b1, opac1, sigma1, r2, g2, ...]

  constructor(shape: Vec3, gauss_data?: Float32Array) {
    this.shape = shape;
    this.centroid = shape.map((component) => component / 2);
    this.max_dim_size = Math.max(...shape);
    this.n_gaussians = shape.reduce((acc, v) => acc * v, 1);
    this.gauss_data = gauss_data;
  }

  private getPosFromIndex(i: number) {
    let n_z_plane_items = this.shape[0] * this.shape[1];
    let z = (i / n_z_plane_items) | 0;
    i -= n_z_plane_items * z;
    let y = (i / this.shape[0]) | 0;
    let x = i - y * this.shape[0];

    return [x, y, z];
  }

  public fromFn(fn: VolumetricFn) {
    const data = [];

    for (let i = 0; i < this.n_gaussians; i++) {
      const pos = this.getPosFromIndex(i);
      data.push(...fn(pos, i, this));
    }

    this.gauss_data = new Float32Array(data);
    return this;
  }
}
