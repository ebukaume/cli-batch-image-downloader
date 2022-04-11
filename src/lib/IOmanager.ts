import { createWriteStream, WriteStream } from "fs";
import { readFile } from "fs/promises";

class IOManager {
  async readTextFile(path: string): Promise<string> {
    return await readFile(path, { encoding: 'utf-8' });
  }

  streamWriter(filename: string): WriteStream {
    return createWriteStream(`${filename}.jpg`)
  }
}

export { IOManager }
