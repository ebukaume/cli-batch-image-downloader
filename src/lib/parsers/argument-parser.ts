import { chunk } from 'lodash';
import { join } from 'path';

interface Options {
  outputDir?: string,
  concurency?: number,
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
  '-c': 'concurency',
  '-p': 'prefix',
  '--output=': 'outputDir',
  '-concurency=': 'concurency',
  '-prefix=': 'prefix',
}

class ArgumentParser {
  constructor(private defaults: Defaults) {}

  fromStandardInput(args: string[]): Arguments {
    const [inputFile, ...options] = args;

    return { inputFile, options: this.parserOptions(options) }
  }

  private parserOptions(options: string[]): Options {
    const defaultValues: Record<string, string | number> = {};
    const runTime = this.getRunTime();

    if(this.defaults?.concurency) {
      defaultValues.concurency = this.defaults.concurency
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

      acc[option] = option === 'concurency' ? this.ensureValueIsInteger(value) : value;

      if(option === 'concurency') {
        acc[option] = this.ensureValueIsInteger(value);
      } else if(option === 'outputDir') {
        acc[option] = this.getAbsolutePath(value);
      } else if(option === 'prefix') {
        acc[option] = this.defaults.prefixFilesWithTime ? `${runTime}_${value}_` : `${value}_`;
      } else {
        acc[option] = value;
      }

      return acc;
    }, {} as Record<string, string | number>);
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
