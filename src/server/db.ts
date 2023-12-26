import { PrismaClient } from "@prisma/client";

import { env } from "~/env";
// Define a type that extends the globalThis with the prisma property
type CustomGlobal = typeof globalThis & {
  prisma: PrismaClient | undefined;
};

// Cast globalThis to the custom global type
const globalForPrisma = globalThis as CustomGlobal;


export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
