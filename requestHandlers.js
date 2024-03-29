var logListHelper = require('./logListHelper');
var loglist = logListHelper.buildLogList();

var fortunesHelper = require('./fortunesHelper');
var fortunes = fortunesHelper.generateFortunes()
var getRandomFortune = fortunesHelper.getRandomFortune

var photosHelper = require('./photosHelper');
var albums = photosHelper.buildAlbumList();

var radioListHelper = require('./radioListHelper');
var radiolist = radioListHelper.buildRadioList();

function renderRadio(req, res)
{
	res.render('radio', { layout: 'index', radiolist: radiolist, fortune: getRandomFortune(fortunes) });
}
function renderLogList(req, res)
{
	res.render('log', { layout: 'index', logs: loglist, fortune: getRandomFortune(fortunes) });
}
function renderLog(req, res)
{
	res.render('singleLog', { layout: 'index', log: logListHelper.getOneLog(req, loglist), fortune: getRandomFortune(fortunes) });
}
function renderHome(req, res)
{
	res.render('home', { layout: 'index', fortune: getRandomFortune(fortunes) });
}
function renderWorks(req, res)
{
	res.render('works', { layout: 'index', fortune: getRandomFortune(fortunes) });
}
function renderPhotos(req, res)
{
	res.render('photos', { layout: 'index', albums: albums, fortune: getRandomFortune(fortunes) });
}
function render404(req, res)
{
	res.render('404', { layout: "index", fortune: getRandomFortune(fortunes) });
}
exports.renderHome = renderHome;
exports.renderLog = renderLog;
exports.renderWorks = renderWorks;
exports.renderLogList = renderLogList;
exports.renderRadio = renderRadio;
exports.render404 = render404;
exports.renderPhotos = renderPhotos;
