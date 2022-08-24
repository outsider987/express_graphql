const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//回傳帶有prisma鍵值的物件作為context
export function createContext() {
  return { prisma };
}

