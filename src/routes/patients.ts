import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

patientsRouter.post('/', (req, res) => {
  try {
    let newPatient = toNewPatient(req.body);
    newPatient = patientService.addPatient(newPatient);
    res.json(newPatient);
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
});

export default patientsRouter;