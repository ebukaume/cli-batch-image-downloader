import { existsSync, mkdirSync } from "fs";

interface SanitizationOutput {
  validUrls: string[],
  invalidUrls: string[]
}

class Util {
  spaceSeparatedToArrayOfTexts(text: string): string[] {
    return text.split(' ').map(entry => entry.trim());
  }

  sanitizeUrl(urls: string[]): SanitizationOutput {
    return urls.reduce((acc, url) => {
      if(this.isValidURL(url)) {
        acc.validUrls.push(url);
      } else {
        acc.invalidUrls.push(url)
      }
      return acc;
    }, { validUrls: [], invalidUrls: [] } as SanitizationOutput)
  }
  
  prepareOutputDirectory(path: string): void {
    if (!existsSync(path)) {
      mkdirSync(path)
    }
  }

  private isValidURL(path: string): boolean {
    try {
      new URL(path);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export { Util };
