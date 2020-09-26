"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exactOneFrame = void 0;
function exactOneFrame(command, inputPath, position, outputPath) {
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
exports.exactOneFrame = exactOneFrame;
//# sourceMappingURL=exactOneFrame.js.map