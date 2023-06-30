import fs from "fs";
import os from "os";
import { errors } from "../utils/erros";

const sheetFilePath = `C:\\Users\\${
  os.userInfo().username
}\\.church\\sheet.json`;
const jsonTemplate = '[]';

function editSheet(sheet) {
  if (!fs.existsSync(sheetFilePath)) {
    try {
      fs.writeFileSync(sheetFilePath, jsonTemplate);
    } catch (err) {
      if (err.errno === errors.fs.code) {
        fs.mkdirSync(`C:\\Users\\${os.userInfo().username}\\.church\\`);
        fs.writeFileSync(sheetFilePath, jsonTemplate);
      }
    }
  }

  fs.writeFileSync(sheetFilePath, JSON.stringify(sheet));
}

function findSheet() {
  if (!fs.existsSync(sheetFilePath)) {
    try {
      fs.writeFileSync(sheetFilePath, jsonTemplate);
    } catch (err) {
      if (err.errno === errors.fs.code) {
        fs.mkdirSync(`C:\\Users\\${os.userInfo().username}\\.church\\`);
        fs.writeFileSync(sheetFilePath, jsonTemplate);
      }
    }
  }
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
