"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImage = void 0;
const remove_background_1 = require("./remove-background");
const upload_buffer_to_s3_1 = require("./upload-buffer-to-s3");
function convertImage(base64, key, remove) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let imageBuffer = Buffer.from(base64, 'base64'); // Convert base64 to buffer
            if (remove) {
                imageBuffer = yield (0, remove_background_1.removeBackground)(imageBuffer); // Remove background from the image buffer and replace the original buffer
            }
            const upload = yield (0, upload_buffer_to_s3_1.uploadBufferToS3)(imageBuffer, key); // Upload the processed/original image buffer to S3
            if (upload.$metadata.httpStatusCode !== 200) {
                throw new Error('Upload failed');
            }
            return key;
        }
        catch (error) {
            console.error('Error converting base64:', error);
            throw error;
        }
    });
}
exports.convertImage = convertImage;
