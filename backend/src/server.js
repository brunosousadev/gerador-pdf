const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { Base64Encode } = require('base64-stream');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Olá Mundo');
});

app.get('/pdf', (req, res) => {
    const doc = new PDFDocument({ pdfVersion: '1.7' });
    let response = '';
    doc.pipe(fs.createWriteStream('output.pdf'));
    const stream = doc.pipe(new Base64Encode());
    doc.end();

    stream.on('data', function (chunk) {
        response += chunk;
    });
    res.set('Content-Type', 'application/pdf');

    stream.on('end', function () {
        res.status(200).json(response);
    });
});

pp.listen(3333);