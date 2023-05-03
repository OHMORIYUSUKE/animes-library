import { z } from "zod";
import { procedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { AnimeLibrary } from "@/app/server/app/Models/AnimeLibrary";
import { prisma } from "@/app/server/app/Repository/prisma/prisma";

export const appRouter = router({
  getAnimeList: procedure.input(AnimeLibrary.nullable()).query(async (opts) => {
    const animeList = await prisma.anime.findMany();
    console.log(animeList);
    return animeList;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
