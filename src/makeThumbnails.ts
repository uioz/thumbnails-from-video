import { spawn } from "cross-spawn";

export function makeThumbnails(
  fileList: Array<string>,
  outputFilePath: string,
  outputFileExt: string = "jpg",
  command: string = "gm"
) {
  return new Promise<string>((resolve, reject) => {
    const child = spawn(command, [
      "convert",
      ...fileList,
      "-append",
      `${outputFilePath}.${outputFileExt}`,
    ]);

    child.stderr.once("data", reject);

    child.once("close", (code) => {
      if (code == 0) {
        resolve(`${outputFilePath}.${outputFileExt}`);
      }
    });
  });
}
