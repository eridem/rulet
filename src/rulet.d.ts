export interface IRulet {
  getConfiguration(): any;
  createConfiguration(obj: any, tags: string[]): any;
}

export interface IParser {
  satisfaces(rulet: IRulet, args: Array<any>): boolean;
  getConfiguration():any;
}