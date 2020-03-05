const fs = require('fs');

// Creates directory(ies) recursively up to end of dirPath
// @param {string} dirPath: path to create folders to
exports.createDir = dirPath => {
  fs.mkdirSync(dirPath, { recursive: true }, err => {
    if (err) {
      throw new Error(err);
    } else {
      return;
    }
  });
};