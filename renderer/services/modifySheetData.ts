import fs from "fs";
import os from "os";
import { errors } from "../utils/erros";

const sheetFilePath = `C:\\Users\\${
  os.userInfo().username
}\\.church\\sheet.json`;
const jsonTemplate = '{"person":[],"function":[]}';

function editSheet(sheet) {
  if (!fs.existsSync(sheetFilePath)) {
    try {
      fs.writeFileSync(sheetFilePath, "");
    } catch (err) {
      if (err.errno === errors.fs.code) {
        fs.mkdirSync(`C:\\Users\\${os.userInfo().username}\\.church\\`);
        fs.writeFileSync(sheetFilePath, "");
      }
    }
  }

  fs.writeFileSync(sheetFilePath, JSON.stringify(sheet));
}

function findSheet() {
  const sheetFile = fs.readFileSync(sheetFilePath, "utf-8");

  try {
    return JSON.parse(sheetFile);
  } catch (err) {
    return;
  }
}

function deleteSheet() {
  fs.writeFileSync(sheetFilePath, "");
}

export { editSheet, findSheet, deleteSheet };
