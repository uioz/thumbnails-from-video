export { exactFrames } from "./exactFrames";
export { exactOneFrame } from "./exactOneFrame";
export { makeThumbnails } from "./makeThumbnails";
export { getInfo } from "./getInfo";
import { exactFrames, Ffmpeg } from "./exactFrames";
import { makeThumbnails } from "./makeThumbnails";
import { getInfo } from "./getInfo";
import * as FF from "fluent-ffmpeg";
import * as path from "path";
import { join } from "path";

interface options {
  ouputFolder?: string;
  screenshotName?: string;
  thumbnailName?: string;
  /**
   * default: 10
   */
  screenshotCount?: number;
  /**
   * default: jpg
   */
  screenshotExt?: string;
  /**
   * default: jpg
   */
  thumbnailExt?: string;
}

function IsFprobeData(data: any): data is FF.FfprobeData {
  if (data.format && data.streams) {
    return true;
  }

  return false;
}

export default async function createThumbnail(
  videoPath: string,
  ffmpeg: typeof Ffmpeg,
  option: options = {}
) {
  const info = await getInfo(FF.ffprobe, videoPath);

  if (!IsFprobeData(info)) {
    throw new Error("reading metaData form file failed.");
  }

  // input /a/b/c/test.mp4 => output => /a/b/c
  const ouputFolder = option.ouputFolder || path.join(videoPath, "../");
  // input /a/b/c/test.mp4 => output test.png
  const screenshotName = option.screenshotName || path.parse(videoPath).name;

  const screenshots = await exactFrames(
    ffmpeg,
    info.format.duration,
    videoPath,
    screenshotName,
    ouputFolder,
    option.screenshotCount,
    option.screenshotExt
  );

  const thumbnailOutputPath = join(
    ouputFolder,
    option.thumbnailName || `${screenshotName}-thumbnail`
  );

  const thumbnailPath = await makeThumbnails(
    screenshots.map((item) => item.outputPath),
    thumbnailOutputPath,
    option.thumbnailExt
  );

  return {
    thumbnailPath,
    screenshots,
  };
}
