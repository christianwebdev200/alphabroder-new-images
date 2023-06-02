const fs = require('fs');
const products = require('./json/products-images.json');
const models = require('./json/model-images.json');


let mergeImages = [];
let emptyImages = [];

const removePrePath = (filename) => {
    return filename.replace('Images/Style/', '')
}

models.forEach(function(item) {
    if(item.styleImage) {
        mergeImages.push({...item, image: removePrePath(item.styleImage), type:"model"})
    } else {
        emptyImages.push(item);
    }
})

products.forEach(function({alphaFrontImage ,alphaBackImage, alphaSideImage, styleID, styleName, gtin, colorName}) {
    const info = {
        gtin,
        styleID,
        styleName,
        colorName
    }
    
    if(alphaFrontImage) {
        
        mergeImages.push({...info, image: alphaFrontImage, type: 'front '})
    } else {
        info.alphaFrontImage = alphaFrontImage;
    }
    if(alphaSideImage) {
        mergeImages.push({...info, image: alphaSideImage, type: 'side '})
    } else {
        info.alphaSideImage = alphaSideImage;
    }
    if(alphaBackImage) {
        mergeImages.push({...info, image: alphaBackImage, type: 'side '})
    } else {
        info.alphaBackImage = alphaBackImage;
    }

    if(info.alphaBackImage || info.alphaSideImage || info.alphaFrontImage) {
        emptyImages.push(info);
    }
}) 

console.log(__dirname + "/json/all-images.json")

fs.writeFile(__dirname + "/json/all-images.json", JSON.stringify(mergeImages), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 


fs.writeFile(__dirname + "/json/empty-images.json", JSON.stringify(emptyImages), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 