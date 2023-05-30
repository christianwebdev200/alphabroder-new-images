const util = require('util');
const fs = require('fs');
const path = require('path');
const copyFilePromise = util.promisify(fs.copyFile);
const images = require("./json/all-images.json");

const sources = "C:\\images\\alpha\\source";
const destination = "C:\\images\\alpha\\source";

function copyFiles(srcDir, destDir, files) {
    return Promise.all(files.map(f => {
       return copyFilePromise(path.join(srcDir, f.replace("_p.jpg", ".jpg")), path.join(destDir, f));
    }));
}

// usage
copyFiles(sources, destination, images).then(() => {
   console.log("done");
}).catch(err => {
   console.log(err);
});