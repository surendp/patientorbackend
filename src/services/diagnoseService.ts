import { Diagnose } from '../types';
import diagnoses from '../../data/diagnoses.json';

const getDiagnoses = (): Array<Diagnose> => {
  return (diagnoses as Array<Diagnose>);
};

export default {
  getDiagnoses
};