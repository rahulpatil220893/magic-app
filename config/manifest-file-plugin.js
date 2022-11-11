const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

class ManifestFilePlugin {
  constructor(options = {}) {
    this.options = options || {};
  }

  apply(compiler) {

    compiler.hooks.emit.tapAsync('ManifestFilePlugin', (compilation, callback) => {

      let strFileRefHREF = "";
      let objReg;
      let fileSrc = path.join(__dirname, '../', this.options.file);
      let imsManifestContent = fs.readFileSync(fileSrc, 'utf8');

      for (let filename in compilation.assets) {
        if (filename.indexOf("imsmanifest.xml") === -1 && filename.indexOf("launcher.html") === -1) {
          if (filename.indexOf("../../") === -1) {
            filename = `${this.options.config.scoId}/${filename.replace(/\\/gi, "/")}`;
          } else {
            filename = filename.replace(/\\/gi, "/").replace(`../../${this.options.config.name}/`, "");
          }

          strFileRefHREF += '<file href="' + filename + '"/>\n';
        }
      }

      objReg = /##filerefhref##/gi;
      imsManifestContent = imsManifestContent.replace(objReg, strFileRefHREF);

      objReg = /##labtitle##/gi;
      imsManifestContent = imsManifestContent.replace(objReg, this.options.config.title);

      objReg = /##labtitle##/gi;
      imsManifestContent = imsManifestContent.replace(objReg, this.options.config.title);

      objReg = /##scoid##/gi;
      imsManifestContent = imsManifestContent.replace(objReg, this.options.config.scoId);

      objReg = /##releaseversion##/gi;
      imsManifestContent = imsManifestContent.replace(objReg, this.options.config.releaseVersion);

      // Insert this list into the webpack build as a new file asset:
      compilation.assets[`../../${this.options.config.name}/imsmanifest.xml`] = {
        source: function () {
          return imsManifestContent;
        },
        size: function () {
          return imsManifestContent.length;
        }
      };

      callback();
    });

    compiler.hooks.done.tap('ManifestFilePlugin', (stats) => {
      var output = fs.createWriteStream(path.join(__dirname, '../', this.options.dir, `${this.options.config.name}.zip`));
      var archive = archiver('zip', {
        zlib: {
          level: 9
        }
      });

      output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
      });

      output.on('end', function () {
        console.log('Data has been drained');
      });

      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
        } else {
          throw err;
        }
      });

      archive.on('error', function (err) {
        throw err;
      });

      archive.pipe(output);
      archive.directory(path.join(__dirname, '../', this.options.dir, this.options.config.name), false);
      archive.finalize();
    });
  }
}

module.exports = ManifestFilePlugin;
