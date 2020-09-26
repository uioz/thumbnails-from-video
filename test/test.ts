import createThumbnail from "../src/index";
import { join } from "path";
import * as FF from "fluent-ffmpeg";

FF.setFfmpegPath(join(__dirname, "../../bin/ffmpeg.exe"));
FF.setFfprobePath(join(__dirname, "../../bin/ffprobe.exe"));

createThumbnail(join(__dirname, "../../test.mp4"), FF)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
