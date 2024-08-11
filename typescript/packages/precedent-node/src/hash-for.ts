import crypto from "node:crypto";
import fs from "node:fs";

export class HashFor {
  static file(fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const hash = crypto.createHash("sha256");
      const stream = fs.createReadStream(fileName);

      stream.on("data", (chunk) => {
        hash.update(chunk);
      });

      stream.on("end", () => {
        resolve(hash.digest("hex"));
      });

      stream.on("error", (err) => {
        reject(err);
      });
    });
  }

  static buffer(buffer: Buffer): string {
    const hash = crypto.createHash("sha256");
    hash.update(buffer);
    return hash.digest("hex");
  }
}
