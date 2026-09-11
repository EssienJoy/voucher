import type { Query } from 'mongoose';
import type { ParsedQs } from 'qs';
declare class ApiFeatures<DocType> {
    query: Query<DocType[], DocType>;
    queryString: ParsedQs;
    constructor(query: Query<DocType[], DocType>, queryString: ParsedQs);
    filter(): this;
    sort(): this;
    limit(): this;
    pagination(): this;
}
export default ApiFeatures;
//# sourceMappingURL=apiFeatures.d.ts.map