import { TPatient } from '@/entities/patient';
import { IPatientRepositories } from '@/repositories/patient';

export interface IFindAllInput {
  userId: string;
}

export type IFindAllOutput = TPatient[];

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(private readonly patientRepositories: IPatientRepositories) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    const { userId } = findAllInput;

    const patients = await this.patientRepositories.findAll({
      where: {
        userId,
      },
    });

    return patients;
  }
}
