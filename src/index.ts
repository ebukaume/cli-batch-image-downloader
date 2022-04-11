import { join } from 'path';
import { ImageDownloader } from './lib/image-downloader';
import { IOManager } from './lib/IOmanager';
import { ArgumentParser } from './lib/parsers/argument-parser';
import { Task } from './lib/task';
import { Util } from './lib/util';

const DEFAULT_OUTPUT_DIR = 'images';
const DEFAUTL_CONCURRENCY = 1;
const PROJECT_DIR = join(__dirname, '..');

async function run(): Promise<void> {
  const argumentParser = new ArgumentParser({
    rootDir: PROJECT_DIR,
    outputDir: DEFAULT_OUTPUT_DIR,
    concurrency: DEFAUTL_CONCURRENCY,
  });
  const ioManager = new IOManager();
  const imageDownloader = new ImageDownloader();
  const util = new Util();
  
  const { inputFile, options } = argumentParser.fromStandardInput(process.argv.slice(2));
  const rawInput = await ioManager.readTextFile(inputFile);
  const imageUrls = util.spaceSeparatedToArrayOfTexts(rawInput);
  const { validUrls, invalidUrls } = util.sanitizeUrl(imageUrls);
  console.log({ options })
  util.prepareOutputDirectory(options.outputDir!);
  
  console.warn(`You have ${invalidUrls.length} malformed image urls`)

  const task = new Task(imageDownloader, ioManager.streamWriter.bind(ioManager), {
    urls: validUrls,
    outputDir: options.outputDir!,
    prefix: options.prefix,
    concurrency: options.concurrency,
  });

  await task.start();
}

run()
  .catch(console.error);
