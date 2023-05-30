const fs = require('fs');
const products = require('./json/products-images.json');
const models = require('./json/model-images.json');


let mergeImages = [];
console.log(models, products)

const removePrePath = (filename) => {
    return filename.replace('Images/Style/', '')
}

models.forEach(function(item) {
    if(item.styleImage) {
        mergeImages.push(removePrePath(item.styleImage))
    } 
})

products.forEach(function(item) {
    if(item.alphaFrontImage) {
        mergeImages.push(item.alphaFrontImage)
    }
    if(item.alphaSideImage) {
        mergeImages.push(item.alphaSideImage)
    }
    if(item.alphaBackImage) {
        mergeImages.push(item.alphaBackImage)
    }
}) 

console.log(__dirname + "/json/all-images.json")

fs.writeFile(__dirname + "/json/all-images.json", JSON.stringify(mergeImages), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 