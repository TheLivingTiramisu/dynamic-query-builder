const prisma = require("./prisma/index");
console.log(prisma.buildPrismaQuery({ name_eq: "John" }));
