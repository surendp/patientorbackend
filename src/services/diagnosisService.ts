import { Diagnosis } from '../types';
import diagnosis from '../../data/diagnosis.json';

const getDiagnosis = (): Array<Diagnosis> => {
  return (diagnosis as Array<Diagnosis>);
};

export default {
  getDiagnosis
};