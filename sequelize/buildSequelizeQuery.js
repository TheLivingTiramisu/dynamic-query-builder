/**
 * Builds a Sequelize query based on flat filter conditions.
 * @param filters - The flat filter conditions.
 * @returns - The Sequelize-compatible query object.
 */
module.exports = buildQuery = (filters, Op) => {
  if (!Op) {
    throw new Error(`Please provide the Op object from Sequelize.`);
  }
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
          query[field] = { [Op.lt]: value };
          break;
        case "lte":
          query[field] = { [Op.lte]: value };
          break;
        case "gt":
          query[field] = { [Op.gt]: value };
          break;
        case "gte":
          query[field] = { [Op.gte]: value };
          break;
        case "between":
          if (Array.isArray(value) && value.length === 2) {
            query[field] = { [Op.between]: value };
          } else {
            throw new Error(
              "The 'between' filter requires an array with two values."
            );
          }
          break;
        case "contains":
        case "c":
          query[field] = { [Op.like]: `%${value}%` };
          break;
        case "caseSensitiveContains":
        case "csc":
          query[field] = { [Op.like]: value };
          break;
        case "ne":
          query[field] = { [Op.ne]: value };
          break;
        case "eq":
        case "":
          query[field] = value;
          break;
        case "neContains":
        case "nec":
          query[field] = { [Op.notLike]: `%${value}%` };
          break;
        case "in":
          query[field] = { [Op.in]: value };
          break;
        case "nin":
          query[field] = { [Op.notIn]: value };
          break;
        default:
          break;
      }
    }
  }

  return query;
};
