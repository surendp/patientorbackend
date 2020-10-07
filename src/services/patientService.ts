import patients from '../../data/patients';
import {
  NewPatient,
  PublicPatient,
  Patient,
} from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatient = (): PublicPatient[] => {
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

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
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
  getPublicPatient,
  getPatientById
};