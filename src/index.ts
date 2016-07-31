/// <reference path="../typings/tsd.d.ts"/>

import * as Models from './rulet.d';
import { SingleSettingsSingleTags } from './parsers/Parsers';
import * as Util from 'util';

class Rulet implements Models.IRulet {
  private _parsers: Array<Models.IParser>;
  private _currentParser: Models.IParser;

  public constructor(...params: any[]) {
    this._parsers = new Array<Models.IParser>();
    this._parsers.push(new SingleSettingsSingleTags());

    this._parsers.forEach((argumentInit) => {
      if (argumentInit.satisfaces(this, params)) {
        this._currentParser = argumentInit;
      }
    });

    if (!this._currentParser) {
      throw new Error(`Could not start Rulet with these arguments: ${JSON.stringify(params)}`);
    }
  }

  public getConfiguration(): any {
    return this._currentParser.getConfiguration();
  }

  public createConfiguration(obj: any, tags: string[]): any {
    if (obj === null || obj === undefined || tags === null || tags === undefined || typeof obj !== 'object' || !Util.isArray(tags)) {
      return null;
    }

    let result = {};
    let tag = this.createVirtualTags(tags);

    for (let condition in obj) {
      let newCondition = this.createConditionWithVirtualTags(condition);
      let satisfaces = eval(`(${newCondition})`);
      if (satisfaces) {
        Object.assign(result, obj[condition]);
      }
    }
    return result;
  }

  private createConditionWithVirtualTags(oldCondition: string) {
    if (!oldCondition) return "";
    return oldCondition.replace(/([\w]+[\w\d]*)/g, "tag.$1");
  }

  private createVirtualTags(tags): any {
    if (!(tags instanceof Array)) {
      return null;
    }

    var result = {};
    tags.forEach((tag) => { result[tag] = true; } );

    return result;
  }
}

module.exports = Rulet;