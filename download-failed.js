const fs = require('fs').promises;
const download = require('image-downloader');

const imageDestination = "C:\\images\\failed";
// const imageDestination = "C:\\Users\\Administrator\\Desktop\\ALL_IMAGE_COMPILATION\\OPTIMIZED\\alphabroder-new-product\failed";

(async function main() {
    const contents = await fs.readFile('./json/failed.json');
    const items = JSON.parse(contents)

    const chunks = chunk(items, 30);
    for (const chunk of chunks) {
        for (const item of chunk) {
            const filename = item['image'].replace('_p', '_z');
            const url = 'https://www.alphabroder.com/prodimg/hires/'+ filename;
            item.url = url;
            try {
                item.downloaded = true;
                
                await download.image({
                    url: url,
                    dest: `${imageDestination}\\${item['image']}`
                });
            } catch (error) {
                item.downloaded = false;
                console.log(error)                
            }
        }

        // await new Promise(r => setTimeout(r, 2000));
    }

   await fs.writeFile(__dirname + "/json/failed.json", JSON.stringify(items), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
})()



function chunk(array, chunkSize) {
    const chunks = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
    }

    return chunks;
}