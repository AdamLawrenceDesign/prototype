/***********************************************
	
	Function:	Create List Item
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

function CreateList(data, groupName)
{
	this.data = data;
	this.groupName = groupName;
	this.init();
};

CreateList.prototype.nextLevel = function()
{
	var $this;
	$this = this;
	
	$('#resultsItemName').on('click', 'a', function(event)
	{
		$this.groupName = $(this).parent().attr('id');
		event.preventDefault();
		$('#resultsItemName').fadeOut(800);
		
		$.ajax(
		{
			url: 'http://192.168.0.190/AdvAPI/api/WCAPValues/Photocreate/' + $this.groupName,
			type: 'GET',
			username: 'WebAPIPhotocreateUser',
			password: '@dvw3b@piu$3r',
			success: function(data)
			{
				$.each(data, 
					function(index, value)
					{
						var obj;
						obj = $('#templateGroupName').clone();
						$(obj).find('a').attr('id', value.id);
						$(obj).find('.description').html(value.description);
						$(obj).find('.groupName').html(value.groupName);
						$(obj).find('.price').html('$ ' + value.unitPrice);
						$(obj).find('img').attr('src','img/products/' + value.id + '.jpg');
						$('#resultsGroupName').append(obj);
					}
				);
				$('.productLabel').html(data[0].itemName);
				$('#resultsGroupName').fadeIn(800);
			}
		});
		$this.loadPage();
	});
};

CreateList.prototype.loadPage = function()
{
	var $this;
	$this = this;
	
	$('#resultsGroupName').on('click', 'a', function(event)
	{
		$(this).attr('href','canvas.html?' + $this.groupName + '=' + $(this).attr('id'));
	});
};

CreateList.prototype.backToStart = function()
{
	$('.productsLink').on('click',function(event)
	{
		event.preventDefault();	
		$('#resultsGroupName').fadeOut(800, function()
		{
			$('#resultsItemName').fadeIn(800);
			$('#resultsGroupName').empty();
			$('.productLabel').html('');
		}); 
		
		
	});
};

CreateList.prototype.init = function()
{
	$.each(this.data, 
		function(index, value)
		{
			var obj, imgName;
			obj = $('#templateItemName').clone();
			imgName = value.itemName.replace(/ /g,'-');
			
			$(obj).attr('id', value.itemName);
			$(obj).find('.itemName').html(value.itemName);
			$(obj).find('img').attr('src','img/productTypes/' + imgName + '.jpg');
			$('#resultsItemName').append(obj);
		}
	);
	$('#templateItemName').remove();
	this.nextLevel();
	this.backToStart();
};