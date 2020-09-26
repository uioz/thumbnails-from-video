import * as FF from "fluent-ffmpeg";
import * as stream from "stream";
import { exactOneFrame } from "./exactOneFrame";
import { join } from "path";

// copy from Type definitions for node-fluent-ffmpeg 2.1
export declare function Ffmpeg(
  options?: FF.FfmpegCommandOptions
): FF.FfmpegCommand;
export declare function Ffmpeg(
  input?: string | stream.Readable,
  options?: FF.FfmpegCommandOptions
): FF.FfmpegCommand;

export async function exactFrames(
  fluentFfmpeg: typeof Ffmpeg,
  duration: number,
  inputFilePath: string,
  outputFileName: string,
  outputFolder: string,
  count: number = 10,
  extendName: string = "jpg"
) {
  // 考虑到一般的视频开头和结尾是片头和片尾
  // 所以 count 的截取范围在 5% 和 95% 之间
  const exactLength = duration * 0.9;
  const offset = Math.floor(exactLength / count);
  const result: Array<{
    inputFilePath: string;
    outputPath: string;
    fileName: string;
    outputFolder: string;
  }> = [];

  let i = 0;
  // 从 5% 的位置开始读取
  let startSecond = Math.floor(duration * 0.05);
  while (i < count) {
    const fileName = `${outputFileName}-${i}.${extendName}`;
    const outputPath = join(outputFolder, fileName);

    await exactOneFrame(
      fluentFfmpeg(),
      inputFilePath,
      startSecond + "s",
      outputPath
    );

    result.push({
      inputFilePath,
      outputPath,
      fileName,
      outputFolder,
    });

    startSecond += offset;

    i++;
  }

  return result;
}
