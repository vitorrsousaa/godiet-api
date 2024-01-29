import { prisma } from '@/database';
import { PatientRepositories } from '@/repositories/patient';

export function makeRepositoryPatient() {
  return new PatientRepositories(prisma);
}
