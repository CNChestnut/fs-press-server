
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const server_config = require('./config/server.json');

app.use(cors());

app.get('/:site', (req, res) => {
    var path = './files';
    if(req.params.site)
    {  
        if(server_config.multiSite){
        path += `/${req.params.site}`;
        }
        else{
            res.send({ "multiSite": false });
        }
    }
    if(req.query.language){
        if(server_config.i18n){
            path += `/${req.query.language}`;
        }
        else{
            res.send({ "i18n": false });
        }
    }
    path += `/${req.query.file}`;
    fs.readFile(path, 'utf8', (err, data) => {
        console.log({"data":Date(),"path":path,"":req.query});
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