class ImagesListPlugin {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('ImagesListPlugin', (compilation, callback) => {

      let imagesArray = [];
      const pattern = new RegExp(/\.(svg|bmp|cur|gif|icns|ico|jpe?g|JPE?G|png|PNG|psd|tiff|webp|dds)$/);

      for (var filename in compilation.assets) {
        if (pattern.test(filename) && filename.indexOf('assets') !== -1) {
          imagesArray.push(`./${filename}`);
        }
      }
      let curDate = new Date().toString();
      let imageListFileData = `window.PRECACHE_IMAGES = ${JSON.stringify(imagesArray)};console.log("${curDate}")`;

      // Insert this list into the webpack build as a new file asset:
      compilation.assets['image-list.js'] = {
        source: function () {
          return imageListFileData;
        },
        size: function () {
          return imageListFileData.length;
        }
      };

      callback();
    });
  }
}

module.exports = ImagesListPlugin;