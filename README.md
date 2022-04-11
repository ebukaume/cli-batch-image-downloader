<h1 align="center">Image Downloader</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ebukaume/getsafe-image-downloader#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ebukaume/getsafe-image-downloader/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ebukaume/getsafe-image-downloader/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/ebukaume/bookstore-api" />
  </a>
  <a href="https://twitter.com/ebukaume" target="_blank">
    <img alt="Twitter: ebukaume" src="https://img.shields.io/twitter/follow/ebukaume.svg?style=social" />
  </a>
</p>
<br>
<br>

## Problem Statement

Imagine you are employed at a hypothetical company called “The Big Picture Corp” where
the product department is requesting a tool to download a list of images from a plain text
file. For now there are not many requirements from product yet and you only know that they
want a simple command line tool for downloading images from a list of urls and stores them
on the local harddrive. From the product vision however, it’s already clear that having the
functionality of batch downloading images will be important to the product and is likely to
be used in several different contexts.

## Technologies

- Node.js v16+
- Nvm (optional)


## Usage

> Clone the repository to your local machine

```sh
$ git clone https://github.com/ebukaume/getsafe-image-downloader.git
```

> cd into the project directory, install dependencies, build and start

```sh
$ cd getsafe-image-downloader
$ nvm install <or use whichever means you manage your node version>
$ npm install
$ npm run build
$ npm start -- [input file] [options]
```

### Command-line Options 

```
-o or --output  Output directory. NB: If this is not provided, images will be save in [images] folder
-c or --concurrency  Number of concurrent downloads. NB: if concurrency is not provided, the script will default to 1
-p or --prefix  Prefix to append to images downloaded
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ebukaume/getsafe-image-downloader/issues).

1. Fork it (https://github.com/ebukaume/getsafe-image-downloader.git/fork)
2. Create your working branch (git checkout -b [choose-a-name])
3. Commit your changes (git commit -am 'what this commit will fix/add/improve')
4. Push to the branch (git push origin [chosen-name])
5. Create a new Pull Request

## Show your support

Give a ⭐️ if you like this project!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details

## Contact me

Want to discuss this or other projects? Feel free to send me an email: _ebukaume@gmail.com_
