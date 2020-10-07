/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Gender, NewPatient } from "./types";

const toNewPatient = (obj: any): NewPatient => {
  const {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  } = obj;

  return {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  } as NewPatient;
};

const toPatientId = (id: any): string => {
  return parseString(id, `Incorrect or Missing Id, ${id}`);
};

const parseString = (str: any, errorMessage: string): string => {
  if (!str || !isString(str)) {
    throw new Error(errorMessage);
  }
  return str;
};

const parseName = (name: any): string => {
  return parseString(name, `Incorrect or missing name: ${name}`);
};

const parseSsn = (ssn: any): string => {
  return parseString(ssn, `Incorrect or missing ssn: ${ssn}`);
};

const parseOccupation = (occupation: any): string => {
  return parseString(occupation, `Incorrect or missing occupation: ${occupation}`);
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export {
  toNewPatient,
  toPatientId
};