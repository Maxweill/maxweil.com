const LOG_PATH = 'public/photos/'
const fs = require('fs')
function buildAlbumList()
{
	var dir = fs.readdirSync(LOG_PATH, 'utf8')
	var albums = [];
	for (var i = 0; i < dir.length; i++)
	{
		var dirString = dir[i].split('^')
		var photos = fs.readdirSync(LOG_PATH + dir[i], 'utf8');
		photos = photos.filter(file => file != "thumbs")
		console.log
		var albumdir = { date: dirString[0].trim(), name: dirString[1].trim(), directory: dir[i], photos: photos };
		console.log(albums)
		albums.push(albumdir);
	}
	albums.sort(dateComparator).reverse();
	return albums;
}
function dateComparator(album1, album2)
{
	if (album1.date > album2.date)
	{
		return 1
	}
	else
	{
		return -1
	}
}
exports.buildAlbumList = buildAlbumList;
