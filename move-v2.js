const util = require('util');
const fs = require('fs');
const path = require('path');
const copyFilePromise = util.promisify(fs.copyFile);
const images = require("./json/all-images.json");

const sources = "C:\\Users\\Administrator\\Desktop\\ALL_IMAGE_COMPILATION\\ORIGINALS\\ALPHABRODER_IMAGES";
const destination = "C:\\Users\\Administrator\\Desktop\\ALL_IMAGE_COMPILATION\\OPTIMIZED\\alphabroder-new-product";

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


