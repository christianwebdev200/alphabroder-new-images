const fs = require("fs");
const images = require('./json/all-images.json');

const sources = "C:\\images\\alpha\\source";
const destination = "C:\\images\\alpha\\destination";

let failed = [];

images.forEach(item => {
  const sourcePath = sources + '\\' + item;
  const destinationPath = destination + '\\' + item
  fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) {
      console.log('[Error] something went wrong with image ' + item);
     
      failed.push(item);
      fs.writeFile(__dirname + "/json/failed.json", JSON.stringify(failed), function(err) {
        if(err) {
            console.log("[Error] saving failed.json went wrong");
            return console.log(err);
        }
    }); 
    };
    console.log(`[Success] Image ${item} has been moved`);
  });

})

            
