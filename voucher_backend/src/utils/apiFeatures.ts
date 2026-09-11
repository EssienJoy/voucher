import type { Query } from 'mongoose';
import type { ParsedQs } from 'qs';

class ApiFeatures<DocType> {
  query: Query<DocType[], DocType>;
  queryString: ParsedQs;

  constructor(query: Query<DocType[], DocType>, queryString: ParsedQs) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1. Basic filtering
    const queryObj: ParsedQs = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. Advanced filtering (for gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (typeof this.queryString.sort === 'string') {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    // field limiting
    if (typeof this.queryString.fields === 'string') {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    // pagination
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default ApiFeatures;
