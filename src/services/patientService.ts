import patients from '../../data/patients';
import {
  NewPatient,
  NonSensitivePatientInfo,
  Patient,
} from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientInfo[] => {
  return patients.map(({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = `${Math.floor(Math.random() * 10000)}`;
  const newPatient = {
    ...patient,
    id
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  addPatient,
  getPatients,
  getNonSensitivePatients
};