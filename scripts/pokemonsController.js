var fs = require('fs');

module.exports.get = function(req, res) {
    var pokemon = fs.readFileSync('app/data/' + req.params.fname + '.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(pokemon);
};

