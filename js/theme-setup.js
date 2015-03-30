
/*
ThemeBuilder.prototype.addTheme = function()
{
	var _this, string;
	_this = this;
	
	$('#listThemes').on('click', 'a', function(event)
	{
		event.preventDefault();
		string = _this.themes.Themes[$(this).attr('data-lookUp')].JSON;
		_this.themeParseString(eval(string.replace('{"objects":','').replace(',"background":"#fff"}','')));
	});
};

ThemeBuilder.prototype.themeParseString = function(string)
{
	var _this;
	_this = this;
	
	if(string[0].width > string[0].height || this.current == 'landscape')				// landscape
	{	
		console.log('landscape');
		this.resetPage();
		this.setUpCanvas(this.landscape.width, this.landscape.height);
		setTimeout(function()
		{
			_this.buildTheme(string);
		},400);
		return;
	}; 
	
	if(string[0].height > string[0].width || this.current == 'portrait') 				// Portrait
	{
		console.log('Portrait');
		this.resetPage();
		this.setUpCanvas(this.landscape.width, this.landscape.height);
		setTimeout(function()
		{
			_this.buildTheme(string);
		},400);
		return;
	}
	
};

ThemeBuilder.prototype.buildTheme = function(string)
{
	var _this, ratio, insert;
	
	_this = this;
	ratio = canvas._objects[0].width/string[0].width;
	
	console.log('Current Canvas: ' + canvas._objects[0].width + ', Current Canvas Height: ' + canvas._objects[0].height);

	for(var i = 0; i < string.length; i++)
	{
		string[i].width = string[i].width*ratio;
		string[i].height = string[i].height*ratio;
		string[i].left = string[i].left*ratio;
		string[i].top = string[i].top*ratio;

		switch(string[i].type)
		{
			case 'i-text':
				string[i].fontSize = string[i].fontSize*ratio;
				break;
			case 'circle':
				string[i].radius = string[i].radius*ratio;
				break;
		};
		string[0].selectable = false;
	};
	
	insert = '{"objects":' + JSON.stringify(string) + ',"background":"#fff"}';
	canvas.loadFromJSON(insert);
	canvas.renderAll();
};
*/