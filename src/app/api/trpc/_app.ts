import { z } from "zod";
import { procedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { AnimeLibrary } from "@/app/server/app/Models/AnimeLibrary";
import { prisma } from "@/app/server/app/Repository/prisma/prisma";

const getAnimeListParam = z.object({
  title: z.string().nullable(), // ショートタイトル検索も可能にするToDo
  year: z.number().nullable(),
  cool: z.enum(["Spring", "Summer", "Autumn", "Winter"]).nullable(),
  sex: z.enum(["Man", "Woman"]).nullable(),
  productCompanies: z.string().nullable(),
});
export const appRouter = router({
  getAnimeList: procedure.input(getAnimeListParam).query(async (opts) => {
    const animeList = await prisma.anime.findMany({
      where: {
        title: {
          contains: opts.input.title ? opts.input.title : "",
        },
      },
    });
    console.log(animeList);
    return animeList;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
