import produce from 'immer';
import { cloneDeep } from 'lodash';
import mapping from './Mapping';

const isObject = (a: any) => Object.prototype.toString.call(a).indexOf('Object') > -1;

export const calcWidget = (widgetName: string) => {
  let result = 'div';
  if (typeof widgetName !== 'string') return result;
  if (widgetName.includes('.')) {
    const _temp = widgetName.split('.');
    try {
      result = mapping[_temp[0]][_temp[1]] || 'div';
    } catch (error) {
      console.error(`${widgetName} is wrong`);
    }
  } else {
    try {
      result = mapping[widgetName] || 'div';
    } catch (error) {}
  }
  return result;
};

// layout、name字段，每层calc
export const enhanceSchema = (schema: any, parentLayout?: string) => {
  if (!isObject(schema)) return schema;
  const result = cloneDeep(schema);
  result.layout = result.layout || parentLayout || '4/12';
  if (result.children) {
    Object.keys(result.children).forEach((key) => {
      result.children[key] = enhanceSchema(result.children[key], result.layout);
    });
  }
  if (result.item) {
    result.item = enhanceSchema(result.item, result.layout);
  }
  // 最顶层
  if (!parentLayout) {
    Object.keys(result).forEach((key) => {
      if (isObject(result[key])) {
        result[key] = enhanceSchema(result[key], result.layout);
      }
    });
  }
  return result;
};
