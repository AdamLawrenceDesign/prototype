/***********************************************
	
	Function:	Connect to Facebook
	Author: 	Adam Lawrence
	Contact: 	adam@adamlawrencedesign.com	
	
*************************************************/

var authResponse = [];

window.fbAsyncInit = function()
{
	FB.init(
	{
	  appId      : '860738033993862',
	  xfbml      : true,
	  version    : 'v2.2'
	});
};

(function(d, s, id)
{
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response)
{
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected')
	{
		// Logged into your app and Facebook.
		authResponse.push({ 
							'accessToken' : response.authResponse.accessToken, 
							'expiresIn' : response.authResponse.expiresIn,
							'signedRequest' : response.authResponse.signedRequest,
							'userID' : response.authResponse.userID
						});
		initAPI(authResponse);
	} 
	
	else if (response.status === 'not_authorized')
	{
	  // The person is logged into Facebook, but not your app.
	  document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
	} 
	
	else 
	{
	  // The person is not logged into Facebook, so we're not sure if
	  // they are logged into this app or not.
	  document.getElementById('status').innerHTML = 'Please log ' +  'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState()
{
	FB.getLoginStatus(function(response)
	{
	  statusChangeCallback(response);
	});
}

window.fbAsyncInit = function()
{
  FB.init({
	appId      : '860738033993862',
	cookie     : true,  // enable cookies to allow the server to access 
	status     : true,
	xfbml      : true,  // parse social plugins on this page
	version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response)
  {
	statusChangeCallback(response);
  });
  
};

// Load the SDK asynchronously
(function(d, s, id)
{
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function initAPI(authResponse)
{
	// console.log('Welcome!  Fetching your information.... ');
	
	FB.api('/me', function(response)
	{
		// console.log('Successful login for: ' + response.name);
		// document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
		getUserInfo();
		getUserProfileImage();
		// getAlbums(authResponse[0].userID);
		console.log('catch');
		window.location.assign('http://192.168.0.190/_testing/prototype/products.html');
	});
}

function getUserInfo()
{
	FB.api('/me', function(response)
	{
		$('#name').html(response.name);
		$('#mail').html(response.email);
		console.log(response);
	});
}

function getUserProfileImage()
{
	FB.api('/me/picture?type=normal', function (response)
	{
          document.getElementById("profileImage").setAttribute("src", response.data.url);
    });
};

function Logout()
{
	FB.logout(function()
	{
		document.location.reload();
	});
} 

function getAlbums(userID)
{
	var allPhotos = [];
	var accessToken = '';

	FB.api(
		'/' + userID + '/albums?fields=id,name',
		function(response)
		{
			for(var i = 0; i < response.data.length; i++)
			{
				var album = response.data[i];
				FB.api('/' + album.id + '/photos', function(photos)
				{
					if (photos && photos.data && photos.data.length)
					{
						for (var j=0; j < photos.data.length; j++)
						{
							var photo = photos.data[j];
							var image = document.createElement('img');
							image.src = photo.picture;
							document.body.appendChild(image);
					  	}
					}
				 });
			}
		}
	);
}
