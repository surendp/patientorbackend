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
  gender: string;
  occupation: string;
}

type NonSensitivePatientInfo = Omit<Patient, 'ssn'>;

export {
  Diagnose,
  Patient,
  NonSensitivePatientInfo
};