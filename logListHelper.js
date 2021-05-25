const fs = require('fs')
const LOG_PATH = 'public/log/'
const md = require('markdown-it')({breaks: true});

function buildLogList()
{
	var dir = fs.readdirSync(LOG_PATH, 'utf8')
	var logs = [];
	for (var i = 0; i < dir.length; i++)
	{
		logs.push(loadSingleLog(LOG_PATH, dir[i]))
	}
	return logs.sort(dateComparator).reverse()
	console.log(logs)
}
function loadSingleLog(path, filename)
{
	var data = fs.readFileSync(path + filename, 'utf8');
	data = data.split("\n")

	parsedLogArray = [];
	parsedLogArray.push(parseHeaderData(data[0], "date:"))
	parsedLogArray.push(parseHeaderData(data[1], "title:"))
	contentArray = data.slice(2);
	contentString = contentArray.join('\n\n');
	contentString = md.render(contentString);
	
	log = {};
	log.datetime = parsedLogArray[0];
	log.date = parsedLogArray[0].substring(0, parsedLogArray[0].indexOf('[')).trim();
	log.time = parsedLogArray[0].substring(parsedLogArray[0].indexOf('[')).trim();
	log.title = parsedLogArray[1];
	log.content = contentString;
	log.filename = filename;
	log.pagename = filename.substring(0, filename.lastIndexOf('.'));
	return log;
}

function parseHeaderData(str, key)
{
	return str.substring(str.indexOf(key) + key.length).trim()
}
function dateComparator(log1, log2)
{
	if (log1.datetime > log2.datetime)
	{
		return 1
	}
	else
	{
		return -1
	}
}
function getOneLog(req, loglist)
{
	logPagename = req.path.substring(req.path.lastIndexOf('/') + 1);
	result = loglist.find(log =>
	{
		return log.pagename == logPagename
	})
	if (result == undefined)
	{
		result = { 'title': '403', 'content': "You tried to view a log that either isn't public, or doesn't exist." }
	}
	return result;
}

exports.buildLogList = buildLogList;
exports.getOneLog = getOneLog;
