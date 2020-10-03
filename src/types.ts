interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

type NonSensitivePatientInfo = Omit<Patient, 'ssn'>;
type NewPatient = Omit<Patient, 'id'>;

export {
  Diagnose,
  Gender,
  Patient,
  NewPatient,
  NonSensitivePatientInfo
};