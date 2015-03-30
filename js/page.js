/***********************************************
	
	Function:	Page | Fabric UI
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

var canvas, placeholder;

/******************************/

function Page(product,themes)
{
	var _this = this;
	this.product = product;
	this.portrait = '';
	this.landscape = '';
	this.current = '';
	// this.cropMarks = false;
	// this.cropRatio = false;
	this.themes = themes;
	this.init();
}

Page.prototype.setUp = function()
{
	$('aside').css('margin-top', $('header').height() + 'px');		// , main
	$('#wrapAssets').css('height', window.innerHeight - ($('header').height()+60) + 'px');	// removed $('#wrapSearch').height()*3)
	$('main').css('height', window.innerHeight - ($('header').height()+40) + 'px');
	// $('#assetsShortcuts, #assetsThemes, #assetsImages, #assetsText').css('min-height', window.innerHeight - ($('header').height()+($('#wrapSearch').height()*3)) + 'px')
	$('body, main').css('overflow','hidden');
};

Page.prototype.setUpCanvas = function(width, height)
{
	var _this = this;
	
	this.setOrientation($('main').innerWidth()*.6, $('main').innerHeight()*.65, width, height, function(width,height)
	{
		canvas.clear();							// incase change during build
		setTimeout(function()
		{
			_this.setWidthHeight(width, height);
			canvas.add(placeholder);
			canvas.renderAll();
		},400 );
	});
	this.canvasResize();
};

Page.prototype.setWidthHeight = function(width,height)
{
	var _this;
	_this = this;
	
	$('canvas, .canvas-container').addClass('canvas-transitions');
	
	canvas.setWidth(width);
	canvas.setHeight(height);
	placeholder.setWidth(width);
	placeholder.setHeight(height);
	/*
	if(!this.cropMarks)
	{
		setTimeout(function()
		{
			$('#cropMark').css({'height': height*_this.cropRatio.width +'px','width': width*_this.cropRatio.width + 'px','display':'block'});
		},400);
	}
	*/
};

Page.prototype.setOrientation = function(maxWidth, maxHeight, width, height, callback)
{
	var ratio;
	ratio = width/height;
	
	if(width > height)				// landscape
	{	
		width = maxWidth;									
		height = maxWidth/ratio;
		$('#landscape').find('span').removeClass('hidden');
		$('#portrait').find('span').addClass('hidden');
		this.current = 'landscape';
		callback(width,height);
		return;
	}; 
	
	if(width < height) 				// Portrait
	{
		height = maxHeight;										
		width = maxHeight*ratio;
		$('#landscape').find('span').addClass('hidden');
		$('#portrait').find('span').removeClass('hidden');
		this.current = 'portrait';
		callback(width,height);
		return;
	};
};

Page.prototype.canvasResize = function()
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

Page.prototype.windowResize = function()
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
			
			switch (_this.current)
			{
				case 'landscape':
					_this.setUpCanvas(_this.portrait.width, _this.portrait.height);
				break;
				
				case 'portrait':
					_this.setUpCanvas(_this.landscape.width, _this.landscape.height);
				break;
			}
			
			setTimeout(function()
			{
				$('#screenChange').addClass('hidden');
			},200);
		}               
	}	
};

Page.prototype.links = function()
{
	var _this;
	_this = this;
	
	$('.productLabel').html(_this.product.description);
	
	$('.productsLink').on('click', function()
	{
		$(this).attr('href', 'products.html?' + _this.product.itemName);
	});
};

Page.prototype.showInfo = function()
{
	var _this, wrap;
	_this = this;
	wrap = $('#productInformation');
	
	wrap.find('.description').html(_this.product.description);
	wrap.find('.itemName').html(_this.product.itemName);
	wrap.find('.price').html('$ ' + _this.product.unitPrice);
	wrap.find('.productImage').attr('src','img/products/' + _this.product.id + '.jpg');
};

Page.prototype.resetPage = function()
{
	canvas.setWidth(0);
	canvas.setHeight(0);
	$('#cropMark').css('display','none');
};

Page.prototype.orientation = function()
{
	var _this;
	_this = this;

	$('#orientationLinks').on('click','a', function()
	{
		_this.resetPage();

		switch ($(this).attr('id'))
		{
			case 'landscape':
				_this.setUpCanvas(_this.portrait.width, _this.portrait.height);
			break;
			
			case 'portrait':
				_this.setUpCanvas(_this.landscape.width, _this.landscape.height);
			break;
		}
	});
	
	$('#zoom').on('click', '#rotate', function()
	{
		_this.resetPage();
		
		switch (_this.current)
		{
			case 'landscape':
				_this.setUpCanvas(_this.landscape.width, _this.landscape.height);
			break;
			
			case 'portrait':
				_this.setUpCanvas(_this.portrait.width, _this.portrait.height);
			break;
		}
	});
};
/*
Page.prototype.createCropObj = function()
{
	var width, height, obj, rw, rh;
	
	obj = document.createElement('div');
	rw = this.product.fwidthMM/this.product.widthMM;
	rh = this.product.fheightMM/this.product.heightMM;
	
	this.cropObj = obj;
	this.cropRatio = {width : rw, height : rh};
	
	$(obj).attr('id','cropMark').css({'display':'none','position':'absolute','pointer-events':'none','margin':'auto','z-index':'2000','border':'1px dashed #ddd', 'width': width, 'height': height }).addClass('absolute_vert_center');
	$('#wrapCanvas').append(obj);
	
};

Page.prototype.crop = function()
{
	if(this.product.widthMM != this.product.fwidthMM && this.product.heightMM != this.product.fwidthMM)
	{
		this.createCropObj();
	}; 
	
	this.setUp();
	this.setUpCanvas(this.product.widthMM, this.product.heightMM);
	
	if(this.product.widthMM > this.product.heightMM)				// landscape
	{	
		this.portrait = {'width':this.product.widthMM, 'height': this.product.heightMM, 'cropW': this.product.fwidthMM, 'cropH': this.product.fheightMM };
		this.landscape = {'width':this.product.heightMM, 'height': this.product.widthMM, 'cropW': this.product.fheightMM, 'cropH': this.product.fwidthMM  };
	} 
	else													// Portrait
	{
		this.portrait = {'width':this.product.heightMM, 'height': this.product.widthMM, 'cropW': this.product.fheightMM, 'cropH': this.product.fwidthMM  };
		this.landscape = {'width':this.product.widthMM, 'height': this.product.heightMM, 'cropW': this.product.fwidthMM, 'cropH': this.product.fheightMM  };
	};
	
};
*/
Page.prototype.overlayInit = function()
{
	if(this.product.widthMM != this.product.fwidthMM && this.product.heightMM != this.product.fwidthMM)
	{
		var buildCropArea = new OverlayBuilder('cropArea', this);
		buildCropArea.init();
	}; 
};

Page.prototype.orientationControls = function()
{
	if(this.product.widthMM > this.product.heightMM)				// landscape
	{	
		this.portrait = {'width':this.product.widthMM, 'height': this.product.heightMM, 'cropW': this.product.fwidthMM, 'cropH': this.product.fheightMM };
		this.landscape = {'width':this.product.heightMM, 'height': this.product.widthMM, 'cropW': this.product.fheightMM, 'cropH': this.product.fwidthMM  };
	} 
	else													// Portrait
	{
		this.portrait = {'width':this.product.heightMM, 'height': this.product.widthMM, 'cropW': this.product.fheightMM, 'cropH': this.product.fwidthMM  };
		this.landscape = {'width':this.product.widthMM, 'height': this.product.heightMM, 'cropW': this.product.fwidthMM, 'cropH': this.product.fheightMM  };
	};
};

Page.prototype.addTheme = function()
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

Page.prototype.themeParseString = function(string)
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

Page.prototype.buildTheme = function(string)
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

Page.prototype.showInfo = function()
{
	var _this, wrap;
	_this = this;
	wrap = $('#productInformation');
	
	wrap.find('.description').html(_this.product.description);
	wrap.find('.itemName').html(_this.product.itemName);
	wrap.find('.price').html('$ ' + _this.product.unitPrice);
	wrap.find('.productImage').attr('src','img/products/' + _this.product.id + '.jpg');
};

Page.prototype.export = function()
{
	$('header').on('click', '#export', function()
	{
		var string, url, groupName;
		
		// url = window.location.href;
		// groupName = url.substr(url.search("html?") + 5, url.length);
		string = JSON.stringify(canvas);
		console.log(string);
		
		// window.location = 'http://192.168.0.177/_testing/prototype/payment.html';
	});
};

Page.prototype.init = function()
{
	this.setUp();
	this.setUpCanvas(this.product.widthMM, this.product.heightMM);
	this.orientationControls();
	this.overlayInit();
	//	this.crop();							// This initialises canvas
	this.showInfo();
	// this.scroller();
	this.windowResize();
	this.orientation();
	this.addTheme();
	this.links();
	this.export();
};