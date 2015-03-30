/***********************************************
	
	Function:	Scroll Manager
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function ScrollManager(wrap, children)
{
	var _this = this;
	this.wrap = $(document.getElementById(wrap));
	this.children = $(document.getElementById(wrap)).children(children);
	this.positions = [];
	this.selected = '';
	this.init();
}

ScrollManager.prototype.updatePositions = function(_this)
{
	var wrapST, id, type;
	
	wrapST = this.wrap.scrollTop();
	
	this.children.each(function()				// Remove from each statement index, element
	{
        id = $(this).attr('id');
		
		if(!id) return;							// Needs to have an id to be able to be scrolled to

		type = id.slice(0,6);					// Remove Assests from id name
		
		if(type == 'assets')
		{
			_this.positions.push({'name' : id, 'offset' : $(this).offset().top - _this.wrap.offset().top + wrapST, 'height' : $(this).height()});
		}
		
    });
};

ScrollManager.prototype.addSelected = function(obj, allObj, addClass)
{
	$(allObj).removeClass(addClass);
	$(obj).addClass(addClass);
};

ScrollManager.prototype.manageScroll = function(selected)
{
	var target, offset, _this;
	_this = this;
	
	this.updatePositions(_this);
	
	target = '#assets' + $(selected).attr('data-link');
	
	for(var i = 0; i < this.positions.length; i++)
	{
		if(target.replace('#','') == this.positions[i].name)
		{
			offset = this.positions[i].offset;
		}
	}
	
	this.wrap.animate(
	{
		scrollTop : offset-20
	}).slimScroll(
	{
		scrollTo : offset	+ 'px'	
	});
};

ScrollManager.prototype.userInput = function()
{
	var _this = this;
	
	$('#tabs').on('click', 'a', function()
	{
		_this.manageScroll(this);
		_this.addSelected($(this).parent('li'), '#tabs li', 'selected');
	});
	
	$('#shortcutTabs').on('click', 'a', function()
	{
		_this.manageScroll(this);
	});
	
	$('.quickLinks').on('click', 'a', function()
	{
		_this.manageScroll(this)
	});
};

ScrollManager.prototype.arrowControls = function()
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

ScrollManager.prototype.init = function()
{
	var _this = this;
	this.children.css('min-height', window.innerHeight - $('header').height() + 'px');
	this.updatePositions(_this);
	this.wrap.slimscroll();
	this.userInput();
	this.arrowControls();
};

/* To do - add scroll event listener and update current */
