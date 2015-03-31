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
	// have put this here so we can add more overlays if needed
	
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
	var ratioWL, ratioHL, ratioWP, ratioHP;
	
	ratioWP = this.__this.product.fwidthMM / this.__this.product.widthMM;
	ratioHP = this.__this.product.fheightMM / this.__this.product.heightMM;
	ratioWL = this.__this.product.fheightMM / this.__this.product.heightMM;
	ratioHL = this.__this.product.fwidthMM / this.__this.product.widthMM;
	this.cropDetails = {'ratioWL': ratioWL, 'ratioHL': ratioHL, 'ratioWP': ratioWP, 'ratioHP': ratioHP };
	this.buildCropMark();
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

	setTimeout(function()
	{
		_this.check(function(width, height)
		{
			_this.cropObj.css({'width': width + 'px', 'height': height + 'px'});
			_this.cropObj.fadeIn();
		});
	}, 400);
};

OverlayBuilder.prototype.check = function(callback)
{
	var width, height, _this;
	
	_this = this;
	
	if(this.__this.canvasState.current == 'portrait')
	{
		width = _this.__this.canvasSize.width*this.cropDetails.ratioWP;
		height = _this.__this.canvasSize.height*this.cropDetails.ratioHP;
	}
	else
	{
		width = _this.__this.canvasSize.width*this.cropDetails.ratioWL;
		height = _this.__this.canvasSize.height*this.cropDetails.ratioHL;
	};
	callback(width, height);
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