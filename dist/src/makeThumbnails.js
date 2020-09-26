"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeThumbnails = void 0;
const cross_spawn_1 = require("cross-spawn");
function makeThumbnails(fileList, outputFilePath, outputFileExt = "jpg", command = "gm") {
    return new Promise((resolve, reject) => {
        const child = cross_spawn_1.spawn(command, [
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
exports.makeThumbnails = makeThumbnails;
//# sourceMappingURL=makeThumbnails.js.map