import { z } from "zod";
import { UrlParams } from "../Domains/Api/GetJsonResponse";
import { ConstValues } from "../Domains/Utils/ConstValues";
import { AnimeLibraryResponse } from "../Models/AnimeLibrary";
import { GetTargetData } from "./GetTargetData";

export class GetAllData extends GetTargetData {
  constructor() {
    super();
  }

  public static async getAllData(): Promise<
    z.infer<typeof AnimeLibraryResponse>
  > {
    // すべての年とクールの情報
    const today = new Date();
    const nowYear = today.getFullYear();
    const allUrlParams: UrlParams[] = [];
    for (let year = ConstValues.startYear; year <= nowYear; year++) {
      for (let cool = 1; cool <= 4; cool++) {
        allUrlParams.push({ year: year, cool: cool } as UrlParams);
      }
    }
    const allData: z.infer<typeof AnimeLibraryResponse> = [];
    // 今年から過去の任意年までの情報をすべて取得・それぞれ保存
    for (let i = 0; i < allUrlParams.length; i++) {
      const urlParam = allUrlParams[i];
      if (urlParam === undefined) {
        throw new Error("indexを参照できませんでした。");
      }
      const animeLibraryResponse = await GetTargetData.getTargetData(urlParam);
      animeLibraryResponse === undefined
        ? null
        : allData.push(...animeLibraryResponse);
    }
    return allData;
  }
}
