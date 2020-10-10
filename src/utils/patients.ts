/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Gender, NewPatient } from "../types";
import { parseDate, parseString } from "./common";

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

const parseName = (name: any): string => {
  return parseString(name, `Incorrect or missing name: ${name}`);
};

const parseSsn = (ssn: any): string => {
  return parseString(ssn, `Incorrect or missing ssn: ${ssn}`);
};

const parseOccupation = (occupation: any): string => {
  return parseString(occupation, `Incorrect or missing occupation: ${occupation}`);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export {
  toNewPatient,
  toPatientId
};