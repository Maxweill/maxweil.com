const express = require('express');
const app = express();
const fs = require('fs')
const https = require('https')
const chalk = require('chalk')
const port = 443;

const handlebars = require('express-handlebars');
var requestHandlers = require("./requestHandlers");
var serveStatic = require('serve-static')
var serveIndex = require('serve-index')

app.all("*", function (req, resp, next) {
	if (!req.path.startsWith('/photos') || req.path=='/photos/') 
	{
		console.log(new Date().toISOString()+" "+"\""+chalk.cyan(req.method + ': ' + req.path)+"\" "+req.headers["user-agent"]+' '+chalk.green(req.ip));	
	}
   	next();
});
app.use(express.static('public'));
app.use('/favicon.ico', express.static('favicon.ico'));
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

const privateKey = fs.readFileSync('/etc/letsencrypt/live/maxweil.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/maxweil.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/maxweil.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

https.createServer(credentials,app)
.listen(port)
console.log(`App listening to port ${port}`)
