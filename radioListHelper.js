const fs = require('fs')
const LIST_PATH = 'public/radiolist.txt'

function buildRadioList()
{
	try {
		var data = fs.readFileSync(LIST_PATH, 'utf8');
	}
	catch
	{
		return [];
	}

	data = data.split("\n")
	if (data.length <= 1)
	{
		return [];
	}

	var radiolist = [];
	radiolist.date=data[0];

	for (var i = 1; i < data.length; i++)
	{
		album = {};
		album.title=data[i];
		if (album.title) 
		{
			radiolist.push(album)
		}
	}
	return radiolist
}

exports.buildRadioList = buildRadioList;
