"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const path_1 = require("path");
const FF = require("fluent-ffmpeg");
FF.setFfmpegPath(path_1.join(__dirname, "../../bin/ffmpeg.exe"));
FF.setFfprobePath(path_1.join(__dirname, "../../bin/ffprobe.exe"));
index_1.default(path_1.join(__dirname, "../../test.mp4"), FF)
    .then((result) => {
    console.log(result);
})
    .catch((error) => {
    console.error(error);
});
//# sourceMappingURL=test.js.map