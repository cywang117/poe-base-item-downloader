const baseItems = require('./data/base_items.min.json');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const { createDir } = require('./utils');

// Return an address for axios to visit
// @param {Array} urlArr: array of 2 strings denoting beginning & end of endpoint string
// @param {string} baseName: item base to be used in joining 2 strings in urlArr
// @param {string} implicitStr: item base implciit mod
// @return {string}: http wiki address containing png file of base item
const makeWikiUrl = (urlArr, baseName, implicitStr) => {
  if (baseName === 'Two-Toned Boots') {
    // Two-Toned Boots -> Two-Toned_Boots_({Element}_and_{Element}_Resistance)
    return urlArr.join(
      `${baseName}_(${implicitStr.slice(0, implicitStr.indexOf('And'))}_and_${implicitStr.slice(
        implicitStr.indexOf('And') + 3,
        implicitStr.indexOf('Resist')
      )}_Resistance)`
    );
  } else if (baseName === 'Two-Stone Ring') {
    // Two-Stone Ring -> Two-Stone_Ring_({jewel}_and_{jewel})
    let jewels = [];
    let jewelMap = {
      Fire: 'ruby',
      Cold: 'sapphire',
      Lightning: 'topaz'
    };
    Object.keys(jewelMap).forEach(el => {
      if (implicitStr.includes(el)) {
        jewels.push(jewelMap[el]);
      }
    });
    return urlArr.join(`${baseName}_(${jewels[0]}_and_${jewels[1]})`);
  } else {
    return urlArr.join(baseName.split(' ').join('_'));
  }
};

// Find the href of the <a> link on the html page which downloads the item base PNG
// @param {string} html: html of wiki page
// @param {string} baseName: item base name
// @return {string}: http string denoting location of item base PNG download
const getImageUrl = (html, baseName) => {
  const $ = cheerio.load(html);
  if ($('#global-wrapper').find('div.fullMedia p a').length > 0) {
    return $('div.fullMedia p a').attr('href');
  } else {
    throw new Error(baseName, ' : image URL not found.');
  }
};

// Downloads an image to the given dirPath
// @param {string} url: URL to download PNG from
// @param {string} imageId: unique identity of base PNG, used as name of downloaded PNG
// @param {string} dirPath: path in file system to download image to
// @return {Promise}: passes file download resolution & rejection to .catch
const downloadImage = (url, imageId, dirPath) => {
  axios({ url, method: 'GET', responseType: 'stream' }).then(res => {
    if (!fs.existsSync(dirPath)) {
      createDir(dirPath);
    }
    const writer = fs.createWriteStream(path.join(dirPath, `${imageId}.png`));
    res.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  });
};

// Filters base_items.min.json to only include bases that are released, not div cards,
// and have a unique visual identity (EX: Vaal Regalia, Destroyer Regalia, and
// Cabalist Regalia share the same visual identity (same PNG file),
// so all but one of them will be filtered out.)
// @param {Object} bases: json of all bases in the game, from base_items.min.json
// @return {Object[]}: array of filtered base data
const filterBases = (bases) => {
  let alreadyDownloadedArr = [];
  return Object.values(bases).filter(base => {
    let canBeDownloaded = !alreadyDownloadedArr.includes(base.visual_identity.id) &&
      base.release_state === 'released' &&
      base.item_class !== 'DivinationCard';
    if (canBeDownloaded) {
      alreadyDownloadedArr.push(base.visual_identity.id);
    }
    return canBeDownloaded;
  });
};

// Downloads PNG for each uniquely pictured base in base_items.min.json
// Uniqueness of base PNGs is determined by baseItems[key].visual_identity.id (see json)
const main = () => {
  console.log('Downloading base item PNGs, please wait...');

  let picUrlArr = ['https://pathofexile.gamepedia.com/File:', '_inventory_icon.png'];
  let basesToDownload = filterBases(baseItems);

  let downloadPromises = basesToDownload.map(base => {
    let dirPath = path.join(
      __dirname, 'data', 'bases',
      ...base.visual_identity.dds_file.split('/').slice(2, -1)
    );
    let wikiUrl = makeWikiUrl(picUrlArr, base.name, base.implicits[0]);

    return axios
      .get(wikiUrl)
      .then(res => {
        return getImageUrl(res.data, base.name);
      })
      .then(imageUrl => {
        return downloadImage(imageUrl, base.visual_identity.id, dirPath);
      })
      .catch(err => {
        console.error(err);
      });
  });

  Promise.all(downloadPromises).then(() => console.log('All base item downloads complete. Check your "/data" folder.'));
  return;
};

main();
