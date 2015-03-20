/***********************************************
	
	Function:	Page | Fabric UI
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

var canvas, placeholder;
			
placeholder = new fabric.Rect(
			{
				left: 0,
				top: 0,
				fill:'#000',
				lockMovementX: true,
				lockMovementY: true,
				lockScalingX: true,
				lockScalingY: true,
				selectable: false,
				opacity:0,
			});

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

function Page(product)
{
	this.product = product;
	this.portrait = '';
	this.landscape = '';
	this.current = '';
	this.init();
}; 

Page.prototype.setUp = function()
{
	$('aside').css('margin-top', $('header').height() + 'px');		// , main
	$('#wrapAssets').css('height', window.innerHeight - ($('header').height()+($('#wrapSearch').height()*3)) + 'px');
	$('main').css('height', window.innerHeight - ($('header').height()+($('#wrapSearch').height()*2)) + 'px');
	$('#assetsShortcuts, #assetsThemes, #assetsImages, #assetsText').css('min-height', window.innerHeight - ($('header').height()+($('#wrapSearch').height()*3)) + 'px')
	// $('main').css('margin-top',$('header').height() + 'px');
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

Page.prototype.export = function()
{
	this.userInput('click', 'header', '#export', function(classes, el, event)
	{
		var string;
		string = JSON.stringify(canvas);
		console.log(string);
	});	
};

Page.prototype.setUpCanvas = function(width, height)
{
	var $this = this;
	
	this.setOrientation($('main').innerWidth()*.6, $('main').innerHeight()*.65, width, height, function(width,height)
	{
		canvas.clear();							// incase change during build
		$this.setWidthHeight(width, height);
		canvas.add(placeholder);
		canvas.renderAll();
		$('.canvas-container').css({'margin':'auto','position':'absolute'}).addClass('absolute_vert_center');		
	});
	this.canvasResize();
};

Page.prototype.setWidthHeight = function(width,height)
{
	$('canvas, .canvas-container').addClass('canvas-transitions');
	
	setTimeout(function()
	{
		canvas.setWidth(width);
		canvas.setHeight(height);
		placeholder.setWidth(width);
		placeholder.setHeight(height);
	},400);
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
	var string, width, height, insert;
	
	function changeSize(string, ratio)
	{
		string = eval(JSON.stringify(canvas).replace('{"objects":','').replace(',"background":"#fff"}',''));
		width = string[0].width*ratio;
		height = string[0].height*ratio;
		canvas.setWidth(width);
		canvas.setHeight(height);
		
		if($('main').innerWidth()-150 <= width*ratio) return;
		if($('main').innerHeight()-150 <= height*ratio) return;
		
		canvas.clear();
		
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
	
	this.userInput('click', '#zoom', '#canvasLarger', function(classes, el, event)
	{
		changeSize(string,1.09);
	});
		
	this.userInput('click', '#zoom', '#canvasSmaller', function(classes, el, event)
	{
		if($('canvas').height()<150)return;
		if($('canvas').width()<150)return;
		changeSize(string, .92);
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
	wrap.find('img').attr('src','img/products/' + $this.product.id + '.jpg');
};

Page.prototype.orientation = function()
{
	var $this;
	$this = this;
	
	$('#orientationLinks').on('click','a', function()
	{
		canvas.setWidth(0);
		canvas.setHeight(0);
		
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

Page.prototype.cropRatio = function()
{
	console.log(this.product.widthMM / this.product.fwidthMM)
	console.log(this.product.heightMM / this.product.fheightMM)
};

Page.prototype.init = function()
{
	console.log(this.product);
	this.setUp();
	this.setUpCanvas(this.product.pixW, this.product.pixH);
	
	if(this.product.pixW > this.product.pixH)				// landscape
	{	
		this.portrait = {'width':this.product.pixW, 'height': this.product.pixH };
		this.landscape = {'width':this.product.pixH, 'height': this.product.pixW };
	} 
	else													// Portrait
	{
		this.portrait = {'width':this.product.pixH, 'height': this.product.pixW };
		this.landscape = {'width':this.product.pixW, 'height': this.product.pixH };
	};
	this.cropRatio();
	this.links();
	this.scroller();
	this.showInfo();
	this.windowResize();
	this.orientation();
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