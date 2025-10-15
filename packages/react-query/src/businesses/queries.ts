import { BusinessActions } from "@fludge/api-utils/actions/businesses.actions";
import { queryOptions } from "@tanstack/react-query";

export class BusinessesQueriesOptions {
  constructor(private readonly businessActions: BusinessActions) {}

  findOneBusiness(businessSlug: string) {
    return queryOptions({
      queryKey: ["businesses", businessSlug],
      queryFn: async () => {
        const res = await this.businessActions.findOneBusiness(businessSlug);

        return res;
      },
    });
  }
}
