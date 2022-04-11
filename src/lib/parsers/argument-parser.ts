import { chunk } from 'lodash';
import { join } from 'path';

interface Options {
  outputDir?: string,
  concurrency?: number,
  prefix?: string,
}

interface Defaults extends Options {
  rootDir: string,
  prefixFilesWithTime?: boolean,
}

interface Arguments {
  inputFile: string,
  options: Options,
}

const map: Record<string, keyof Options> = {
  '-o': 'outputDir',
  '-c': 'concurrency',
  '-p': 'prefix',
  '--output=': 'outputDir',
  '-concurrency=': 'concurrency',
  '-prefix=': 'prefix',
}

class ArgumentParser {
  constructor(private defaults: Defaults) {}

  fromStandardInput(args: string[]): Arguments {
    const [inputFile, ...options] = args;

    return { inputFile, options: this.parserOptions(options) }
  }

  private parserOptions(options: string[]): Options {
    const defaultValues: Record<string, string | number> = {
      outputDir: this.getAbsolutePath(''),
    };
    const runTime = this.getRunTime();

    if(this.defaults?.concurrency) {
      defaultValues.concurrency = this.defaults.concurrency
    }

    if(this.defaults?.prefix) {
      defaultValues.prefix = this.defaults.prefix
    }

    if(this.defaults?.outputDir) {
      defaultValues.outputDir = this.getAbsolutePath(this.defaults.outputDir);
    }

    return chunk(options, 2).reduce((acc, [flag, value]) => {
      const option = map[flag];

      if(!option) throw new Error(`Unknown option ${option}`);

      acc[option] = option === 'concurrency' ? this.ensureValueIsInteger(value) : value;

      if(option === 'concurrency') {
        acc[option] = this.ensureValueIsInteger(value);
      } else if(option === 'outputDir') {
        acc[option] = this.getAbsolutePath(value);
      } else if(option === 'prefix') {
        acc[option] = this.defaults.prefixFilesWithTime ? `${runTime}_${value}_` : `${value}_`;
      } else {
        acc[option] = value;
      }

      return acc;
    }, defaultValues);
  }

  private ensureValueIsInteger(value: string): number {
    const int = parseInt(value);
    
    if(isNaN(int)) {
      throw new Error(`Expected a number but got ${value}`)
    }

    return int;
  }

  private getAbsolutePath(path: string): string {
    return join(this.defaults.rootDir, path)
  }

  private getRunTime(): string {
    return (new Date()).toISOString().slice(0,16).replace(':','-');
  }
}

export { ArgumentParser }
