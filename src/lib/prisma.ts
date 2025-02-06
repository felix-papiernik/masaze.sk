import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

type ModelNames = Prisma.ModelName; // "User" | "Post"

export type PrismaModels = {
  [M in ModelNames]: Exclude<
    Awaited<ReturnType<PrismaClient[Uncapitalize<M>]["findUnique"]>>,
    null
  >;
};