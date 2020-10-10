import patients from '../../data/patients';
import {
  NewPatient,
  PublicPatient,
  Patient,
  Entry,
  NewEntry,
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

const addEntry = (entry: NewEntry, patientId: Patient['id']): Entry => {
  const index = patients.findIndex(p => p.id === patientId);

  if (index === -1) {
    throw new Error(`Patient with id '${patientId}' doesnot exist!!`);
  }

  const patient = patients[index];
  const id = `${Math.floor(Math.random() * 10000)}`;
  const newEntry = {
    ...entry,
    id
  };

  patient.entries.push(newEntry);
  patients[index] = patient;
  return newEntry;
};

export default {
  addPatient,
  addEntry,
  getPatients,
  getPublicPatient,
  getPatientById
};