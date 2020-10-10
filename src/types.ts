interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

type Entry = HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

enum EntryType {
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare'
}

type NewPatient = Omit<Patient, 'id'>;
type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
type NewEntry = Omit<HealthCheckEntry, 'id'>
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>;

export {
  Diagnosis,
  Discharge,
  Entry,
  EntryType,
  Gender,
  HealthCheckRating,
  NewPatient,
  NewEntry,
  Patient,
  PublicPatient,
  SickLeave,
};