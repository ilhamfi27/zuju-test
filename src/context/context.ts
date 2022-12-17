export interface Field { 
  span: any
}
class Context {
  _span: any;
  constructor(fields: Field) {
    this._span = fields.span;
  }

  set span(value) {
    this._span = value;
  }

  get span() {
    return this._span;
  }
}

export default Context;
