import { z } from "zod";
import { ShangriLa } from "./ShangriLa";

const AnimeLibraryAdd = z.object({
  // 追加データ
  ogp_image_url: z.union([z.string().url().startsWith("https://"), z.string()]),
  ogp_description: z.string(),
  year: z.number(),
  cool: z.number().min(1).max(4),
});

// このアプリケーションのapiレスポンス
export const AnimeLibrary = ShangriLa.merge(AnimeLibraryAdd);

// このアプリケーションのapiレスポンス全体
export const AnimeLibraryResponse = z.array(AnimeLibrary);
