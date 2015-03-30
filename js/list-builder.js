/***********************************************
	
	Function:	List Builder 
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function ListBuilder(wrap, obj, mGrid, callback)
{
	this.wrap = wrap;
	this.obj = obj;
	this.masonaryGrid = mGrid;
	this.callback = callback;
	this.init()
}

ListBuilder.prototype.addMasonary = function()
{
	var container = document.getElementById(this.wrap);
		
	/*======================= */ 	// Wait for images to load before setting masonary
	
	$('#' + this.wrap + ' img').load(function()
	{
		var masonry = new Masonry(container, 
		{
			columnWidth: 3,
			itemSelector: '.grid'
		});
	});
	
};

ListBuilder.prototype.init = function()
{
	for(var i = 0; i < this.obj.length; i++)
	{
		var wrap, li, a, img;
		
		wrap = document.getElementById(this.wrap);
		li = document.createElement('li');
		a = document.createElement('a');
		img = document.createElement('img');
			
		$(li).append(a);
		$(a).append(img);
		$(wrap).append(li);

		$(img).attr({'src': this.obj[i].Path, 'alt': this.obj[i].Name });
		$(a).attr({'data-id': this.obj[i].ID, 'data-lookUp' : i});
		
		/*======================= */ 	// Masonary Needed for list controls 
		
		if(this.masonaryGrid) $(li).addClass('grid');		
	}
		
	/*======================= */ 	// Apply call back if specified and check to apply masonary
	
	if(this.callback)	this.callback();
	if(this.masonaryGrid) this.addMasonary();
};