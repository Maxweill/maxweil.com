const fs = require('fs')

function generateFortunes()
{
	var data = fs.readFileSync('public/fortunes.txt', 'utf8');
	return data = data.split('%');
}
function getRandomFortune(fortunes)
{
	fortune = fortunes[Math.floor(Math.random() * fortunes.length)]
	fortune = fortune.substring(fortune.indexOf('\n') + 1, fortune.lastIndexOf('\n'))
	fortune = fortune.replace(/(?:\r\n|\r|\n)/g, '<br>');
	return fortune;
}

exports.generateFortunes = generateFortunes;
exports.getRandomFortune = getRandomFortune;
