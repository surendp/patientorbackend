/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Discharge,
  Diagnosis,
  HealthCheckRating,
  SickLeave,
  EntryType,
  NewEntry
} from "../types";

import {
  parseString,
  parseDate,
  isString,
  isDate
} from "./common";

import diagnosis from '../../data/diagnosis.json';


const toNewEntry = (obj: any): NewEntry => {
  const {
    description,
    date,
    specialist,
    type,
    diagnosisCodes,
    discharge,
    healthCheckRating,
    employerName,
    sickLeave
  } = obj;

  const entryType = parseType(type);

  const baseEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    ...(diagnosisCodes
      ? {diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)}
      : {})
  };

  if (entryType === EntryType.Hospital) {
    return {
      ...baseEntry,
      type: entryType,
      discharge: parseDischarge(discharge)
    };
  }

  if (entryType === EntryType.HealthCheck) {
    return {
      ...baseEntry,
      type: entryType,
      healthCheckRating: parseHealthCheckRating(healthCheckRating)
    };
  }

  if (type === EntryType.OccupationalHealthcare) {
    return {
      ...baseEntry,
      type: entryType,
      employerName: parseEmployerName(employerName),
      ...(sickLeave
        ? {sickLeave: parseSickLeave(sickLeave)}
        : {})
    };
  }

  throw new Error(`Incorrect or missing type: ${type}`);
};

const parseDescription = (description: any): string => {
  return parseString(description, `Incorrect or Missing description: ${description}`);
};

const parseSpecialist = (specialist: any): string => {
  return parseString(specialist, `Incorrect or Missing specialist, ${specialist}`);
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if(!codes || !Array.isArray(codes)) {
    throw new Error(`Incorrect or Missing diagnosis codes: ${JSON.stringify(codes)}`);
  }

  const diagnosisCodes = diagnosis.map(d => d.code);
  codes.forEach(code => {
    if (!diagnosisCodes.includes(code)) {
      throw new Error(`Incorrect diagnosis code: ${code}`);
    }
  });

  return codes as Array<Diagnosis['code']>;
};

const parseType = (type: any): EntryType => {
  if (!type || !isType(type)) {
    throw new Error(`Incorrect or Missing type: ${type}`);
  }
  
  return type;
}; 

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error(`Incorrect or missing discharge: ${JSON.stringify(discharge)}`);
  }

  const date = parseDate(discharge.date);
  const criteria = parseString(discharge.criteria, `Incorrect or Missing criteria: ${discharge.criteria}`);

  return {
    date,
    criteria
  };
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: any): string => {
  return parseString(employerName, `Incorrect or missing employer name: ${employerName}`);
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (
    !sickLeave
    || !sickLeave.startDate
    || !sickLeave.endDate
    || !isString(sickLeave.startDate)
    || !isString(sickLeave.endDate)
    || !isDate(sickLeave.startDate)
    || !isDate(sickLeave.endDate)
  ) {
    throw new Error(`Incorrect or missing sick leave: ${JSON.stringify(sickLeave)}`);
  }

  return sickLeave as SickLeave;
};

const isType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

export { toNewEntry };