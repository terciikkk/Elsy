#!/bin/node

'use strict'
const glob = require('glob');
const fs = require('fs');
const child_process = require('child_process');

new Promise((resolve, reject) => {
  glob("gallery/*.json", {}, function(err, files) {
    if (err) {
      reject(err);
      return;
    }

    resolve(files);
  });
}).then(files =>
  Promise.all(files.map(file =>
    new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          file, data: JSON.parse(data)
        });
      });
    })
  ))
).then(files => {
  let galleryData = { data: [] };
  for (let file of files) {
    let name = file.file.match(/gallery\/([a-zA-Z0-9\(\)]+)\.json/)[1];

    galleryData.data.push({
      name,
      file: file.file,
      data: file.data
    });

    child_process.execSync(`convert "gallery/${name}.png" -resize 640 "gallery_resized/${name}.png"`);
  }

  galleryData.data.sort((a,b) => a.name - b.name);

  return new Promise((resolve, reject) => {
    fs.writeFile('src/gallery_data.js', `
const data = ${JSON.stringify(galleryData, null, 2)};
export default data;
`, 'utf8', (err) => {
      if (err) reject(err);
      else resolve();
    })
  });
}).catch(err => {
  console.error(err);
  process.exit(1);
});
