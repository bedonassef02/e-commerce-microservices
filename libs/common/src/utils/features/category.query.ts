import { Expose } from 'class-transformer';
import { QueryFeature } from '@app/common/utils/features/query.feature';
import { IsMongoId, IsOptional } from 'class-validator';
import { CategoryFilter } from '@app/common/utils/types/category/category-filter.type';

export class CategoryQuery extends QueryFeature {
  @Expose({ name: 'skip' })
  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  fields: string = 'name description parent';

  @IsOptional()
  @IsMongoId()
  parent: string;

  @Expose({ name: 'searchQuery' })
  get searchQuery(): any {
    return [
      {
        name: { $regex: this.search, $options: 'i' },
        description: { $regex: this.search, $options: 'i' },
      },
    ];
  }

  filter: CategoryFilter;
}
