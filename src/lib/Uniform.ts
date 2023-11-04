
export default class Uniform {

  declare location: WebGLUniformLocation;
  declare ctx: WebGL2RenderingContext;
  declare name: string;
  declare type: string;
  declare uniformSetter: (location: WebGLUniformLocation, ...value: any[]) => any;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  initLocation(ctx: WebGL2RenderingContext, program: WebGLProgram) {
    this.ctx = ctx;
    this.location = ctx.getUniformLocation(program, this.name)!;
    this.uniformSetter = `uniform${this.type}`;

    if (!this.ctx[this.uniformSetter])
      throw `Invalid uniform type! uniform${this.type} is not a function.`;
  }

  set(...values: any[]) {
    this.ctx[this.uniformSetter](this.location, ...values);
  }
}
