"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = exports.makeThumbnails = exports.exactOneFrame = exports.exactFrames = void 0;
var exactFrames_1 = require("./exactFrames");
Object.defineProperty(exports, "exactFrames", { enumerable: true, get: function () { return exactFrames_1.exactFrames; } });
var exactOneFrame_1 = require("./exactOneFrame");
Object.defineProperty(exports, "exactOneFrame", { enumerable: true, get: function () { return exactOneFrame_1.exactOneFrame; } });
var makeThumbnails_1 = require("./makeThumbnails");
Object.defineProperty(exports, "makeThumbnails", { enumerable: true, get: function () { return makeThumbnails_1.makeThumbnails; } });
var getInfo_1 = require("./getInfo");
Object.defineProperty(exports, "getInfo", { enumerable: true, get: function () { return getInfo_1.getInfo; } });
const exactFrames_2 = require("./exactFrames");
const makeThumbnails_2 = require("./makeThumbnails");
const getInfo_2 = require("./getInfo");
const FF = require("fluent-ffmpeg");
const path = require("path");
const path_1 = require("path");
function IsFprobeData(data) {
    if (data.format && data.streams) {
        return true;
    }
    return false;
}
async function createThumbnail(videoPath, ffmpeg, option = {}) {
    const info = await getInfo_2.getInfo(FF.ffprobe, videoPath);
    if (!IsFprobeData(info)) {
        throw new Error("reading metaData form file failed.");
    }
    const ouputFolder = option.ouputFolder || path.join(videoPath, "../");
    const screenshotName = option.screenshotName || path.parse(videoPath).name;
    const screenshots = await exactFrames_2.exactFrames(ffmpeg, info.format.duration, videoPath, screenshotName, ouputFolder, option.screenshotCount, option.screenshotExt);
    const thumbnailOutputPath = path_1.join(ouputFolder, option.thumbnailName || `${screenshotName}-thumbnail`);
    const thumbnailPath = await makeThumbnails_2.makeThumbnails(screenshots.map((item) => item.outputPath), thumbnailOutputPath, option.thumbnailExt);
    return {
        thumbnailPath,
        screenshots,
    };
}
exports.default = createThumbnail;
//# sourceMappingURL=index.js.map