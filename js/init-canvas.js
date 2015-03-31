$(function()
{
	var url, id, product, itemName;

	url = window.location.href;
	id = url.substr(url.search("=") + 1, url.length);
	itemName = url.substring(url.lastIndexOf("?")+1,url.lastIndexOf("=")).replace(/%20/g,' ');
	
	/*================*/								// Set Up Canvas 
	
	$('#wrapCanvas').css('opacity','0');
	
	canvas = new fabric.Canvas('myCanvas',
	{
		backgroundColor:'#fff',
		selection: false,
	});
	
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
	
	canvas.setWidth(1);
	canvas.setHeight(1);
	placeholder.setWidth(1);
	placeholder.setHeight(1);
	// canvas.add(placeholder);
	
	/*================*/								// Make your server call
	
	$.ajax(
	{
		url: 'http://192.168.0.190/AdvAPI/api/WCAPValues/Photocreate/' + itemName + '/' + id,
		type: 'GET',
		username: 'WebAPIPhotocreateUser',
		password: '@dvw3b@piu$3r',
		success: function(data)
		{
			$.each(data, 
				function(index, value)
				{
					
					//============================= temporary 
					
					var themes = '';
					
					if(value.id == '41')
					{
						
						themes = {Themes:
									[
										{'ID':'11189','Name':'Theme 1','ImageName':'theme1.jpg','Path':'img/themeIcons/themes/theme1.jpg','JSON':
											'{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":500.01,"height":662.35,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"image","originX":"center","originY":"center","left":255.1,"top":293.69,"width":158,"height":236,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":3.24,"scaleY":3.24,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","src":"http://192.168.0.177/_testing/prototype/img/sampleImages/1.jpg","filters":[],"crossOrigin":""},{"type":"rect","originX":"center","originY":"center","left":243.96,"top":207.02,"width":120,"height":120,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.99,"scaleY":1.06,"angle":0,"flipX":false,"flipY":false,"opacity":0.77,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"i-text","originX":"center","originY":"center","left":239.91,"top":186.54,"width":342.71,"height":52,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.89,"scaleY":0.89,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"Happy Anniversary","fontSize":40,"fontWeight":"normal","fontFamily":"Georgia, serif","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"i-text","originX":"center","originY":"center","left":245.64,"top":230.54,"width":193.32,"height":52,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.46,"scaleY":0.48,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"2005 - 2015","fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true,"styles":{}}],"background":"#fff"}'										},
										{'ID':'11159','Name':'Theme 2','ImageName':'theme2.jpg','Path':'img/themeIcons/themes/theme2.jpg','JSON':
											'{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":500.01,"height":662.35,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"image","originX":"center","originY":"center","left":36.25,"top":347.68,"width":158,"height":105,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":6.8,"scaleY":6.8,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","src":"http://192.168.0.177/_testing/prototype/img/sampleImages/10.jpg","filters":[],"crossOrigin":""},{"type":"circle","originX":"center","originY":"center","left":106.94,"top":550.88,"width":60,"height":60,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":3.08,"scaleY":3.08,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","radius":30,"startAngle":0,"endAngle":6.283185307179586},{"type":"i-text","originX":"center","originY":"center","left":251.67,"top":533.55,"width":114.55,"height":49.28,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":3.41,"scaleY":3.41,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"Venice","fontSize":35.2,"fontWeight":"normal","fontFamily":"Verdana, Geneva, sans-serif","fontStyle":"","lineHeight":1.4,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"i-text","originX":"center","originY":"center","left":404.25,"top":610.76,"width":80,"height":52,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.93,"scaleY":0.93,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"2015","fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true,"styles":{}}],"background":"#fff"}'
										},
										{'ID':'11389','Name':'Theme 3','ImageName':'theme3.jpg','Path':'img/themeIcons/themes/theme3.jpg','JSON':
											'{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":500.01,"height":662.35,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"image","originX":"center","originY":"center","left":261.67,"top":301.18,"width":158,"height":210,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":4.35,"scaleY":4.35,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","src":"http://192.168.0.177/_testing/prototype/img/sampleImages/3.jpg","filters":[{"type":"Grayscale"}],"crossOrigin":""},{"type":"rect","originX":"center","originY":"center","left":35.46,"top":373.6,"width":120,"height":120,"fill":"rgb(75,172,198)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.75,"scaleY":6.55,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"i-text","originX":"center","originY":"center","left":200.02,"top":550.33,"width":80,"height":52,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.56,"scaleY":2.56,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"2015","fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"i-text","originX":"center","originY":"center","left":199.64,"top":625.74,"width":295.53,"height":52,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.68,"scaleY":0.68,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"PARIS | FRANCE","fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"triangle","originX":"center","originY":"center","left":14.46,"top":32.12,"width":120,"height":120,"fill":"rgbundefined","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.24,"scaleY":0.05,"angle":89.79,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over"}],"background":"#fff"}'},
										/*
										{'ID':'11389','Name':'Theme 3','ImageName':'theme3.jpg','Path':'img/themeIcons/themes/theme4.jpg','JSON':
'{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":693.6,"height":523.6,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"image","originX":"center","originY":"center","left":353.64,"top":257.88,"width":161,"height":107,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":5.06,"scaleY":5.06,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","src":"http://192.168.0.177/_testing/prototype/img/sampleImages/10.jpg","filters":[],"crossOrigin":""},{"type":"rect","originX":"center","originY":"center","left":52.25,"top":271.13,"width":120,"height":120,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.62,"scaleY":4.89,"angle":0,"flipX":false,"flipY":false,"opacity":0.56,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"i-text","originX":"center","originY":"center","left":82.7,"top":258.46,"width":181.22,"height":49.28,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.51,"scaleY":2.51,"angle":89.96,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"HOLIDAYS","fontSize":35.2,"fontWeight":"normal","fontFamily":"Georgia, serif","fontStyle":"","lineHeight":1.4,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"i-text","originX":"center","originY":"center","left":580.54,"top":471.76,"width":144.24,"height":45.7,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.08,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"Venice 2013","fontSize":26.88,"fontWeight":"normal","fontFamily":"Georgia, serif","fontStyle":"","lineHeight":1.7,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true,"styles":{}}],"background":"#fff"}'
										},
										*/
										],
						}
					};
					
					var samplePage = new CanvasSetup(value, themes);
					var startControllers = new StandardControllers(value);
					var sampleUI = new FabricUI(
													'client information', 
													{Images:
													[
														{'ID':'1', 'Name':'Sample1','Path':'img/sampleImages/1.jpg','HighRes':'img/sampleImages/1.jpg'},
														{'ID':'2', 'Name':'Sample2','Path':'img/sampleImages/2.jpg','HighRes':'img/sampleImages/2.jpg'},
														{'ID':'3', 'Name':'Sample3','Path':'img/sampleImages/3.jpg','HighRes':'img/sampleImages/3.jpg'},
														{'ID':'4', 'Name':'Sample4','Path':'img/sampleImages/4.jpg','HighRes':'img/sampleImages/4.jpg'},
														{'ID':'5', 'Name':'Sample5','Path':'img/sampleImages/5.jpg','HighRes':'img/sampleImages/5.jpg'},
														{'ID':'6', 'Name':'Sample6','Path':'img/sampleImages/6.jpg','HighRes':'img/sampleImages/6.jpg'},
														{'ID':'7', 'Name':'Sample7','Path':'img/sampleImages/7.jpg','HighRes':'img/sampleImages/7.jpg'},
														{'ID':'8', 'Name':'Sample8','Path':'img/sampleImages/8.jpg','HighRes':'img/sampleImages/8.jpg'},
														{'ID':'9', 'Name':'Sample9','Path':'img/sampleImages/9.jpg','HighRes':'img/sampleImages/9.jpg'},
														{'ID':'10', 'Name':'Sample10','Path':'img/sampleImages/10.jpg','HighRes':'img/sampleImages/10.jpg'},
														{'ID':'11', 'Name':'Sample11','Path':'img/sampleImages/11.jpg','HighRes':'img/sampleImages/11.jpg'},
														{'ID':'12', 'Name':'Sample12','Path':'img/sampleImages/12.jpg','HighRes':'img/sampleImages/12.jpg'},
													]}, 
													{
														ProductName:'Postcard 2x3',
														Parent:'Postcards',
														width:0,
														height:0,
														OtherProducts :
														[
															 {'Print Type':'Print','Name':'5x7_port.jpg','Path':'img/sizes/5x7_port.jpg','Name':'5 x 7" Print', 'ID':'00021','Orientation':'Portait','Price':'18','width':'5','height':'7'},
															 {'Print Type':'Print','ImgName':'5x7_land.jpg','Path':'img/sizes/5x7_land.jpg','Name':'5 x 7" Print', 'ID':'03001','Price':'13','Orientation':'Landscape','width':'7','height':'5'},
															 {'Print Type':'Print','ImgName':'6x8_port.jpg','Path':'img/sizes/6x8_port.jpg','Name':'5 x 7" Print','Name':'6 x 8" Print', 'ID':'04301','Price':'22','Orientation':'Landscape','width':'6','height':'8'},
															 {'Print Type':'Print','ImgName':'6x8_land.jpg','Path':'img/sizes/6x8_land.jpg','Name':'6 x 8" Print', 'ID':'111001','Price':'28','Orientation':'Landscape','width':'8','height':'6'},
															 {'Print Type':'Print','ImgName':'8x10_port.jpg','Path':'img/sizes/8x10_port.jpg','Name':'8 x 10" Print', 'ID':'03301','Orientation':'Portait','Price':'18','width':'8','height':'10'},
															 {'Print Type':'Print','ImgName':'8x10_land.jpg','Path':'img/sizes/8x10_land.jpg','Name':'8 x 10" Print', 'Price':'32','ID':'40001','Orientation':'Landscape','width':'10','height':'8'},
															 {'Print Type':'Print','ImgName':'8x12_port.jpg','Path':'img/sizes/8x12_port.jpg','Name':'8 x 12" Print', 'ID':'4441','Orientation':'Portait','Price':'18','width':'8','height':'12'},
															 {'Print Type':'Print','ImgName':'8x12_land.jpg','Path':'img/sizes/8x12_land.jpg','Name':'8 x 12" Print','Price':'12', 'ID':'33301','Orientation':'Landscape','width':'12','height':'8'},
															 {'Print Type':'Print','ImgName':'10x15_port.jpg','Path':'img/sizes/10x15_port.jpg','Name':'10 x 15" Print', 'ID':'012401','Orientation':'Portait','Price':'18','width':'10','height':'15'},
															 {'Print Type':'Print','ImgName':'10x15_land.jpg','Path':'img/sizes/10x15_land.jpg','Name':'10 x 15" Print', 'Price':'19', 'ID':'12341','Orientation':'Landscape','width':'15','height':'10'}
														],
														TextThemes : 
														[
															[
																{ Title : 'Heading', label : 'h1', displayText:'Add Headline', text:'Your Headline', background: 'light', style : 'Verdana, Geneva, sans-serif', size : 35.2 , lineHeight : 1.4,  weight : 500, fill: '#292f33', },
																{ Title : 'SubHeading', label : 'h2', displayText:'Add Subheading', text:'Your Subheading', background: 'light', style : 'Georgia, serif', size : 26.88 , lineHeight : 1.7,  weight : 500, fill: '#a3acb2'},
																{ Title : 'Parragraphy', label : 'p', displayText:'Add Parragraph', text:'Your Parragraph', background: 'light', style : 'Verdana, Geneva, sans-serif', size : 16 , lineHeight : 1.62,  weight : 500, fill: '#292f33'},
															],
															[
																{ Title : 'Heading', label : 'h1', displayText:'Add Headline', text:'Your Headline', background: 'dark', style : 'Verdana, Geneva, sans-serif', size : 35.2 , lineHeight : 1.4,  weight : 500, fill: '#fff', },
																{ Title : 'SubHeading', label : 'h2', displayText:'Add Subheading', text:'Your Subheading', background: 'dark', style : 'Georgia, serif', size : 26.88 , lineHeight : 1.7,  weight : 500, fill: '#fafafa'},
																{ Title : 'Parragraphy', label : 'p', displayText:'Add Parragraph', text:'Your Parragraph', background: 'dark', style : 'Verdana, Geneva, sans-serif', size : 16 , lineHeight : 1.62,  weight : 500, fill: '#fff'},
															],
															[
																{ Title : 'Heading', label : 'h1', displayText:'Add Headline', text:'Your Headline', background: 'light', style : 'Tahoma, Geneva, sans-serif', size : 35.2 , lineHeight : 1.4,  weight : 500, fill: '#292f33', },
																{ Title : 'SubHeading', label : 'h2', displayText:'Add Subheading', text:'Your Subheading', background: 'light', style : 'Arial, Helvetica, sans-serif', size : 26.88 , lineHeight : 1.7,  weight : 300, fill: '#a3acb2'},
																{ Title : 'Parragraphy', label : 'p', displayText:'Add Parragraph', text:'Your Parragraph', background: 'light', style : 'Arial, Helvetica, sans-serif', size : 16 , lineHeight : 1.62,  weight : 500, fill: '#a3acb2'},
															],
														],
														TextObjects : 
														[
															{
																'ID':'TextObject1','Name':'TextObject1','Path':'img/sampleText/1.jpg','JSON':'{"objects":[{"type":"rect","originX":"center","originY":"center","left":228.81,"top":151.03,"width":120,"height":120,"fill":"rgb(31,73,125)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.63,"scaleY":1.12,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"i-text","originX":"center","originY":"center","left":225.39,"top":141.36,"width":274,"height":40,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.97,"scaleY":0.97,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"SAMPLE TEXT","fontSize":40,"fontWeight":"normal","fontFamily":"Georgia, serif","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"i-text","originX":"center","originY":"center","left":226.36,"top":172.57,"width":339,"height":40,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.48,"scaleY":0.48,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"New and Improved","fontSize":40,"fontWeight":"normal","fontFamily":"Tahoma, Geneva, sans-serif","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","path":null,"textBackgroundColor":"","useNative":true,"styles":{}}],"background":"#fafafa"}'
															},
															{
																'ID':'TextObject2','Name':'TextObject1','Path':'img/sampleText/2.jpg','JSON':'{"objects":[{"type":"circle","originX":"center","originY":"center","left":111.92,"top":102.08,"width":60,"height":60,"fill":"rgb(75,172,198)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":3.08,"scaleY":3.08,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","radius":30,"startAngle":0,"endAngle":6.283185307179586},{"type":"i-text","originX":"center","originY":"center","left":112.25,"top":98.02,"width":168,"height":40,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.93,"scaleY":0.93,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"Sample 2","fontSize":40,"fontWeight":"normal","fontFamily":"Arial, Helvetica, sans-serif","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"i-text","originX":"center","originY":"center","left":111.81,"top":127.41,"width":306,"height":40,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.38,"scaleY":0.37,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"More Information","fontSize":40,"fontWeight":"normal","fontFamily":"Tahoma, Geneva, sans-serif","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","path":null,"textBackgroundColor":"","useNative":true,"styles":{}}],"background":"#fafafa"}'
															},
															{
																'ID':'TextObject3','Name':'TextObject1','Path':'img/sampleText/3.jpg','JSON':'{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":600,"height":400,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"rect","originX":"center","originY":"center","left":224.69,"top":79.4,"width":120,"height":120,"fill":"rgb(192,80,77)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":3.91,"scaleY":1.39,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"i-text","originX":"center","originY":"center","left":97.25,"top":105.02,"width":175,"height":40,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.93,"scaleY":0.93,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"Themes 3","fontSize":40,"fontWeight":"normal","fontFamily":"Arial, Helvetica, sans-serif","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"i-text","originX":"center","originY":"center","left":79.81,"top":135.19,"width":306,"height":40,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.38,"scaleY":0.38,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"More Information","fontSize":40,"fontWeight":"normal","fontFamily":"Tahoma, Geneva, sans-serif","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"triangle","originX":"center","originY":"center","left":422.78,"top":111.89,"width":120,"height":120,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.45,"scaleY":0.12,"angle":270.46,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over"}],"background":"#fafafa"}'
															},
															{
																'ID':'TextObject3','Name':'TextObject1','Path':'img/sampleText/4.jpg','JSON':'{"objects":[{"type":"rect","originX":"center","originY":"center","left":114.17,"top":149.08,"width":120,"height":120,"fill":"rgb(155,187,87)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.95,"scaleY":2.51,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","rx":0,"ry":0},{"type":"i-text","originX":"center","originY":"center","left":99.8,"top":247.74,"width":176,"height":40,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.96,"scaleY":0.96,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"Theme 4","fontSize":40,"fontWeight":"normal","fontFamily":"Verdana, Geneva, sans-serif","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"i-text","originX":"center","originY":"center","left":79.54,"top":276.92,"width":423,"height":40,"fill":"rgb(250,250,250)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.3,"scaleY":0.3,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"MORE INFORMATION","fontSize":40,"fontWeight":"normal","fontFamily":"Verdana, Geneva, sans-serif","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","path":null,"textBackgroundColor":"","useNative":true,"styles":{}},{"type":"triangle","originX":"center","originY":"center","left":19.24,"top":36.97,"width":120,"height":120,"fill":"rgbundefined","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.33,"scaleY":0.08,"angle":89.79,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over"}],"background":"#fafafa"}'
															},
														],
													},
														themes
													);
								}
			);
			
			
		}
	});
	
									
	var standardPalette = new Palette(false, "['(0,0,0)','(250,250,250)','(238,236,225)','(31,73,125)','(79,129,189)','(192,80,77)','(155,187,87)','(128,100,162)','(75,172,198)','(247,150,70)']");
	
});
