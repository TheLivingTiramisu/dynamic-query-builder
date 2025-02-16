/**
 * Builds a Prisma query based on flat filter conditions.
 * @param filters - The flat filter conditions.
 * @returns - The Prisma-compatible query object.
 */
module.exports = buildPrismaQuery = (filters) => {
  delete filters.collection;
  delete filters.limit;
  delete filters.page;
  delete filters.sort;
  const query = {};

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      const [field, condition] = key.split("_");
      const value = filters[key];

      if (!query[field]) {
        query[field] = {};
      }

      switch (condition) {
        case "lt":
          query[field].lt = value;
          break;
        case "lte":
          query[field].lte = value;
          break;
        case "gt":
          query[field].gt = value;
          break;
        case "gte":
          query[field].gte = value;
          break;
        case "between":
          if (Array.isArray(value) && value.length === 2) {
            query[field].gte = value[0];
            query[field].lte = value[1];
          } else {
            throw new Error(
              "The 'between' filter requires an array with two values."
            );
          }
          break;
        case "contains":
          query[field].contains = value;
          break;
        case "c":
          query[field].contains = value;
          break;
        case "caseSensitiveContains":
          query[field].contains = value;
          query[field].mode = "default";
          break;
        case "csc":
          query[field].contains = value;
          query[field].mode = "default";
          break;
        case "ne":
          query[field].not = value;
          break;
        case "eq":
          query[field] = value;
          break;
        case "":
          query[field] = value;
          break;
        case "neContains":
          query[field].not = { contains: value };
          break;
        case "nec":
          query[field].not = { contains: value };
          break;
        case "in":
          query[field].in = value;
          break;
        case "nin":
          query[field].notIn = value;
          break;
        default:
          break;
      }
    }
  }

  return query;
};
