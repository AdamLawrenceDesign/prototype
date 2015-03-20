/***********************************************
	
	Function:	Palette Controls
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function addImage(path, width, height, left, top)
{
	canvas.deactivateAll();
	fabric.Image.fromURL(path, function(img)
	{
		img.originX = 'center';
		img.originY = 'center';
		img.left = left;
		img.top = top;
		img.width = width;
		img.height = height;
		img.active = true;
		canvas.add(img);
	});
	canvas.setActiveObject;
	
};

function listGrid(obj)
{
	var container = document.querySelector(obj);
    var masonry = new Masonry(container, 
	{
        columnWidth: 3,
        itemSelector: '.grid'
    });

};

function buildTextTheme(wrap, theme)
{
	$(wrap).empty();
	if(theme[0].background == 'dark')
	{
		$(wrap).parent('div').css('background','#333');
	}
	else
	{
		$(wrap).parent('div').css('background','#fafafa')
	};
	
	for(var i = 0; i < theme.length; i++)
	{
		var el = document.createElement('li'),
			span = document.createElement('span');
		$(el).attr('data-lookup',i)	
		$(span).html(theme[i].displayText)
			.css({
					'font-size' : theme[i].size, 
					'font-family' : theme[i].style,
					'line-height' : theme[i].lineHeight,
					'font-weight' : theme[i].weight,
					'color' : theme[i].fill,
					'width':'auto',
					'text-shadow': 'none'
				});
		$(el).append(span);		
		$(wrap).append(el);
	};
};

function addIText(value, theme, lookUp)
{	
	canvas.deactivateAll();
	var text = new fabric.IText(value, {					
					fontFamily: theme[lookUp].style,
					originX:'center',									
					originY:'center',	
					left: $('canvas').width()/2,			
					top: $('canvas').height()/2,
					fill: theme[lookUp].fill,
					fontSize: theme[lookUp].size, 
					lineHeight: theme[lookUp].lineHeight,
					scaleX:1,
					scaleY:1,
					active: true
				});	
	canvas.add(text);
	$('#fontFamily').val(text.fontFamily);
	canvas.renderAll();
};

/*======================================*/

function Palette(activeObj, colours)
{
	this.activeObj = activeObj;
	this.colours = colours;
	this.init();
};

Palette.prototype.paletteCreateColours = function()
{
	var colours;
	colours = eval(this.colours);

	for(var i = 0; i < colours.length; i++)
	{
		var wrap, block;
		wrap = document.createElement('li');			
		block = document.createElement("span");
		$(wrap).attr('id', colours[i]);
		$(block).css('background' , 'rgb' + colours[i]);
		
		if(i==0)
		{
			$(wrap).addClass('selected')
		};
		
		$(wrap).append(block);
		$('#colourContainer').append(wrap);
	}
};

Palette.prototype.userInput = function(inputType, wrap, el, callback)
{
	var $this = this;
	$(wrap).on(inputType, el, function(event)
	{	
		event.preventDefault();
		var el = this;
		callback($this, el, event);
	});
};

Palette.prototype.manageEvents = function()
{	
	var $this,
	$this = this;
	
	$('#trash').on('click', function()
	{
		canvas.remove($this.activeObj);
		$this.hideSubMenus();
		canvas.renderAll();
	});
	
	$('#grow').on('click', function()
	{
		if(!$this.activeObj) return;
		$this.activeObj.height = $this.activeObj.height * 1.06;
		$this.activeObj.width = $this.activeObj.width * 1.06;
		canvas.renderAll();
	});
	
	$('#shrink').on('click',function()
	{
		if(!$this.activeObj) return;
		$this.activeObj.height = $this.activeObj.height * 0.94;
		$this.activeObj.width = $this.activeObj.width * 0.94;
		canvas.renderAll();
	});
	
	$('#back').on('click', function()			/*========== Check export ============*/
	{
		canvas.sendBackwards($this.activeObj);
		if($this.activeObj == canvas.item(0))
		{
			canvas.bringForward($this.activeObj);
		}
	});
	
	$('#forward').on('click', function()
	{
		if(!$this.activeObj) return;
		canvas.bringForward($this.activeObj);
	});
	
	$('#palette li a').on('click', function()
	{
		var target;
		target = $(this).next('ul');
		target.toggle();
	});	
	
	$('#opacity').on('change', function()
	{
		if(!$this.activeObj) return;
		$this.activeObj.opacity = $(this).val()*.01;
		canvas.renderAll();
	});
	
	$('#greyscale').on('click', function()
	{
		var filter, check;
		
		filter = new fabric.Image.filters.Grayscale();
		check = true;

		$this.activeObj.filters.push(new fabric.Image.filters.Grayscale());
		$this.activeObj.applyFilters(canvas.renderAll.bind(canvas));
		canvas.renderAll();
	});
	
	$('#imageColour').on('click', function()
	{
		var filter, check;
		
		filter = new fabric.Image.filters.Grayscale();
		check = true;

		$this.activeObj.filters = [];
		$this.activeObj.applyFilters();
		canvas.renderAll();
	});
	
	$('#colourContainer').on('click','li', function()
	{
		var colour = 'rgb' + $(this).attr('id');
		$this.activeObj.fill = colour;
		canvas.renderAll();
	});
	
	$('#alignLeft').on('click', function()
	{
		$this.activeObj.textAlign = 'left';
		canvas.renderAll();
	});
	
	$('#alignCenter').on('click', function()
	{
		$this.activeObj.textAlign = 'center';
		canvas.renderAll();
	});
	
	$('#alignRight').on('click', function()
	{
		$this.activeObj.textAlign = 'right';
		canvas.renderAll();
	});
	
	$('#fontSize').on('change', function()
	{
		if(!$this.activeObj) return;
		var value = $this.activeObj.fontSize;
		$this.activeObj.fontSize = $(this).val();
		canvas.renderAll();
	});
	
	$('#lineHeight').on('change', function()
	{
		if(!$this.activeObj) return;
		$this.activeObj.lineHeight = $(this).val();
		canvas.renderAll();
	});
	
	$('#fontFamily').on('change',function()
	{
		if(!$this.activeObj) return;
		$this.activeObj.fontFamily = $(this).val();
		canvas.renderAll();
	});
	
}; 

Palette.prototype.isRealValue = function(activeObj)
{
	return activeObj && activeObj !== "null" && activeObj!== "undefined";
};		

Palette.prototype.addObj = function()
{
	var $this = this;
	
	canvas.on('object:added', function(event)
	{
		var activeObject = event.target;
		switch(activeObject.get('type'))
		{
			case 'image':
				$this.paletteType('image');
				$this.show();
				$this.activeObj = activeObject;
				break;
			case 'i-text':
				$this.paletteType('i-text');
				$this.show();
				$this.activeObj = activeObject;
				break;
			case 'Solid':
				$this.paletteType('solid');
				$this.activeObj = activeObject;
			case '':
				$this.hide();
				$this.activeObj = false;
				break;
		};
	});
};

Palette.prototype.show = function()
{
	$('#palette').removeClass('hide-scale');
};

Palette.prototype.hide = function()
{
	$('#palette').addClass('hide-scale');
};

Palette.prototype.modified = function()
{
	var $this = this;
	
	canvas.on('object:modified', function(event)
	{
		$this.activeObj = event.target;
	});
	
	canvas.on('object:removed' , function(event)
	{
		$this.activeObj = false;
		$this.hide();
	});
	
	canvas.on('canvas:cleared', function(event)
	{
		$this.activeObj = false;
		$this.hide();
	});
	
	canvas.on('selection:cleared', function(event)
	{
		$this.activeObj = false;
		$this.hide();
	});
	
	canvas.on('selection:created', function(event)
	{
		console.log('selection made');
		$this.show();
	});
	
	/*===== remove when I can get selection created to work ====*/

	if(canvas.getActiveObject() == null)
	{
		$this.activeObj = false;
	}
	else
	{
		$this.show();
		$this.activeObj = canvas.getActiveObject();
	}
	
};

Palette.prototype.hideSubMenus = function()
{
	$('#palette li ul').css('display','none');
};

Palette.prototype.paletteType = function(type)
{
	var wrap, children, textObjs, imageObjs, solidObjs;
	
	wrap = $('#palette');
	children = $('#palette li');
	childrenChildren = $('#palette li ul li');
	textObjs = ['textStyle','colourPalette', 'back', 'forward', 'trash'];
	imageObjs = ['filter','back', 'forward', 'grow', 'shrink', 'trash'];
	solidObjs = ['colour','textStyle','back', 'forward', 'grow', 'shrink', 'trash'];
	
	switch(type)
	{
		case 'i-text':
			children.addClass('hidden');
			childrenChildren.removeClass('hidden');
			for(var i= 0; i < textObjs.length; i++)
			{
				var obj = document.getElementById(textObjs[i]);
				$(obj).removeClass('hidden');
			};
			break;	
		
		case 'image':
			children.addClass('hidden');
			childrenChildren.removeClass('hidden');
			for(var i= 0; i < imageObjs.length; i++)
			{
				var obj = document.getElementById(imageObjs[i]);
				$(obj).removeClass('hidden');
			};
			break;
			
		case 'Solid':
			children.addClass('hidden');
			childrenChildren.removeClass('hidden');
			for(var i= 0; i < solidObjs.length; i++)
			{
				var obj = document.getElementById(solidObjs[i]);
				$(obj).removeClass('hidden');
			};
			break;	
	}
};

Palette.prototype.initKeyboard = function()
{
	var $this = this;
	
	var zoomBy = function(x, y, z) 
	{
		var activeObject = $this.activeObj;
		if (activeObject)
		{
			activeObject.zoomBy(x, y, z, function(){canvas.renderAll()});
		}
	};
	
	var objManip = function(prop, value) 
	{
		var obj = $this.activeObj;
		if (!obj) { return true; }
		
		switch(prop)
		{
			case 'zoomBy-x':
				obj.zoomBy(value, 0, 0, function(){canvas.renderAll()});
				break;
			case 'zoomBy-y':
				obj.zoomBy(0, value, 0, function(){canvas.renderAll()});
				break;
			case 'zoomBy-z':
				obj.zoomBy(0, 0, value, function(){canvas.renderAll()});
				break;
			default:
				obj.set(prop, obj.get(prop) + value);
				break;
		}

		if ('left' === prop || 'top' === prop) 
		{ 
			obj.setCoords(); 
		}
		
		canvas.renderAll();
		return false;
	};
	
	document.onkeydown = function(event)
	{
		var key = window.event ? window.event.keyCode : event.keyCode;
		switch(key) 
		{
			case 37: // left
				if (event.shiftKey) {
					return objManip('zoomBy-x',-1); return false;
				}
				if (event.ctrlKey || event.metaKey) {
					return objManip('angle', -1);
				}
				return objManip('left', -1);
			case 39: // right
				if (event.shiftKey) {
					return objManip('zoomBy-x',1); return false;
				}
				if (event.ctrlKey || event.metaKey) {
					return objManip('angle', 1);
				}
				return objManip('left', 1);
			case 38: // up
				if (event.shiftKey) {
					return objManip('zoomBy-y', -1);
				}
				if (!event.ctrlKey && !event.metaKey) {
					return objManip('top', -1);
				}
				return true;
			case 40: // down
				if (event.shiftKey) {
					return objManip('zoomBy-y', 1);
				}
				if (!event.ctrlKey && !event.metaKey) {
					return objManip('top', 1);
				}
				return true;
			case 46 :
				 var activeObject = canvas.getActiveObject();
				 canvas.remove(activeObject);
				 $this.hideSubMenus();
				 return true;
		}
	};
};

Palette.prototype.init = function()
{
	var $this = this;
	this.hide();
	this.paletteCreateColours();
	this.addObj();
	this.hideSubMenus();
	this.manageEvents();
	this.initKeyboard();
	$('canvas').on('click', function()
	{
		$this.modified();
	});
	
	setTimeout(function()
	{
		$('#palette').removeClass('hidden');
	},400);
};