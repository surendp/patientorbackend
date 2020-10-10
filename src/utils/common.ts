/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const parseString = (str: any, errorMessage: string): string => {
  if (!str || !isString(str)) {
    throw new Error(errorMessage);
  }
  return str;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

export {
  isString,
  isDate,
  parseDate,
  parseString
};