const express = require('express');
const app = express();
const port = 8888;

const handlebars = require('express-handlebars');
var requestHandlers = require("./requestHandlers");
var serveStatic = require('serve-static')
var serveIndex = require('serve-index')

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars(
    {
        layoutsDir: __dirname + '/views/layouts', extname: 'hbs'
    }));

//Sets a basic route
app.get('/', requestHandlers.renderHome);
app.get('/radio', requestHandlers.renderRadio);
app.get('/photos', requestHandlers.renderPhotos);
app.get('/log', requestHandlers.renderLogList);
app.get('/log/*', requestHandlers.renderLog);
app.use('/', express.static('public/files'), serveIndex('public/files', { 'icons': true, 'stylesheet': 'public/static/styles/directory.css', 'view': 'details', 'template': 'public/static/templates/template.html' }))
app.get('*', requestHandlers.render404);

//Makes the app listen to port 
app.listen(port, () => console.log(`App listening to port ${port}`));


