import { z } from "zod";
import { GetJsonResponse, UrlParams } from "../Domains/Api/GetJsonResponse";
import { GetMetaData } from "../Domains/Scraping/GetMetaData";

import { AnimeLibrary, AnimeLibraryResponse } from "../Models/Api/AnimeLibrary";

export class GetTargetData {
  protected static async getTargetData(
    urlParams: UrlParams
  ): Promise<z.infer<typeof AnimeLibraryResponse> | void> {
    // shangriLaApiからjsonを取得
    let getJsonResponse: GetJsonResponse;
    try {
      getJsonResponse = await GetJsonResponse.getJsonResponse(urlParams);
    } catch (e) {
      console.log(undefined);
      return;
    }

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
                year: urlParams.year,
                cool: urlParams.cool,
              },
            };
          } catch (e) {
            return {
              ...animeData,
              ...{
                ogp_description: "",
                ogp_image_url: "",
                year: urlParams.year,
                cool: urlParams.cool,
              },
            };
          }
        }
      )
    );
    console.log(animeLibraryResponse);
    return animeLibraryResponse;
  }
}
