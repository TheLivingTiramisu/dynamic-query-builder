# dynamic-query-builder

### Prisma query builder

#### `buildPrismaQuery` Function

The `buildPrismaQuery` function builds a Prisma query based on flat filter conditions.

### Mongoose query builder

#### `buildMongooseQuery` Function

The `buildMongooseQuery` function builds a Mongoose query based on flat filter conditions.

### TypeORM query builder

#### `buildTypeORMQuery` Function

The `buildTypeORMQuery` function builds a TypeORM query based on flat filter conditions.

### Sequelize query builder

#### `buildSequelizeQuery` Function

The `buildSequelizeQuery` function builds a Sequelize query based on flat filter conditions. Here you also need to provide `Op` object from `sequelize`.

##### Usage

This functions take an object of flat filter conditions and converts it into a ORM query object. The filter conditions are expected to be in the format of `field_condition: value`, where `field` is the name of the field to filter on and `condition` is the type of filter to apply.

##### Supported Conditions

- `lt`: Less than
- `lte`: Less than or equal to
- `gt`: Greater than
- `gte`: Greater than or equal to
- `between`: Between two values (requires an array with two values)
- `contains`: Contains a value (case-insensitive)
- `c`: Alias for `contains`
- `caseSensitiveContains`: Contains a value (case-sensitive)
- `csc`: Alias for `caseSensitiveContains`
- `ne`: Not equal to
- `eq`: Equal to
- ` `: Equal to (default condition)
- `neContains`: Does not contain a value (case-insensitive)
- `nec`: Alias for `neContains`
- `in`: In a list of values
- `nin`: Not in a list of values

##### Parameters

- `filters` (Object): The flat filter conditions.

##### Returns

- (Object): The Prisma-compatible query object.

##### Throws

- `Error`: Throws an error if the `between` filter does not receive an array with two values.

##### Example

```javascript
const filters = {
  age_gt: 30,
  name_contains: "John",
  status_in: ["active", "pending"],
};

const query = buildPrismaQuery(filters);
console.log(query);
```
