"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exactFrames = void 0;
const exactOneFrame_1 = require("./exactOneFrame");
const path_1 = require("path");
async function exactFrames(fluentFfmpeg, duration, inputFilePath, outputFileName, outputFolder, count = 10, extendName = "jpg") {
    const exactLength = duration * 0.9;
    const offset = Math.floor(exactLength / count);
    const result = [];
    let i = 0;
    let startSecond = Math.floor(duration * 0.05);
    while (i < count) {
        const fileName = `${outputFileName}-${i}.${extendName}`;
        const outputPath = path_1.join(outputFolder, fileName);
        await exactOneFrame_1.exactOneFrame(fluentFfmpeg(), inputFilePath, startSecond + "s", outputPath);
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
exports.exactFrames = exactFrames;
//# sourceMappingURL=exactFrames.js.map