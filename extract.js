const fs = require("fs").promises;
const images = require("./json/all-images.json");
const { error } = require("console");

const sources = "C:\\Users\\Administrator\\Desktop\\ALL_IMAGE_COMPILATION\\ORIGINALS\\ALPHABRODER_IMAGES";
const destination = "C:\\Users\\Administrator\\Desktop\\ALL_IMAGE_COMPILATION\\OPTIMIZED\\alphabroder-new-product";


let failed = [];
let success = 0;
let errors  = 0;

async function main() {
  
  for (let i = 0; i<images.length; i++) {
    const item = images[i].image;
    const sourcePath = sources + "\\" + item.replace("_p.jpg", ".jpg");
    const destinationPath = destination + "\\" + item;
    
    const fileExist = await fileExists(sourcePath);

    if(fileExist) {
      const result = await copyFile(sourcePath, destinationPath);
      success+= 1; 
    } else {
      failed.push(item);
      errors+= 1; 
    }
  }

  await fs.writeFile(__dirname + "/json/failed.json", JSON.stringify(failed));
  console.log(`[Final] Success = ${success} AND error = ${errors}`);
}

async function copyFile(source, destination) {
  try {
      await fs.copyFile(source, destination);
      return true;
  } catch {
      return false;
  }
}


async function fileExists(path) {  
  try {
      await fs.access(path)
      return true
  } catch {
      return false
  }
}

main();