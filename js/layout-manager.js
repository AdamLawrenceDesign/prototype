/***********************************************
	
	Function:	Theme Builder 
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function LayoutManager(__this, obj)		// change parent
{
	this.__this = __this;
	this.obj = obj;
	this.init();
};

LayoutManager.prototype.listener = function()
{
	var _this, string;
	_this = this;
	
	$('#listThemes').on('click', 'a', function(event)
	{
		event.preventDefault();
		console.log(_this.obj);
		string = _this.obj.Themes[$(this).attr('data-lookUp')].JSON;
		_this.themeParseString(eval(string.replace('{"objects":','').replace(',"background":"#fff"}','')));
		// string = _this.themes.Themes[$(this).attr('data-lookUp')].JSON;
		// _this.themeParseString(eval(string.replace('{"objects":','').replace(',"background":"#fff"}','')));
		// console.log(string);
	});
};

LayoutManager.prototype.themeParseString = function(string)
{
	var _this, targetH, targetW, orientation;
	_this = this;
	
	this.__this.resetPage(function()
	{
		setTimeout(function()
		{
			if(string[0].width > string[0].height)				// landscape
			{	
				_this.__this.buildLandscape();
				//_this.__this.canvasSetup(_this.__this.landscape.width, _this.__this.landscape.height);
				console.log('landscape');
			};
			
			if(string[0].width < string[0].height)				// Portrait 
			{
				_this.__this.buildPortrait();
				console.log('Portrait');
			};
		},400);
		/*
		this.__this.resetPage(function()
		{
			_this.__this.canvasSetup(_this.__this.landscape.width, _this.__this.landscape.height);
		});
		
		setTimeout(function()
		{
			_this.buildTheme(string);
		},400);
		return;
		*/
	}); 
	/*
	targetH = $('.canvas-container').outerHeight();
	targetW = $('.canvas-container').outerWidth();
	
	if(targetH > targetW)
	{
		orientation = 'portrait';
	}
	else 
	{
		orientation = 'landscape';
	};
	
	console.log(this.__this);
	console.log('Target Height: ' + targetH + '; Target Width: ' + targetW);
	
	
	if(string[0].height > string[0].width || orientation == 'portrait') 				// Portrait
	{
		console.log('Portrait');
		this.__this.resetPage(function()
		{
			_this.__this.setUpCanvas(this.__this.landscape.width, this.__this.landscape.height);
		});
		setTimeout(function()
		{
			_this.buildTheme(string);
		},400);
		return;
	}
	*/
};

LayoutManager.prototype.buildTheme = function(string)
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

LayoutManager.prototype.init = function()
{
	console.log(this.obj);
	this.listener();
};