import { TCategoryName } from '@/entities/categoryName';
import { ICategoryNameRepositories } from '@/repositories/categoryName';

export type IFindAllOutput = TCategoryName[];

export interface IFindAllService {
  execute(): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(
    private readonly categoryNameRepositories: ICategoryNameRepositories
  ) {}

  async execute(): Promise<IFindAllOutput> {
    return this.categoryNameRepositories.findAll({});
  }
}
