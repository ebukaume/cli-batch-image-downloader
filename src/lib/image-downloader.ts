import { WriteStream } from "fs"
import Axios from 'axios';

class ImageDownloader {
  async downloadImage(url: string, outputStream: WriteStream): Promise<void> {
    const response = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
  
    response.data.pipe(outputStream);
  
    return new Promise((resolve, reject) => {
      outputStream.on('finish', resolve)
      outputStream.on('error', reject)
    })
  }
}

export { ImageDownloader };
