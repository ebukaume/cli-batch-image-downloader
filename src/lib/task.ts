import { WriteStream } from "fs";
import { join } from "path";
import { chunk } from "lodash";
import { ImageDownloader } from "./image-downloader";

interface TaskOption {
  urls: string[],
  outputDir: string,
  concurrency?: number,
  prefix?: string,
}

class Task {
  constructor(
    private imageDownloader: ImageDownloader,
    private outPutStreamCreator: (name: string) => WriteStream,
    private taskOption: TaskOption,
  ) {}

  async start(): Promise<void> {
    let counter = 0;
    const batches = chunk(this.taskOption.urls, this.taskOption.concurrency);
    
    for(const batch in batches) {
      await Promise.all(
        batches[batch].map((url, index) => this.imageDownloader.downloadImage(url, this.outPutStreamCreator(this.filename(batch, index))))
      );
      counter += batches[batch].length;

      console.log(`Processed ${counter} tasks so far...`);
    }
    console.log(`Processed ${counter} in total!`);
  }

  private filename(group: string, value: string | number): string {
    return join(this.taskOption.outputDir, `${this.taskOption.prefix || ''}${group}_${value}`);
  }
}

export { Task }
