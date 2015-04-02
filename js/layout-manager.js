/***********************************************
	
	Function:	Layout Builder 
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function LayoutManager(__this, obj)		// change parent
{
	this.__this = __this;
	this.obj = obj;
	this.init();
}

LayoutManager.prototype.listener = function()
{
	var _this, string;
	_this = this;
	
	$('#listThemes').on('click', 'a', function(event)
	{
		event.preventDefault();
		string = _this.obj.Themes[$(this).attr('data-lookUp')].JSON;
		_this.themeParseString(eval(string.replace('{"objects":','').replace(',"background":"#fff"}','')));
	});
};

LayoutManager.prototype.themeParseString = function(string)
{
	var _this;
	_this = this;
	
	this.__this.resetPage(function()
	{
		setTimeout(function()
		{
			if(string[0].width > string[0].height)				// landscape
			{	
				_this.__this.buildLandscape();
				_this.buildTheme(string);
			}
			
			if(string[0].width < string[0].height)				// Portrait 
			{
				_this.__this.buildPortrait();
				_this.buildTheme(string);
			}
		},400);
	}); 
};

LayoutManager.prototype.buildTheme = function(string)
{
	var _this, ratio, insert;
	
	_this = this;
	ratio = canvas._objects[0].width/string[0].width;

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
		}
		string[0].selectable = false;
	}
	
	insert = '{"objects":' + JSON.stringify(string) + ',"background":"#fff"}';
	canvas.loadFromJSON(insert);
	canvas.renderAll();
};

LayoutManager.prototype.init = function()
{
	this.listener();
};