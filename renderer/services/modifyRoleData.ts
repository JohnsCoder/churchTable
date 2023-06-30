import fs from "fs";
import os from "os";
import { errors } from "../utils/erros";

const roleFilePath = `C:\\Users\\${
  os.userInfo().username
}\\.church\\roles.json`;
const jsonTemplate = '{"person":[],"function":[]}';

function addRole(role: string, name: string) {
  const rolesFile = fs.readFileSync(roleFilePath, "utf-8");
  const jsonFile = JSON.parse(rolesFile);
  let idx: number;
  if (jsonFile[role].length > 0) {
    idx = jsonFile[role].at(-1).id + 1;
  } else {
    idx = 0;
  }

  jsonFile[role].push({ id: idx, name });
  fs.writeFileSync(roleFilePath, JSON.stringify(jsonFile));
}

function getRole() {
  if (!fs.existsSync(roleFilePath)) {
    try {
      fs.writeFileSync(roleFilePath, jsonTemplate);
    } catch (err) {
      if (err.errno === errors.fs.code) {
        fs.mkdirSync(`C:\\Users\\${os.userInfo().username}\\.church\\`);
        fs.writeFileSync(roleFilePath, jsonTemplate);
      }
    }
  }

  const rolesFile = fs.readFileSync(roleFilePath, "utf-8");
  return JSON.parse(rolesFile);
}
function deleteRole(role: string, id: string) {
  const rolesFile = fs.readFileSync(roleFilePath, "utf-8");
  const jsonFile = JSON.parse(rolesFile);

  for (let i = 0; i < jsonFile[role].length; i++) {
    if (jsonFile[role][i].id === parseInt(id)) {
      jsonFile[role].splice(i, 1);
      fs.writeFileSync(roleFilePath, JSON.stringify(jsonFile));
    }
  }
}

export { addRole, getRole, deleteRole };
