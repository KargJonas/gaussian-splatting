
export default class Uniform {

  declare uniformSetter: (location: WebGLUniformLocation, ...value: any[]) => any;
  declare location: WebGLUniformLocation;
  declare ctx: WebGL2RenderingContext;
  declare name: string;
  declare type: string;
  declare initialValue: any[];

  constructor(name: string, type: string, ...initialValue: any[]) {
    this.name = name;
    this.type = type;
    this.initialValue = initialValue;
  }

  init(ctx: WebGL2RenderingContext, program: WebGLProgram) {
    this.ctx = ctx;
    this.location = ctx.getUniformLocation(program, this.name)!;
    this.uniformSetter = `uniform${this.type}`;

    if (!this.ctx[this.uniformSetter])
      throw `Invalid uniform type! uniform${this.type} is not a function.`;

    if (this.initialValue.length > 0) this.set(...this.initialValue);
  }

  set(...values: any[]) {
    this.ctx[this.uniformSetter](this.location, ...values);
  }
}
