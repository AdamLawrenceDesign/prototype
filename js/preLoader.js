/***********************************************
	
	Function:	PreLoader
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function PreLoadImages(value)
{
	this.value = value;
	this.init();
}

PreLoadImages.prototype.init = function()
{
	var images, value;
	
	images = [];
	value = this.value;
	
	window.onload = function()
	{
		for (var i = 0; i < value.length; i++)
		{
			images[i] = new Image();
			images[i].src = value[i];
		}
	};
};