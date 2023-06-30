import fs from "fs";
import os from "os";
import { errors } from "../utils/erros";

const dateFilePath = `C:\\Users\\${os.userInfo().username}\\.church\\date.csv`;
const year = new Date().getFullYear();
const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
function toStringMonth(month: string) {
  const intMonth = parseInt(month);
  return new Date(
    `${year}-${(intMonth + 1 === 13 ? 1 : intMonth + 1)
      .toString()
      .padStart(2, "0")}`
  )
    .toLocaleDateString("pt-BR", { month: "short" })
    .split(".")[0];
}

const txtTemplate = `${month}, ${toStringMonth(month)}, ${year}`;

function editDate(date: string[]) {
  fs.writeFileSync(dateFilePath, date.join());
}

function findDate() {
  if (!fs.existsSync(dateFilePath)) {
    try {
      fs.writeFileSync(dateFilePath, txtTemplate);
    } catch (err) {
      if (err.errno === errors.fs.code) {
        fs.mkdirSync(`C:\\Users\\${os.userInfo().username}\\.church\\`);
        fs.writeFileSync(dateFilePath, txtTemplate);
      }
    }
  }

  const dateFile = fs.readFileSync(dateFilePath, "utf-8");
  return dateFile.toString();
}

export { editDate, findDate };
