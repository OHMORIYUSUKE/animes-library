import { z } from "zod";
import { procedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { AnimeLibrary } from "@/app/server/app/Models/AnimeLibrary";
import { prisma } from "@/app/server/app/Repository/prisma/prisma";

const getAnimeListParam = z.object({
  title: z.string().nullable(),
  year: z.array(z.number()).nullable(),
  cool: z.array(z.number()).nullable(),
  sex: z.array(z.number()).nullable(),
  productCompanies: z.array(z.string()).nullable(),
});
export const appRouter = router({
  getAnimeList: procedure.input(getAnimeListParam).query(async (opts) => {
    const allAnimeList = await prisma.anime.findMany();
    const animeList = await prisma.anime.findMany({
      where: {
        year: {
          in: opts.input.year
            ? opts.input.year
            : allAnimeList.map((data) => {
                return data.year;
              }),
        },
        cool: {
          in: opts.input.cool
            ? opts.input.cool
            : allAnimeList.map((data) => {
                return data.cool;
              }),
        },
        sex: {
          in: opts.input.sex
            ? opts.input.sex
            : allAnimeList.map((data) => {
                return data.sex;
              }),
        },
        title: {
          contains: opts.input.title ? opts.input.title : "",
        },
      },
    });
    return animeList;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
