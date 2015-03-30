/***********************************************
	
	Function:	Overlay Controls
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function OverlayBuilder(type, __this)		// change parent
{
	this.type = type;
	this.__this = __this;
	this.ratio = [];
	this.cropDetails = '';
	/*{
						'position': displayInfo.current, 
						'landscape': displayInfo.landscape,
						'portrait': displayInfo.portrait,
						'ratio': [
							{'width': displayInfo.product.fwidthMM/displayInfo.product.widthMM},
							{'height': displayInfo.product.fwidthMM/displayInfo.product.widthMM}
							]
						};
	*/
	//console.log(displayInfo.current);
	
	this.init();
};

OverlayBuilder.prototype.init = function()
{
	switch(this.type)
	{
		case 'cropArea':
			this.cropAreaInit();
			break;
	}
};

OverlayBuilder.prototype.cropAreaInit = function()	// Need to Post Width and Height
{
	var _this, rw, rh, obj, width, height;
	
	_this = this;
	
	rw = this.__this.product.fwidthMM / this.__this.product.widthMM;
	rh = this.__this.product.fheightMM / this.__this.product.heightMM;
	
	obj = document.createElement('div');
	$(obj).attr('id','cropMark').css({'display':'none','position':'absolute','pointer-events':'none','margin':'auto','z-index':'2000','border':'1px dashed #ddd', 'width': width, 'height': height }).addClass('absolute_vert_center');
	$('#wrapCanvas').append(obj);	
	
	
	
	/*
	var width, height, obj, rw, rh;
	
	obj = document.createElement('div');
	rw = this.product.fwidthMM/this.product.widthMM;
	rh = this.product.fheightMM/this.product.heightMM;
	
	this.cropObj = obj;
	this.cropRatio = {width : rw, height : rh};
	
	$(obj).attr('id','cropMark').css({'display':'none','position':'absolute','pointer-events':'none','margin':'auto','z-index':'2000','border':'1px dashed #ddd', 'width': width, 'height': height }).addClass('absolute_vert_center');
	$('#wrapCanvas').append(obj);	
	*/
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