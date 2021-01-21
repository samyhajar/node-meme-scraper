const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');
const path = require('path');
const request = require('request');

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
    return console.log('This directory already exists');
  } else {
    console.log('Directory created successfully!');
  }
});

const download = function (url, filename, callback) {
  request.head(url, function (err, res) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300',
  './memes/meme1.jpg',
  function () {
    console.log('done');
  },
);

download(
  "https://api.memegen.link/images/rollsafe/can't_get_fired/if_you_don't_have_a_job.jpg?width=300",
  './memes/meme2.jpg',
  function () {
    console.log('done');
  },
);
/*const fileMeme = fs.createWriteStream('./memes/file1.JPEG');
const request = http.get(
  'http://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300',
  function (response) {
    response.pipe(fileMeme);
    file.on('finish', function () {
      file.close(cb);
    });
  },
);
*/
