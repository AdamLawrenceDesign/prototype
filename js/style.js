/***********************************************
	
	Function:	Manipulate Page Style
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function Style(colours)
{
	this.colours = colours;
	this.init();
}

Style.prototype.init = function()
{
	$('.prm').css('background-color', this.colours[0].prm);												// blue style default
	$('.sec').css('background-color',  this.colours[0].sec);   				// Sec
	$('.prm_lt').css('background-color', this.colours[0].lt);						// lt
	$('.button_dk').css('background-color',  this.colours[0].op);					// op
	$('.links_line_left li a').css('border-left-color', this.colours[0].op);		// lt
	$('.links_line_right li a').css('border-right-color',  this.colours[0].op);		// lt
	$('blockquote p').css('border-color', this.colours[0].sec)
	$('a:hover').css('color', this.colours[0].op);
};

$(function()
{
	var darkColour = new Style([{ prm : '#00578a', sec : '#0099bc', lt : 'rgba(0, 0, 0, 0.5)', op : '#ffbb00'}]);
});
