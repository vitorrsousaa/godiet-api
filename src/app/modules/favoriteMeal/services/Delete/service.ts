import * as z from 'zod';

export const DeleteServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type TDelete = z.infer<typeof DeleteServiceSchema>;

export type IDeleteInput = TDelete;

export interface IDeleteOutput {
  name: string;
}

export interface IDeleteService {
  execute(deleteInput: IDeleteInput): Promise<IDeleteOutput>;
}

export class DeleteService implements IDeleteService {
  constructor() {}

  async execute(deleteInput: IDeleteInput): Promise<IDeleteOutput> {
    return {
      name: deleteInput.name,
    };
  }
}
