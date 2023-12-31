
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/markdown', (req, res) => {
    path = `./files/${req.query.file}.md`;
    console.log(path);
    fs.readFile(`./files/${req.query.file}.md`, 'utf8', (err, data) => {
        if (err) {
            res.send(err)
            return
        };
        res.send(data);
    });
});

app.get('/json', (req, res) => {
    fs.readFile(`./files/${req.query.file}.json`, 'utf8', (err, data) => {
        if (err) {
            res.send(err)
            return
        };
        res.send(data);
    });
});

app.listen(62710, () => {
    console.log('Example app listening on port 62710!');
}
);