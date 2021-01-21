const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');
const path = require('path');
const axios = require('axios');

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const storeElem = [];
got(memeUrl)
  .then((response) => {
    const $ = cheerio.load(response.body);

    $('img').each((i, elem) => {
      if (i <= 9) {
        storeElem.push(elem.attribs.src);
      } else {
        return false;
      }
    });
    for (let index = 0; index <= 9; index++) {
      axios({
        method: 'get',
        url: storeElem[index],
        responseType: 'stream',
      }).then(function (responseT) {
        responseT.data.pipe(fs.createWriteStream(`./memes/image${index}.jpg`));
      });
    }
  })

  .catch((err) => {
    console.log(err);
  });

fs.mkdir(path.join(__dirname, 'memes'), (err) => {
  if (err) {
    return console.log('This directory already exists!!');
  } else {
    console.log('Directory created successfully!');
  }
});
