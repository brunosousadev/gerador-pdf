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
    const stream = doc.pipe(new Base64Encode());
    doc.pipe(fs.createWriteStream(__dirname + '/output.pdf'));


    // TOPO
    doc.rect(0, 0, 700, 20).fill('blue');




    // RODAPÉ
    doc.rect(0, 760, 700, 20).fill('blue');


    doc.fillColor('red')
        .text("RELATÓRIO DO REGISTRO DE VISITAS", {
            fontSize: 50,
            align: 'center',
        });


    doc.end();
   
    stream.on('data', function (chunk) {
        response += chunk;
    });

    res.set('Content-Type', 'application/pdf');

    stream.on('end', function () {
        res.status(200).json(response);
    });
   
    res.status(200).send("Funcinou");
});

app.listen(3000);
