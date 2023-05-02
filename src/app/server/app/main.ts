import { GetAllData } from "./Usecases/GetAllData";

function main() {
  const result = GetAllData.getAllData();
  console.log(result);
}

main();
