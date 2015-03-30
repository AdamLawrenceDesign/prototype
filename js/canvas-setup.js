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
	// this.portrait = '';
	// this.landscape = '';
	// this.current = '';
	this.canvasState = '';
	this.overlay = false;
	this.themes = themes;
	this.init();
}

CanvasSetup.prototype.setUp = function()
{
	$('aside').css('margin-top', $('header').height() + 'px');				// , main
	$('#wrapAssets').css('height', window.innerHeight - ($('header').height()+60) + 'px');	// removed $('#wrapSearch').height()*3)
	$('main').css('height', window.innerHeight - ($('header').height()+40) + 'px');
	// $('#assetsShortcuts, #assetsThemes, #assetsImages, #assetsText').css('min-height', window.innerHeight - ($('header').height()+($('#wrapSearch').height()*3)) + 'px')
	$('body, main').css('overflow','hidden');
};

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
	};
	
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
};

CanvasSetup.prototype.buildLandscape = function()
{
	var width, height;
	width = $('main').innerWidth()*.6;									
	height = width * this.canvasState.landscape.ratio;
	
	canvas.setWidth(width);
	canvas.setHeight(height);
	placeholder.setWidth(width);
	placeholder.setHeight(height);
			
	$('#landscape').find('span').removeClass('hidden').parent().addClass('no-event');
	$('#portrait').find('span').addClass('hidden').parent().removeClass('no-event');
};

CanvasSetup.prototype.buildPortrait = function()
{
	var width, height;
	height = $('main').innerHeight()*.65;									
	width = height * this.canvasState.portrait.ratio;
	
	canvas.setWidth(width);
	canvas.setHeight(height);	
	placeholder.setWidth(width);
	placeholder.setHeight(height);
	
	$('#landscape').find('span').addClass('hidden').parent().removeClass('no-event');
	$('#portrait').find('span').removeClass('hidden').parent().addClass('no-event');			
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
	};
	
};

/*=============================*/

CanvasSetup.prototype.canvasResize = function()
{
	var string, width, height, insert, cropWidth, cropHeight, cropDisplay, wrapCrop;
	wrapCrop = $('#cropMark');
	
	function changeSize(string, ratio, callback)
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
			};
			string[0].selectable = false;
		};
		
		insert = '{"objects":' + JSON.stringify(string) + ',"background":"#fff"}';
		canvas.loadFromJSON(insert);
		canvas.renderAll();
		callback(ratio);
	};
	
	function cropDisplay(wrapCrop,ratio)
	{
		wrapCrop.css({'width':wrapCrop.outerWidth()*ratio+'px','height':wrapCrop.outerHeight()*ratio + 'px'}).fadeIn();
	};
	
	$('#zoom').on('click', '#canvasLarger', function()
	{
		changeSize(eval(JSON.stringify(canvas).replace('{"objects":','').replace(',"background":"#fff"}','')),1.09, function(ratio)
		{
			cropDisplay(wrapCrop,ratio);
		});
	});
	
	$('#zoom').on('click', '#canvasSmaller', function()
	{
		if($('canvas').height()<150)return;
		if($('canvas').width()<150)return;
		changeSize(eval(JSON.stringify(canvas).replace('{"objects":','').replace(',"background":"#fff"}','')),.92, function(ratio)
		{
			cropDisplay(wrapCrop,ratio);
		});
	});
	
};

CanvasSetup.prototype.windowResize = function()
{
	var rtime, timeout, delta, page, _this;
	
	_this = this;
	rtime = new Date(1, 1, 2000, 12,00,00);
	timeout = false;
	delta = 200;
	page = this;
	
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
			
			_this.setUp();
			_this.initCanvas(_this.canvasState.current);
			/*
			switch (_this.current)
			{
				case 'landscape':
					// _this.setUpCanvas(_this.portrait.width, _this.portrait.height);
				break;
				
				case 'portrait':
					// _this.setUpCanvas(_this.landscape.width, _this.landscape.height);
				break;
			}
			*/
			setTimeout(function()
			{
				$('#screenChange').addClass('hidden');
			},200);
		}               
	}	
};

CanvasSetup.prototype.resetPage = function()
{
	canvas.setWidth(0);
	canvas.setHeight(0);
	$('#cropMark').css('display','none');
};

CanvasSetup.prototype.orientation = function()
{
	var _this;
	_this = this;

	$('#orientationLinks').on('click','a', function()
	{
		_this.resetPage();

		switch ($(this).attr('id'))
		{
			case 'landscape':
				// _this.setUpCanvas(_this.portrait.width, _this.portrait.height);
			break;
			
			case 'portrait':
				// _this.setUpCanvas(_this.landscape.width, _this.landscape.height);
			break;
		}
	});
	
	$('#zoom').on('click', '#rotate', function()
	{
		_this.resetPage();
		
		switch (_this.current)
		{
			case 'landscape':
				// _this.setUpCanvas(_this.landscape.width, _this.landscape.height);
			break;
			
			case 'portrait':
				// _this.setUpCanvas(_this.portrait.width, _this.portrait.height);
			break;
		}
	});
};

CanvasSetup.prototype.overlayInit = function()
{
	if(this.product.widthMM != this.product.fwidthMM && this.product.heightMM != this.product.fwidthMM)
	{
		var buildCropArea = new OverlayBuilder('cropArea', this);
	}; 
};

CanvasSetup.prototype.init = function()
{
	$('canvas, .canvas-container').addClass('canvas-transitions');
	this.setUp();
	this.postDetails();
	this.initCanvas(this.canvasState.current);
	// this.setUpCanvas(this.product.widthMM, this.product.heightMM);
	// this.orientationControls();
	this.overlayInit();
	//	this.crop();							// This initialises canvas
	
	// this.scroller();
	this.windowResize();
	// this.orientation();
	// this.addTheme();
	
};