/***********************************************
	
	Function:	Display Products
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

$(function()
{
	var url, groupName;
	
	url = window.location.href;
	groupName = url.substr(url.search("html?") + 5, url.length);
	
	$('#resultsGroupName').css('display','none');
	
	$.ajax(
	{
		url: 'http://192.168.0.177/AdvAPI/api/WCAPValues/Photocreate/', 
		type: 'GET',
		username: 'WebAPIPhotocreateUser',
		password: '@dvw3b@piu$3r',
		success: function(data)
		{
			var images = [];
			$.each(data, 
				function(index, value)
				{
					images.push('img/products/' + value.id + '.jpg');
				}
			);
			var preLoadProducts = new PreLoadImages(images);
		}
	});
	
	$.ajax(
	{
		url: 'http://192.168.0.177/AdvAPI/api/WCAPValues/Photocreate/DistinctItemName', 
		type: 'GET',
		username: 'WebAPIPhotocreateUser',
		password: '@dvw3b@piu$3r',
		success: function(data)
		{
			var loadFirstLevel = new CreateList(data, '');
		}
	});

});