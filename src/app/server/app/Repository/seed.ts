import { prisma } from "./prisma/prisma";
import { GetAllData } from "../Usecases/GetAllData";

async function main() {
  const animeList = await GetAllData.getAllData();
  console.log("DBテーブル削除");
  prisma.anime.deleteMany();
  console.log("DBデータ挿入");
  console.log("DB挿入");
  animeList.map(async (anime) => {
    const res = await prisma.anime.create({
      data: {
        ...anime,
      },
    });
    console.log(
      `https://api.moemoe.tokyo/anime/v1/master/${anime.year}/${anime.cool}`
    );
    console.log(res);
  });
  console.log("正常に終了🎉🎉");
}

main();
