/***********************************************
	
	Function:	Overlay Controls
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function OverlayBuilder(type, __this)		// change parent
{
	this.type = type;
	this.__this = __this;
	this.init();
};

OverlayBuilder.prototype.init = function()
{
	switch(this.type)
	{
		case 'cropArea':
			this.cropAreaInit();
			this.listener();
			break;
	}
};

OverlayBuilder.prototype.cropAreaInit = function()	
{
	var ratioW, ratioH;

	ratioW = this.__this.product.fwidthMM / this.__this.product.widthMM;
	ratioH = this.__this.product.fheightMM / this.__this.product.heightMM;
	this.cropDetails = {'ratioW': ratioW, 'ratioH': ratioH };

	this.setRatio();
	this.buildCropMark();
};

OverlayBuilder.prototype.setRatio = function()
{
	var ratioW, ratioH;
	
	switch(this.__this.canvasState.current)
	{
		case 'portrait':
			ratioW = this.__this.product.fwidthMM / this.__this.product.widthMM;
			ratioH = this.__this.product.fheightMM / this.__this.product.heightMM;
			this.cropDetails = {'ratioW': ratioW, 'ratioH': ratioH };
		break;
		case 'landscape':
			ratioW = this.__this.product.fwidthMM / this.__this.product.widthMM;
			ratioH = this.__this.product.fheightMM / this.__this.product.heightMM;
			this.cropDetails = {'ratioW': ratioH, 'ratioH': ratioW };
		break;
	}
};

OverlayBuilder.prototype.buildCropMark = function()	
{
	var obj, wrap;
	
	obj = document.createElement('div');
	$(obj).attr('id','cropMark').css({'display':'none','position':'absolute','pointer-events':'none','margin':'auto','z-index':'2000','border':'1px dashed #ddd' }).addClass('absolute_vert_center'); 	// 'width': width, 'height': height
	$('#wrapCanvas').append(obj);
	
	this.cropObj = $(obj);	
	this.cropSetSize();
};

OverlayBuilder.prototype.cropSetSize = function()	
{
	var width, height, _this;
	
	_this = this;
	width = this.__this.canvasSize.width*this.cropDetails.ratioW;
	height = this.__this.canvasSize.height*this.cropDetails.ratioH;
	this.cropObj.css({'width': width + 'px', 'height': height + 'px'});
	
	setTimeout(function()
	{
		_this.cropObj.fadeIn();
	}, 400);
};

OverlayBuilder.prototype.listener = function()
{
	var _this;
	_this = this;
	
	$('#landscape, #portrait, #rotate, #canvasLarger, #canvasSmaller').on('click', function()
	{
		_this.cropObj.css('display','none');
		setTimeout(function()
		{
			_this.cropSetSize();
		},800);
	});
	
	var rtime, timeout, delta, _this;
	
	_this = this;
	rtime = new Date(1, 1, 2000, 12,00,00);
	timeout = false;
	delta = 200;
	
	$(window).resize(function()
	{
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
			_this.cropObj.css('display','none');
			setTimeout(function()
			{
				_this.cropSetSize();
			},800);
		}               
	}	
	
};

/*

	setTimeout(function()
	{
		$('#cropMark').css({'height': height*_this.cropRatio.width +'px','width': width*_this.cropRatio.width + 'px','display':'block'});
	},400);

OverlayBuilder.prototype.crop = function()
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
	
};*/