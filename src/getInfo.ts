import * as FF from "fluent-ffmpeg";

export function getInfo(ffprobe: typeof FF.ffprobe, inputPath: string) {
  return new Promise<FF.FfprobeData>((resolve, reject) => {
    ffprobe(inputPath, (err, metaData) => {
      if (err) {
        return reject(err);
      }

      return resolve(metaData);
    });
  });
}
