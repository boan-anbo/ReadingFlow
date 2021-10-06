var start = process.hrtime();
var PrismaClient = require('@prisma/client').PrismaClient;
var end = process.hrtime(start);
console.log("Prisma Loaded", end);
