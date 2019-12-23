const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');
const express = require('express')
const uuidv1 = require('uuid/v1');

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/ss', (req, res) => {
    const worker = createWorker();
    let buff = Buffer.from(req.body.base64, 'base64');
    let guid = uuidv1();
    let path = './temp/' + guid + '.png'
    Jimp.read(buff)
    .then(image => {
        var img = image
        .quality(100) // set JPEG quality
        .greyscale() // set greyscale
        .invert()
        .write(path); // save

        (async () => {
            
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');


            const { data: { text } } = await worker.recognize(path);
            console.log(text)
            await worker.terminate();
        })();
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))