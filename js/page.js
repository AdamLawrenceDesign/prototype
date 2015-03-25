/***********************************************
	
	Function:	Page | Fabric UI
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

var canvas, placeholder;
			
function listCreateImg(wrap, subClass, callback)
{
	for(var i = 0; i < subClass.length; i++)
	{
		var obj = document.getElementById(wrap),
			li = document.createElement('li'),
			a = document.createElement('a'),
			img = document.createElement('img');
			
		$(li).append(a);
		$(a).append(img);
		$(obj).append(li);

		$(img).attr({'src': subClass[i].Path, 'alt': subClass[i].Name });
		$(a).attr({'data-id': subClass[i].ID, 'data-lookUp' : i});
	}
	
	callback();
};

/******************************/

function Page(product,themes)
{
	this.product = product;
	this.portrait = '';
	this.landscape = '';
	this.current = '';
	this.cropMarks = false;
	this.cropRatio = false;
	this.themes = themes;
	this.init();
}; 

Page.prototype.setUp = function()
{
	$('aside').css('margin-top', $('header').height() + 'px');		// , main
	$('#wrapAssets').css('height', window.innerHeight - ($('header').height()+($('#wrapSearch').height()*3)) + 'px');
	$('main').css('height', window.innerHeight - ($('header').height()+($('#wrapSearch').height()*2)) + 'px');
	$('#assetsShortcuts, #assetsThemes, #assetsImages, #assetsText').css('min-height', window.innerHeight - ($('header').height()+($('#wrapSearch').height()*3)) + 'px')
	$('body, main').css('overflow','hidden');
	this.downArrows();
};

Page.prototype.userInput = function(inputType, wrap, el, callback)
{
	var classes = this;
	$(wrap).on(inputType, el, function(event)
	{	
		event.preventDefault();
		var el = this;
		callback(classes, el, event);
	});
};

Page.prototype.setUpCanvas = function(width, height)
{
	var $this = this;
	
	this.setOrientation($('main').innerWidth()*.6, $('main').innerHeight()*.65, width, height, function(width,height)
	{
		canvas.clear();							// incase change during build
		setTimeout(function()
		{
			$this.setWidthHeight(width, height);
			canvas.add(placeholder);
			canvas.renderAll();
		},400 );
	});
	this.canvasResize();
};

Page.prototype.setWidthHeight = function(width,height)
{
	var $this;
	$this = this;
	
	$('canvas, .canvas-container').addClass('canvas-transitions');
	
	canvas.setWidth(width);
	canvas.setHeight(height);
	placeholder.setWidth(width);
	placeholder.setHeight(height);
	
	if(!this.cropMarks)
	{
		setTimeout(function()
		{
			$('#cropMark').css({'height': height*$this.cropRatio.width +'px','width': width*$this.cropRatio.width + 'px','display':'block'});
		},400);
	}
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
	var $this, string, width, height, insert, cropWidth, cropHeight, cropDisplay, wrapCrop;
	$this = this;
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
	
	this.userInput('click', '#zoom', '#canvasLarger', function(classes, el, event)
	{
		changeSize(eval(JSON.stringify(canvas).replace('{"objects":','').replace(',"background":"#fff"}','')),1.09, function(ratio)
		{
			cropDisplay(wrapCrop,ratio);
		});
	});
		
	this.userInput('click', '#zoom', '#canvasSmaller', function(classes, el, event)
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
	var rtime, timeout, delta, page, $this;
	
	$this = this;
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
			
			$this.setUp();
			
			switch ($this.current)
			{
				case 'landscape':
					$this.setUpCanvas($this.portrait.width, $this.portrait.height);
				break;
				
				case 'portrait':
					$this.setUpCanvas($this.landscape.width, $this.landscape.height);
				break;
			}
			
			setTimeout(function()
			{
				$('#screenChange').addClass('hidden');
			},200);
		}               
	}	
};

Page.prototype.scroller = function()
{
	var target, positions, wrap, wrapScrollTop, innerDivs, offset, spacer, id, type;

	positions = [];
	wrap = $('#wrapAssets');
	innerDivs = $('#wrapAssets div');
	spacer = document.createElement('div');
	wrap.append($(spacer).addClass('clearfix').css('height', '300' + 'px')); 

	function positionsUpdate()
	{
		wrapScrollTop = wrap.scrollTop();
		innerDivs.each(function(index, element)
		{
			id = $(this).attr('id'); 
			if(!id) return;
			type = id.slice(0,6);
			if(type == 'assets')
			{
				positions.push({name : id, offset : $(this).offset().top-wrap.offset().top + wrapScrollTop, height : $(this).height() });
			}			
		});
		return positions;
	};
	
	function makeSelected(obj, allObj, addClass)
	{
		$(allObj).removeClass(addClass);
		$(obj).addClass(addClass);
	};
	
	function manageScroll(el)
	{
		positionsUpdate();
		target = '#assets' + $(el).attr('data-link');
		
		for(var i = 0; i < positions.length; i++)
		{
			if(target.replace('#','') == positions[i].name)
			{
				offset = positions[i].offset;
			};
		};
		wrap.animate(
		{
			scrollTop : offset-20
		}).slimScroll(
		{
			scrollTo : offset	+ 'px'	
		});
	};
	
	this.userInput('click', '#tabs', 'a', function(classes, el, event)
	{
		manageScroll(el);
		makeSelected($(el).parent('li'), '#tabs li', 'selected');
	});
	
	this.userInput('click', '#shortcutTabs', 'a', function(classes, el, event)
	{
		manageScroll(el);
	});
	
	this.userInput('click', '.quickLinks', 'a', function(classes, el, event)
	{
		manageScroll(el);
	});
	
	wrap.slimscroll();
	
};

Page.prototype.downArrows = function()
{
	setTimeout(function()
	{
		$('.quickLinks a').addClass('bounce');
		setTimeout(function()
		{
			$('.quickLinks a').removeClass('bounce');
		},1000)
	},1000)
	
	$('.quickLinks, #tabs').on('click', 'a', function()
	{
		setTimeout(function()
		{
			$('.quickLinks a').addClass('bounce');
			setTimeout(function()
			{
				$('.quickLinks a').removeClass('bounce');
			},1000)
		},1000)
	});
	
	$('.quickLinks').on('mouseenter', 'a', function()
	{
		$(this).removeClass('bounce');
	});
};

Page.prototype.links = function()
{
	var $this;
	$this = this;
	
	$('.productLabel').html($this.product.description);
	
	$('.productsLink').on('click', function()
	{
		$(this).attr('href', 'products.html?' + $this.product.itemName);
	});
};

Page.prototype.showInfo = function()
{
	var $this, wrap;
	$this = this;
	wrap = $('#productInformation');
	
	wrap.find('.description').html($this.product.description);
	wrap.find('.itemName').html($this.product.itemName);
	wrap.find('.price').html('$ ' + $this.product.unitPrice);
	wrap.find('.productImage').attr('src','img/products/' + $this.product.id + '.jpg');
};

Page.prototype.resetPage = function()
{
	canvas.setWidth(0);
	canvas.setHeight(0);
	$('#cropMark').css('display','none');
};

Page.prototype.orientation = function()
{
	var $this;
	$this = this;

	$('#orientationLinks').on('click','a', function()
	{
		$this.resetPage();

		switch ($(this).attr('id'))
		{
			case 'landscape':
				$this.setUpCanvas($this.portrait.width, $this.portrait.height);
			break;
			
			case 'portrait':
				$this.setUpCanvas($this.landscape.width, $this.landscape.height);
			break;
		}
	});
	
	$('#zoom').on('click', '#rotate', function()
	{
		$this.resetPage();
		
		switch ($this.current)
		{
			case 'landscape':
				$this.setUpCanvas($this.landscape.width, $this.landscape.height);
			break;
			
			case 'portrait':
				$this.setUpCanvas($this.portrait.width, $this.portrait.height);
			break;
		}
	});
};

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
	this.links();
};

Page.prototype.addTheme = function()
{
	var $this, string;
	$this = this;
	
	$('#listThemes').on('click', 'a', function(event)
	{
		event.preventDefault();
		string = $this.themes.Themes[$(this).attr('data-lookUp')].JSON;
		$this.themeParseString(eval(string.replace('{"objects":','').replace(',"background":"#fff"}','')));
	});
};

Page.prototype.themeParseString = function(string)
{
	var $this;
	$this = this;
	
	if(string[0].width > string[0].height || this.current == 'landscape')				// landscape
	{	
		console.log('landscape');
		this.resetPage();
		this.setUpCanvas(this.landscape.width, this.landscape.height);
		setTimeout(function()
		{
			$this.buildTheme(string);
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
			$this.buildTheme(string);
		},400);
		return;
	}
	
};

Page.prototype.buildTheme = function(string)
{
	var $this, ratio, insert;
	
	$this = this;
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

Page.prototype.export = function()
{
	this.userInput('click', 'header', '#export', function(classes, el, event)
	{
		var string, url, groupName;
		
		url = window.location.href;
		groupName = url.substr(url.search("html?") + 5, url.length);
		string = JSON.stringify(canvas);
		console.log(string);
		
		window.location = 'http://192.168.0.177/_testing/prototype/payment.html';
		
	});	
};

Page.prototype.init = function()
{
	this.crop();							// This initialises canvas
	this.showInfo();
	this.scroller();
	this.windowResize();
	this.orientation();
	this.addTheme();
	this.export();
};
/*
	Resolutions 
	768 x 1024
	1366 x 768
	1920 x 1080
	1280 x 800
	1440 x 900
	320 x 568
*/