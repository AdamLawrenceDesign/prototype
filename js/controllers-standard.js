/***********************************************
	
	Function:	Standard Page Controllers
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function StandardControllers(product)
{
	this.product = product;
	this.init();
};

StandardControllers.prototype.links = function()
{
	var _this;
	_this = this;
	
	$('.productLabel').html(_this.product.description);
	
	$('.productsLink').on('click', function()
	{
		$(this).attr('href', 'products.html?' + _this.product.itemName);
	});
};

StandardControllers.prototype.showInfo = function()
{
	var _this, wrap;
	_this = this;
	wrap = $('#productInformation');
	
	wrap.find('.description').html(_this.product.description);
	wrap.find('.itemName').html(_this.product.itemName);
	wrap.find('.price').html('$ ' + _this.product.unitPrice);
	wrap.find('.productImage').attr('src','img/products/' + _this.product.id + '.jpg');
};

StandardControllers.prototype.showInfo = function()
{
	var _this, wrap;
	_this = this;
	wrap = $('#productInformation');
	
	wrap.find('.description').html(_this.product.description);
	wrap.find('.itemName').html(_this.product.itemName);
	wrap.find('.price').html('$ ' + _this.product.unitPrice);
	wrap.find('.productImage').attr('src','img/products/' + _this.product.id + '.jpg');
};

StandardControllers.prototype.export = function()
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

StandardControllers.prototype.init = function()
{
	this.links();
	this.showInfo();
	this.export();
};