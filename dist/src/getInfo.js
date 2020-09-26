"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
function getInfo(ffprobe, inputPath) {
    return new Promise((resolve, reject) => {
        ffprobe(inputPath, (err, metaData) => {
            if (err) {
                return reject(err);
            }
            return resolve(metaData);
        });
    });
}
exports.getInfo = getInfo;
//# sourceMappingURL=getInfo.js.map