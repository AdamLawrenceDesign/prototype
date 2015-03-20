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

function FabricUI(client, subject, product)
{
	this.client = client;
	this.subject = subject;
	this.product = product;
	this.init();
}; 

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

FabricUI.prototype.assetsSizes = function()
{
	listCreateImg('listSize',this.product.OtherProducts, function()
	{
		return;
	});
	
	function resizeCanvas(lookUp)
	{
		var  width, height;
		width = sampleUI.product.OtherProducts[lookUp].width;
		height = sampleUI.product.OtherProducts[lookUp].height;
		
		parseWidth('#wrapCanvas', height, width, function(width,height)
		{
			setWidthHeight(width,height);
			canvas.renderAll();
		});
	};
	/*
	this.userInput('click', '#listSize', 'a', function()
	{
		var lookUp = $(el).attr('data-lookUp');
		$('#wrapCanvas').fadeOut(400, function()
		{
			resizeCanvas(lookUp);
			$('#wrapCanvas').fadeIn(400);
		})
	});
	
	$('#listSize').on('click','a', function(event)
	{
		event.preventDefault();
		var lookUp = $(this).attr('data-lookUp');
		$('#wrapCanvas').fadeOut(400, function()
		{
			resizeCanvas(lookUp);
			$('#wrapCanvas').fadeIn(400);
		})
		
	});
	*/
};

FabricUI.prototype.assetsThemes = function()
{
	var $this;
	$this = this;
	
	listCreateImg('listThemes', this.product.Themes, function(){
		return;
	});
	$('#listThemes').on('click','a', function(event)
	{
		event.preventDefault();
		var lookUp = $(this).attr('data-lookUp');
		canvas.loadFromJSON($this.product.Themes[lookUp].JSON);
	});
};

FabricUI.prototype.assetsImages = function()
{
	var	mouseEndX, mouseEndY, width, height, elementOffset, helper, offsetY, offsetX, classes, pageX, pageY;
	pageX = window.pageXOffset;
	pageY = window.pageYOffset;
	classes = this;
	
	listCreateImg('listImages', this.subject.Images, function()
	{
		$('#listImages li').addClass('grid');
		setTimeout(function()
		{
			listGrid('#listImages');			// Set Masonary 
		}, 600);
	});
	
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
							classes.subject.Images[lookUp].HighRes, 
							width, 
							height, 
							((mouseEndX-$('canvas').offset().left) - relativeMouseStart.left) + (width/2), 
							((mouseEndY-$('canvas').offset().top) - relativeMouseStart.top) + (height/2)
						);
				classes.controls.initKeyboard();
			}
			
		},
		revert : true,
		revertDuration: 0,
		scroll: false,
	});
	
	this.userInput('click', '#listImages', 'a', function(classes, el)
	{
		var width, height,lookUp;
		width = $(el).find('img').width();
		height = $(el).find('img').height();
		lookUp = $(el).attr('data-lookup');	
		
		addImage(
					classes.subject.Images[lookUp].HighRes, 
					width, 
					height, 
					$('canvas').width()/2, 
					$('canvas').height()/2
				);
	});
};

FabricUI.prototype.assetsText = function()
{
	var $this, wrap, theme, sampleUI, themeLength, count;
	
	$this = this;
	wrap = '#addText';
	theme = this.product.TextThemes[0];
	sampleUI = this;
	themeLength = theme.length;
	count = 0;
		
	buildTextTheme(wrap,theme);
	
	listCreateImg('listTextThemes', this.product.TextObjects, function()
	{
		$('#listTextThemes li').addClass('grid');
		setTimeout(function(){
			listGrid('#listTextThemes');
		},400);
		return;
	});

	this.userInput('click','#assetsText','#changeTextTheme', function(classes)
	{console.log('test');
		count = count+1;
		if(count == themeLength)	
		{ 
			count = 0;
		}
		
		theme = $this.product.TextThemes[count]; 
		buildTextTheme(wrap, theme);
	});
	
	this.userInput('click', '#addText','li',function(classes, el)
	{
		var lookUp = $(el).attr('data-lookup'),
			value = theme[lookUp].text;
		addIText(value, theme, lookUp);
	});
	
	this.userInput('click', '#listTextThemes','a', function(classes, el)
	{
		var lookUp = $(el).attr('data-lookUp');
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
	this.assetsSizes();
	// this.assetsThemes();
	this.assetsImages();
	this.assetsText();
	return;
};