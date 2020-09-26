import { FfmpegCommand } from "fluent-ffmpeg";

export function exactOneFrame(
  command: FfmpegCommand,
  inputPath: string,
  position: string,
  outputPath: string
) {
  return new Promise((resolve, reject) => {
    command
      .input(inputPath)
      .inputOption(`-ss ${position}`)
      .frames(1)
      .output(outputPath)
      .once("end", resolve)
      .once("error", reject)
      .run();
  });
}
