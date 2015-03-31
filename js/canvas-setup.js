/***********************************************
	
	Function:	Canvas Setup
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

var canvas, placeholder;

function CanvasSetup(product,themes)
{
	var _this = this;
	this.product = product;
	this.overlay = false;
	this.themes = themes;
	this.init();
}

CanvasSetup.prototype.postDetails = function()
{
	var current, pHeight, pWidth, pRatio, lHeight, lWidth, lRatio;
	
	if(this.product.widthMM > this.product.heightMM)				// landscape
	{
		current = 'landscape';
		
		lHeight = this.product.widthMM;	// Landscape
		lWidth = this.product.heightMM;
		lRatio = this.product.widthMM/this.product.heightMM;
		
		pHeight = this.product.widthMM;		// Portrait
		pWidth = this.product.heightMM;
		pRatio = this.product.widthMM/this.product.heightMM;
	} 
	else															// Portrait
	{
		current = 'portrait';
		
		lHeight = this.product.widthMM;	// Landscape
		lWidth = this.product.heightMM;
		lRatio = this.product.widthMM/this.product.heightMM;
		
		pHeight = this.product.widthMM;		// Portrait
		pWidth = this.product.heightMM;
		pRatio = this.product.widthMM/this.product.heightMM;
	}
	
	this.canvasState = 
	{
		'current' : current,
		'portrait' : 
		{
			'height' : pHeight,
			'width' : pWidth,
			'ratio' : pRatio
		},
		'landscape':
		{
			'height': lHeight,
			'width': lWidth,
			'ratio': lRatio
		}
	};	
	
	this.setupPage();
};

CanvasSetup.prototype.setupPage = function()
{
	$('aside').css('margin-top', $('header').height() + 'px');				// , main
	$('#wrapAssets').css('height', window.innerHeight - ($('header').height()+60) + 'px');	// removed $('#wrapSearch').height()*3)
	$('main').css('height', window.innerHeight - ($('header').height()+40) + 'px');
	$('body, main').css('overflow','hidden');
	
	this.initCanvas(this.canvasState.current);	
};

CanvasSetup.prototype.initCanvas = function(canvasState)
{
	$('#wrapCanvas').css('opacity','1');
	
	if(canvasState == 'landscape')
	{
		this.buildLandscape();
	}
	else
	{
		this.buildPortrait();
	}
	
	this.eventListener();
	this.canvasResize();
};

CanvasSetup.prototype.buildLandscape = function()
{
	var width, height;
	
	width = $('main').innerWidth()*0.6;									
	height = width * this.canvasState.landscape.ratio;
	
	/*===========================*/ // Here you could parse the JSON string and rebuild the canvas making a ration of new and current height
	// dont go to this function if you wan to parse string
	this.canvasSetup(width, height);
			
	$('#landscape').find('span').removeClass('hidden').parent().addClass('no-event');
	$('#portrait').find('span').addClass('hidden').parent().removeClass('no-event');

	this.canvasState.current = 'landscape';
	this.canvasSize = {'width': width, 'height': height};
};

CanvasSetup.prototype.buildPortrait = function()
{
	var width, height;
	
	height = $('main').innerHeight()*0.65;	
	width = height * this.canvasState.portrait.ratio;
	
	/*===========================*/ // Here you could parse the JSON string and rebuild the canvas making a ration of new and current height
	// dont go to this function tho
	this.canvasSetup(width, height);
	
	$('#landscape').find('span').addClass('hidden').parent().removeClass('no-event');
	$('#portrait').find('span').removeClass('hidden').parent().addClass('no-event');
	
	this.canvasState.current = 'portrait';
	this.canvasSize = {'width': width, 'height': height};
};

CanvasSetup.prototype.canvasSetup = function(width, height)
{
	canvas.clear();
	canvas.setWidth(width);
	canvas.setHeight(height);
	placeholder.setWidth(width);
	placeholder.setHeight(height);
	canvas.add(placeholder);
	canvas.renderAll();
};

/*=============================*/

CanvasSetup.prototype.windowResize = function()
{
	var rtime, timeout, delta, _this;
	
	_this = this;
	rtime = new Date(1, 1, 2000, 12, 0, 0);
	timeout = false;
	delta = 200;
	
	$(window).resize(function()
	{
		$('#screenChange').removeClass('hidden');
		rtime = new Date();
		
		if (timeout === false)
		{
			timeout = true;
			setTimeout(resizeend, delta);
		}
	});
	
	function resizeend()
	{
		if (new Date() - rtime < delta)
		{
			setTimeout(resizeend, delta);
		} 
		else
		{
			timeout = false;
			
			_this.setupPage();
			_this.initCanvas(_this.canvasState.current);

			setTimeout(function()
			{
				$('#screenChange').addClass('hidden');
			},200);
		}               
	}	
};

CanvasSetup.prototype.resetPage = function(callback)
{
	canvas.setWidth(0);
	canvas.setHeight(0);
	callback();
};

CanvasSetup.prototype.eventListener = function()
{
	var _this;
	_this = this;
	
	/*== Originally used switch statements here but would not work ==*/
		
	$('#landscape').on('click', function()
	{
		_this.resetPage(function()
		{
			setTimeout(function()
			{
				_this.buildLandscape();
			},400);
		});
	});
	
	$('#portrait').on('click', function()
	{
		_this.resetPage(function()
		{
			setTimeout(function()
			{
				_this.buildPortrait();
			},400);
		});
	});

	$('#zoom').on('click', '#rotate', function()
	{
		switch (_this.canvasState.current)
		{
			case 'portrait':
				_this.resetPage(function()
				{
					setTimeout(function()
					{
						_this.buildLandscape();
					},400);
				});
			break;
			
			case 'landscape':
				_this.resetPage(function()
				{
					setTimeout(function()
					{
						_this.buildPortrait();
					},400);
				});
			break;
		}
	});
};

CanvasSetup.prototype.canvasResize = function()
{
	var width, height, insert, _this;
	
	_this = this;
	
	function changeSize(string, ratio)
	{
		width = string[0].width*ratio;
		height = string[0].height*ratio;
		
		if($('main').innerWidth()-150 <= width*ratio) return;
		if($('main').innerHeight()-150 <= height*ratio) return;

		$('#cropMark').css('display','none'); 

		canvas.clear();
		canvas.setWidth(width);
		canvas.setHeight(height);
		
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
		_this.canvasSize = {'width': width, 'height': height};
	}
	
	$('#zoom').on('click', '#canvasLarger', function()
	{
		changeSize(eval(JSON.stringify(canvas).replace('{"objects":','').replace(',"background":"#fff"}','')), 1.09);
	});
	
	$('#zoom').on('click', '#canvasSmaller', function()
	{
		if($('canvas').height()<150)return;
		if($('canvas').width()<150)return;
		changeSize(eval(JSON.stringify(canvas).replace('{"objects":','').replace(',"background":"#fff"}','')),0.92);
	});
};

CanvasSetup.prototype.overlayInit = function()
{
	if(this.product.widthMM != this.product.fwidthMM && this.product.heightMM != this.product.fwidthMM)
	{
		var buildCropArea = new OverlayBuilder('cropArea', this);
	}
};

CanvasSetup.prototype.init = function()
{
	$('canvas, .canvas-container').addClass('canvas-transitions');
	this.postDetails();
	this.overlayInit();
	this.windowResize();
};