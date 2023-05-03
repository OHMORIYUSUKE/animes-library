import { prisma } from "./prisma/prisma";
import { GetAllData } from "../Usecases/GetAllData";

async function main() {
  const animeList = await GetAllData.getAllData();
  console.log("DBテーブル削除");
  prisma.anime.deleteMany();
  console.log("DBデータ挿入");
  console.log("DB挿入");
  animeList.map((anime) => {
    prisma.anime.create({
      data: {
        ...anime,
      },
    });
    console.log(
      `https://api.moemoe.tokyo/anime/v1/master/${anime.year}/${anime.cool}`
    );
    console.log(anime);
  });
  console.log("正常に終了🎉🎉");
}

main();
