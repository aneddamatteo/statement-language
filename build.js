import { existsSync, mkdirSync } from "fs";
import { exec } from "node:child_process";

const folderName = "./build";

try {
  if (!existsSync(folderName)) {
    mkdirSync(folderName);
  }
  exec("npm pack --pack-destination ./dist", (err, output) => {
    console.log(output);
  });
} catch (err) {
  console.error(err);
}
