/***********************************************
	
	Function:	Standard Page Controllers
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function StandardControllers(webSiteName, userID, productID, product)
{
	this.webSiteName = webSiteName;
	this.userID = userID;
	this.productID = productID;
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

StandardControllers.prototype.postToCart = function(jsonID, string)
{
	var cartValue, WebClientAssetId, ProductId, ImageUrl, ProductDescription, ProductName,	Price, Quantity, DiscountAmount, TotalAmount, WebDataItem, SICCode, WebClientID, PortalName;
	
	WebClientAssetId =  '21674';         // 301412 (prepay – but we will create a new one)
	ProductId        = this.productID;    						 // 23 (mug)
	ImageUrl         = '~/_testing/prototype/' + $('.productImage').attr('src');         // (a snip from the final design – or thumbnail from the webclientassetid or ProductID)
	ProductDescription = $('.description').html();       // Standard Mug – Right Handed
	ProductName      = $('.itemName').html();         // Standard Mug
	Price            = $('.price').html().replace('$','').replace(/\s/g,'1');         // 19.95 (unit price) 
	Quantity         = $('#qty').val();        // 1
	DiscountAmount   = 0;         				//   0
	TotalAmount      = parseInt($('.price').html().replace('$ ','')) * parseInt($('#qty').val());			//  19.95
	WebDataItem      = 'OrderType=' + 'Photocreate' + '_ProductID=' + this.productID + '_JSONID=' + jsonID;         //  OrderType=Photocreate|ProductID=23|JSONID=1001 (|=line returns)
	SICCode          = 'TBBMDNY52';			//  ‘Get the sic code’	Sample added
	WebClientID      = '21674';         			// ‘Get Encrypted Code’
	PortalName       = '[advancedyou-school]';          //  ‘’
	
	cartValue = 
		'WebClientAssetId=' + WebClientAssetId + 
		'&ProductId=' + ProductId + 
		'&ImageUrl=' + ImageUrl +  
		'&ProductDescription=' + ProductDescription + 
		'&ProductName=' + ProductName + 
		'&Price=' + Price + 
		'&Quantity=' + Quantity + 
		'&DiscountAmount=' + DiscountAmount + 
		'&TotalAmount=' + TotalAmount +
		'&WebDataItem=' + WebDataItem +
		'&SICCode=' + SICCode +
		'&WebClientID=' + WebClientID +
		'&PortalName=' + PortalName;
	
	console.log(cartValue);
	
	$.ajax(
	{
		url: 'http://192.168.0.190/AdvAPI/api/WJValues/' + jsonID,
		type: 'PUT',
		username: 'WebAPIPhotocreateUser',
		password: '@dvw3b@piu$3r',
		data: 
		{
			"json": string,				// json
		},
		success: function(data)
		{
			console.log('JSON String Updated');
			console.log(cartValue);
			//_this.postToCart();
			// window.location = 'http://192.168.0.190/cartLink.aspx?' + cartValue;
		}
	});
	
};

StandardControllers.prototype.export = function()
{
	var _this, string, url, groupName, webSiteName, productID, tempString;
	_this = this;
	
	$('header').on('click', '#export', function()
	{
		// url = window.location.href;
		// groupName = url.substr(url.search("html?") + 5, url.length);
		string = JSON.stringify(canvas);
		tempString = new Date() + Math.floor(Math.random() * 100000);

		/*=====================================*/
		// Add Information to the Layouts table
		
		$.ajax(
		{
			url: 'http://192.168.0.190/AdvAPI/api/WJValues',
			type: 'POST',
			username: 'WebAPIPhotocreateUser',
			password: '@dvw3b@piu$3r',
			data: 
			{
				"fromWhere": 		_this.webSiteName ,		// Portal Name
				"json": 			tempString,				// json
				"webOrderItemID": 	_this.productID,			// Product ID
				"userID": 			_this.userID				// UserID
			},
			success: function(data)
			{
				console.log('Success: item added to table');
				console.log(data);
				assignJSONID();
			}
		});

		/*=====================================*/
		// Retrive jsonID from database
		
		var assignJSONID = function()
		{
			$.ajax(
			{
				url: 'http://192.168.0.190/AdvAPI/api/WJValues',
				type: 'GET',
				username: 'WebAPIPhotocreateUser',
				password: '@dvw3b@piu$3r',
				success: function(data)
				{
					$.each(data, 
						function(index, value)
						{
							if(value.json == tempString)
							{
								console.log(value.jsonID);
								_this.postToCart(value.jsonID, string);
							}
						}
					);
				}
			});
		}

	});
	
};

StandardControllers.prototype.init = function()
{
	this.links();
	this.showInfo();
	this.export();
};