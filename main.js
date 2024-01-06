
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const server_config = require('./config/server.json');

app.use(cors());

app.get('/', (req, res) => {
    if(req.query.language){
        if(server_config.i18n){
        path = `./files/${req.query.language}/${req.query.file}`
        }
        else{
            res.send({ "i18n": false });
        }
    }
    else{
        path = `./files/${req.query.file}`
    }
    fs.readFile(path, 'utf8', (err, data) => {
        console.log(req.query);
        if (err) {
            if (err.code == 'ENOENT') {
                res.send({ "exist": false });
                return
            }
            return
        };
        res.send(data);
    });
});

app.listen(server_config.port, () => {
    console.log(`openNUT FS Press server is listening on port ${server_config.port}!`);
}
);