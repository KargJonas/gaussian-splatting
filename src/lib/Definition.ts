
export default class Definition {
  declare name: string;
  declare value: string;

  constructor(name: string, value: number | string) {
    this.name = name;
    this.value = value;

    if (/[\r\n]/.exec(value))
      console.warn(`Careful, your definition "${name}" contains a newline.`);
  }

  getCode() {
    return `#define ${this.name} ${this.value}`;
  }
}
