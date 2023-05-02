import { z } from "zod";
import { GetJsonResponse, UrlParams } from "../Domains/Api/GetJsonResponse";
import { GetMetaData } from "../Domains/Scraping/GetMetaData";
import { ReplaceInvalidChars } from "../Domains/Url/ReplaceInvalidChars";

import { AnimeLibrary, AnimeLibraryResponse } from "../Models/Api/AnimeLibrary";

export class GetDataAndSave {
  protected static async getDataAndsave(urlParams: UrlParams): Promise<void> {
    // shangriLaApiからjsonを取得
    const getJsonResponse = await GetJsonResponse.getJsonResponse(urlParams);

    // スクレイピング
    const shangriLaApiResponse = getJsonResponse.jsonPerse();

    const animeLibraryResponse = await Promise.all(
      shangriLaApiResponse.map(
        async (animeData): Promise<z.infer<typeof AnimeLibrary>> => {
          try {
            const metaData = await GetMetaData.getSuperagentResponse(
              animeData.public_url
            );
            return {
              ...animeData,
              ...{
                ogp_description: metaData.description(),
                ogp_image_url: metaData.image(),
              },
            };
          } catch (e) {
            return {
              ...animeData,
              ...{
                ogp_description: "",
                ogp_image_url: "",
              },
            };
          }
        }
      )
    );

    // titleを?などをreplaceしたものにする
    const animeLibraryResponseReplaced = animeLibraryResponse.map(
      (animeData) => {
        animeData.title = ReplaceInvalidChars.replaceInvalidChars(
          animeData.title
        );
        return animeData;
      }
    );
  }
}
