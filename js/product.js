/***********************************************
	
	Function:	Product Controls
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function parseWidth(el, height, width, callback)
{
	var ratio;
	ratio = width/height;
	
	if(width > height)	// landscape
	{	
		width = 450;									
		height = 450/ratio;
		callback(width,height);
		return;
	}; 
	
	if(width < height) 	// Portrait
	{
		height = 400;										
		width = 400*ratio;
		callback(width,height);
		return;
	};
};

function FabricUI(client, subject, product, themes)
{
	var _this = this;
	this.client = client;
	this.subject = subject;
	this.product = product;
	this.themes = themes;
	this.init();
}

FabricUI.prototype.userInput = function(inputType, wrap, el, callback)
{
	var classes = this;
	$(wrap).on(inputType, el, function(event)
	{	
		event.preventDefault();
		var el = this;
		callback(classes, el, event);
	});
};

FabricUI.prototype.assetsThemes = function()
{
	var _this, string;
	_this = this;
	
	if(this.themes == '')
	{
		$('.themesObj, #assetsThemes').css('display','none');
		return;
	}

	var showThemes = new ListBuilder('listThemes', this.themes.Themes, true)
};

FabricUI.prototype.assetsImages = function()
{
	var	mouseEndX, mouseEndY, width, height, elementOffset, helper, offsetY, offsetX, classes, pageX, pageY;
	pageX = window.pageXOffset;
	pageY = window.pageYOffset;
	_this = this;
	
	var addImages = new ListBuilder('listImages', this.subject.Images, true);
	
	var drag = $('#listImages a img').draggable(
	{
		appendTo: 'body',
		obj : this,
		helper : function(event,ui)
		{
			width = $(this).width();
			height = $(this).height();
			helper = $(this).clone();
			helper.css({'width': width + 'px', 'height': height + 'px', 'z-index': '2000'});
			return helper; 
		},
		start : function(event, ui)
		{
			$(this).hide();
			elementOffset = $(this).parents().eq(1).offset();
			relativeMouseStart = {
						left: event.pageX - elementOffset.left,	 
						top: event.pageY - elementOffset.top   
					};
		},
		stop : function(event, ui)
		{
			$(this).show();
			helper.remove();
			var lookUp = $(this).parent().attr('data-lookup');
			mouseEndX = event.pageX;
			mouseEndY = event.pageY;

			if(
				mouseEndX > $('canvas').offset().left && 
				mouseEndX < ($('canvas').offset().left + $('canvas').width()) &&
				mouseEndY > $('canvas').offset().top &&
				mouseEndY < ($('canvas').offset().top + $('canvas').height())
			   )
			{
				addImage(
							_this.subject.Images[lookUp].HighRes, 
							width, 
							height, 
							((mouseEndX-$('canvas').offset().left) - relativeMouseStart.left) + (width/2), 
							((mouseEndY-$('canvas').offset().top) - relativeMouseStart.top) + (height/2)
						);
				// _this.controls.initKeyboard();
			}
			
		},
		revert : true,
		revertDuration: 0,
		scroll: false,
	});
	
	this.userInput('click', '#listImages', 'a', function(_this, el)
	{
		var width, height,lookUp;
		
		width = $(el).find('img').width();
		height = $(el).find('img').height();
		lookUp = $(el).attr('data-lookup');	
		
		addImage(
					_this.subject.Images[lookUp].HighRes, 
					width, 
					height, 
					$('canvas').width()/2, 
					$('canvas').height()/2
				);
	});
};

FabricUI.prototype.assetsText = function()
{
	var wrap, theme, sampleUI, themeLength, count;
	
	wrap = '#addText';
	theme = this.product.TextThemes[0];
	sampleUI = this;
	themeLength = theme.length;
	count = 0;
		
	buildTextTheme(wrap,theme);
	
	var showTextThemes = new ListBuilder('listTextThemes', this.product.TextObjects, true)

	$('#assetsText').on('click', '#changeTextTheme', function()
	{
		count = count+1;
		if(count == themeLength)	
		{ 
			count = 0;
		}
		theme = _this.product.TextThemes[count]; 
		buildTextTheme(wrap, theme);
	});
	
	$('#addText').on('click', 'li', function()
	{
		var lookUp, value;
		lookUp = $(this).attr('data-lookup');
		value = theme[lookUp].text;
		addIText(value, theme, lookUp);
	});
	
	$('#listTextThemes').on('click','a', function()
	{
		var lookUp = $(this).attr('data-lookUp');
		sampleUI.preBuiltText(lookUp);				
	});
	
};

FabricUI.prototype.preBuiltText = function(lookUp)
{	
	var textObj, group;
	
	group = [];
	textObj = this.product.TextObjects[lookUp].JSON.replace('{"objects":[','').replace('],"background":"#fafafa"}','');
	textObj = eval('[' + textObj + ']');	
	
	for(var i = 0; i < textObj.length; i++)
	{
		var attr = {
					originX: textObj[i].originX,
					originY: textObj[i].originY,
					left:	textObj[i].left,
					top:	textObj[i].top,
					width:	textObj[i].width,
					height:	textObj[i].height,
					fill:	textObj[i].fill,
					stroke:	textObj[i].stroke,
					strokeWidth: textObj[i].strokeWidth,
					strokeDashArray: textObj[i].strokeDashArray,
					strokeLineCap: textObj[i].strokeLineCap,
					strokeLineJoin: textObj[i].strokeLineJoin,
					strokeMiterLimit: textObj[i].strokeMiterLimit,
					scaleX: textObj[i].scaleX,
					scaleY:	textObj[i].scaleY,
					angle: textObj[i].angle,
					flipX: textObj[i].flipX,
					flipY: textObj[i].flipY,
					opacity: textObj[i].opacity,
					shadow: textObj[i].shadow,
					visible: textObj[i].visible,
					clipTo: textObj[i].clipTo,
					backgroundColor: textObj[i].backgroundColor,
					fillRule: textObj[i].fillRule,
					globalCompositeOperation: textObj[i].globalCompositeOperation,
					rx: textObj[i].rx,
					ry: textObj[i].ry,
					radius: textObj[i].radius,
					radius: textObj[i].radius
				};
		
		switch(textObj[i].type)
		{
			case 'rect':
				var obj = new fabric.Rect(attr);
				break;
			case 'i-text':
				var obj = new fabric.IText(textObj[i].text, attr);
				break;
			case 'circle':
				var obj = new fabric.Circle(attr);
				break;
			case 'triangle':
				var obj = new fabric.Triangle(attr);
				break;
		}
		canvas.add(obj);
		canvas.renderAll();
	};
		
};

FabricUI.prototype.init = function()
{
	// preloadPost(this.subject.Images);
	// this.assetsSizes();
	this.assetsThemes();
	this.assetsImages();
	this.assetsText();
	return;
};