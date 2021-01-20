const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');
const path = require('path');

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const storeElem = [];

got(memeUrl)
  .then((response) => {
    const $ = cheerio.load(response.body);

    $('img').each((i, elem) => {
      if (i < 9) {
        storeElem.push(elem.attribs.src);
      } else {
        return false;
      }
    });
    console.log(storeElem);
  })

  .catch((err) => {
    console.log(err);
  });

fs.mkdir(path.join(__dirname, 'memes'), (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});
