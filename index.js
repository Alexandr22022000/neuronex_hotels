const express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    {consoleLog} = require('./server/logs'),
    router = require('./server/router'),
    mongoose = require('neuronex_mongoose'),
    database = require('./server/database'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.smartConnect(app, process.env.DATABASE_URL || 'mongodb://localhost:27017/neuronex_hotels', consoleLog);
router(app);
app.use(express.static('public'));
database();

app.get('/*', (req, res) => {
    const stream = fs.createReadStream(path.resolve('public/index.html'));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    stream.pipe(res);
});

app.listen(app.get('port'), () => consoleLog('Server started on port ' + app.get('port')));