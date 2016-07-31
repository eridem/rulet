import * as Models from '../rulet.d';

class SingleSettingsSingleTags implements Models.IParser {
  private _rulet: Models.IRulet;
  private _config: string;
  private _tags: Array<string>;

  public satisfaces(rulet: Models.IRulet, args: any[]): boolean {
    let satisfaces = args && args.length === 2 && args[0] && args[1] && typeof args[0] === 'object' && args[1] instanceof Array;

    if (satisfaces) {
      this._config = args[0];
      this._tags = args[1];
    }

    return satisfaces ? true : false;
  }

  public getConfiguration(): any {
    return this._rulet.createConfiguration(this._config, this._tags);
  }
}
export { SingleSettingsSingleTags };