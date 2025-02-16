/**
 * Builds a Mongoose query based on flat filter conditions.
 * @param filters - The flat filter conditions.
 * @returns - The Mongoose-compatible query object.
 */
module.exports = buildQuery = (filters) => {
  delete filters.limit;
  delete filters.page;
  delete filters.sort;
  const query = {};

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      const [field, condition] = key.split("_");
      const value = filters[key];

      switch (condition) {
        case "lt":
          query[field] = { $lt: value };
          break;
        case "lte":
          query[field] = { $lte: value };
          break;
        case "gt":
          query[field] = { $gt: value };
          break;
        case "gte":
          query[field] = { $gte: value };
          break;
        case "between":
          if (Array.isArray(value) && value.length === 2) {
            query[field] = { $gte: value[0], $lte: value[1] };
          } else {
            throw new Error(
              "The 'between' filter requires an array with two values."
            );
          }
          break;
        case "contains":
        case "c":
          query[field] = { $regex: value, $options: "i" };
          break;
        case "caseSensitiveContains":
        case "csc":
          query[field] = { $regex: value };
          break;
        case "ne":
          query[field] = { $ne: value };
          break;
        case "eq":
        case "":
          query[field] = value;
          break;
        case "neContains":
        case "nec":
          query[field] = { $not: { $regex: value, $options: "i" } };
          break;
        case "in":
          query[field] = { $in: value };
          break;
        case "nin":
          query[field] = { $nin: value };
          break;
        default:
          break;
      }
    }
  }

  return query;
};
