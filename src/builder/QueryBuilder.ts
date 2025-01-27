import { FilterQuery } from 'mongoose';
import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field: string) => {
          return {
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          };
        }),
      } as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const excludeFields: string[] = [
      'searchTerm',
      'sort',
      'page',
      'limit',
      'fields',
    ];
    const queryObj: Record<string, unknown> = { ...this.query };
    excludeFields.forEach((field: string) => delete queryObj[field]);

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  sort() {
    const sort: string =
      (this?.query?.sort as string)?.split(',').join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  pagination() {
    const page: number = Number(this?.query?.page) || 1;
    const limit: number = Number(this?.query?.limit) || 10;
    const skip: number = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fieldLimiting() {
    const fields = this?.query?.fields;
    if (fields) {
      const fieldsStr = (fields as string).split(',').join(' ');
      this.modelQuery = this.modelQuery.select(fieldsStr);
    }

    return this;
  }
}

export default QueryBuilder;
