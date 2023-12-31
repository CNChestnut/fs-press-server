
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    fs.readFile(`./files/${req.query.file}`, 'utf8', (err, data) => {
        console.log(req.query.file);
        if (err) {
            if (err.code === 'ENOENT') {
                res.send({ "exist": false });
                return
            }
            return
        };
        res.send(data);
    });
});

app.listen(62710, () => {
    console.log('Example app listening on port 62710!');
}
);