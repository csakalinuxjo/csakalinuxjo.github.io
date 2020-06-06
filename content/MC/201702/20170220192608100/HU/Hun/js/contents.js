var noresult = "";
var nosearch = "";
var k = "";
var p = 0;
var language = $("html").attr("data-language");
var cookieList = function(cookieName){
var cookie = $.cookie(cookieName);
var items = cookie ? cookie.split(/,/) : new Array();
	 return {
	  "add" : function(val){
	   items.push(val);
	   $.cookie(cookieName,items.join(','), {expires:365, path:'/'});
	  },
	  "clear" : function(){
	   items = null;
	   $.cookie(cookieName, null, {expires:-1, path:'/'});
	  },
	  "items" : function(){
	   return items;
	  }
	 }
	}

//공백제거
function trim(text){
	if(text){
		return text.replace(/(^\s*)|(\s*$)/g, "");
	}
}

function RightReplace(str, n){
	if(n <= 0){
		return "";
	}else if(n> String(str).length){
		return str;
	}else{
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

/*
*dom ready 시작
*/

$(document).ready(function(){


var language = $("html").attr("data-language");
	if(language=="HongKong" || language=="PRC Chinese" || language=="Taiwan" ){
		$(".C_URL").css({"word-break":"break-all"});
	}
	if(language=="Kazakh"){
		$("#home_txt").css({"top":"32px","line-height":"10px", "margin-left":"3px"});
	}
	if(language=="Thai"){
		$("span.model, .chapter_text2").css({"font-weight":"normal"});
	}
    if(language=="Turkish"){
		$("#home_txt").css({"margin-left":"-3px"});
		$("#toolbar").children("span:eq(1)").children("a").children("img").css({"margin-left":"-2px"});
	}
	if(language=="Lithuanian"){
		$("#home_txt").css({"margin-left":"-3px"});
		$("#search_txt").css({"margin-left":"-3px"});
		$("#main_search").css({"margin-right":"5px"});
		$("#toolbar").children("span:eq(1)").children("a").children("img").css({"margin-left":"-3px"});
    }
		//==>[뒤로가기] 버튼 링크 # 변경 : depth 이동로직으로 변경.

	//검색버튼 눌렀을 경우,
	$("#toolbar li:first-child a").live("click", function() {
		$.cookie("this_page_name", null ,{ expires: -1 });
		$.cookie('this_page_num', null ,{ expires: -1 });
		$.cookie("from_search", null ,{ expires: -1 });
		var link_j = location.href;
		var link_name = link_j.split("#");
		if(!/start_here.html/g.test(location.href)){
			$.cookie("this_page_name", link_name[0]);
			$.cookie('this_page_num', $("#count a.on").index());
			$.cookie("from_search", "1");
		}

	});

	//일반페이지에서 뒤로 버튼 눌렀을 경우
	$("#home_area a").attr("href","#");
	$("#home_area a").live("click", function() {

		if($("#count a:eq(0)").hasClass("on")) {
			location.href = "toc1.html";
		}
		else {
			if($(".real-con div[class*='Heading2']").index()>0){
				$(".real-con").get(0).go_page(0);
			}else{
				//alert($.cookie('safety_link'));
				location.href = $.cookie('safety_link');
			}
		}

		return false;
	});

	console.log($.cookie("this_page_name") + ", " + $.cookie('this_page_num') + ", " + $.cookie('from_search'));

	//search.html이 아니고, search.html 페이지에서 넘어온 값이 1이라면..
	if(!/search.html/g.test(location.href) && $.cookie("from_search") == "1" && $.cookie("this_page_name")== location.href) {
		setTimeout(function() {
			if(location.href.indexOf('#')!=-1){
				var page_num = parseInt($.cookie('this_page_num'));
				$(".real-con").get(0).go_page(page_num);
			}else{
				$(".real-con").get(0).go_page(0);
			}
		},600);
		setTimeout(function() {
			$.cookie("from_search", "0");
		},600);
	}
	//<==[뒤로가기] 끝.


	// content 내에 귀모양 이미지
	var srci='contents/images/M-soundout.png';
	$('img').each(function(){
		var imgsrc=$(this).attr('src');
		if(imgsrc==srci){
			$(this).addClass('hiden');
		var tarbox=$(this).parent().next();
			tarbox.prepend("<div class='soundout-box'><img src='contents/images/M-soundout.png' alt=''  /></div>");
		}
	});


	var list = new cookieList("sel_cate");
	//alert($.cookie('chap'));

	//다국어 message 자동넣기
	var language = $("html").attr("data-language");
	//if(language=="English"){
		$("#home_txt").text(message[language].home);
		$("#search_txt").text(message[language].search);
		$("#list_txt").text(message[language].list);
	//}else{
	//	$("#toolbar").css("margin-top","10px");
	//}
	$(".text_title > p").text(message[language].settings);
	$(".sizer_text > p").text(message[language].font_tit);
	$(".lssizer_text > p").text(message[language].line_tit);

	//좌우 이동 버튼 위치와 보이는 시간 설정
	/*$("#nav").css("top", $(document).height() / 2);
	$("#nav img").show();
	$("#nav").show("fast");
	setTimeout(function(){
		//$("#nav").hide("fast");
		$("#nav .btn_prev2, #nav .btn_next2").hide();
	},2400);*/

	setTimeout(function lt_rt(){
		$(".btn_prev2").css({
			'display':'block',
			'background':'rgba(204,204,204,0.5)',
			'position':'fixed',
			'z-index':'99999',
			'top':'40%',
			'left':'-50px',
			'width':'100px',
			'height':'100px',
			'-webkit-border-radius':'100px',
			'-moz-border-radius':'100px',
			'-webkit-animation':'ani1 0.4s',
		});
		$(".btn_next2").css({
			'display':'block',
			'background':'rgba(204,204,204,0.5)',
			'position':'fixed',
			'z-index':'99999',
			'top':'40%',
			'right':'-50px',
			'width':'100px',
			'height':'100px',
			'-webkit-border-radius':'100px',
			'-moz-border-radius':'100px',
			'-webkit-animation':'ani2 0.4s',
		});
		setTimeout(function lt_rt_hide(){
			$(".btn_prev2").animate({left:'-100px'});
			$(".btn_next2").animate({right:'-100px'});
		},3500);
	});

	//세팅 아이콘 클릭 시, 레이어 창 보여주기
	$(".settint_ico").click(function(){
		$('.text_s').css("visibility","visible");
	});

	//세팅 레이어 닫기 아이콘 클릭 시, 레이어 창 감추기
	$(".text_s .pop_close").click(function(){
		$('.text_s').css("visibility","hidden");
	});

	//search 카테고리 목차 불러오기
	var search_url = location.href.indexOf("search/search.html");
	if(search_url !== -1){
		for (i = 0; i < 3; i++) {
			$("#category_layer_"+(i+1)+" .category_wrap").append("<div class='category_list'></div>");
			$("#category_layer_"+(i+1)+" .category_list").load("../toc1.html #id_toc1 > ul:eq("+((i))+")");
		}
	}


	//콜아웃 확대 대상 이미지 클릭 시, 레이어 창 보여주기
	$("Table[class*='CallOut'] img[src*='i'], Table[class*='CallOut'] img[src*='i'], img[src*='image_size_icon.png'], img[src*='image_size_icon2.png']").live("click",	function(){
		
		$('.popup_img').css("display","block");
		
		if($(this).attr("src") !== "contents/images/template/image_size_icon.png" && $(this).attr("src") !== "contents/images/template/image_size_icon2.png") {
			$(".popup_img .image_area").html($(this).clone());
		}
		else {
			if($(this).parent().prev().children("img").attr("src")!=undefined){
				$(".popup_img .image_area").html($(this).parent().prev().children("img").clone());
			}else{
				var img_name  = "<img src='"+$(this).attr("rel")+"'>";
				$(".popup_img .image_area").html(img_name);
				
			}
		}
		
		if($.cookie('img_size_cookie') != null) {	
			$("#zoom_sd").val($.cookie('img_size_cookie'));
			img_size_change($.cookie('img_size_cookie'));		
		}else{			
			img_size_change('100');
			$.cookie('img_size_cookie', null);		
		}

		
	});
	//콜아웃 확대 대상 이미지 닫기 아이콘 클릭 시, 레이어 창 감추기
	$(".popup_img .pop_close").click(function(){
		$('.popup_img').css("display","none");
		$.cookie('img_size_cookie', null);
		$("#zoom_sd").val('100');
		img_size_change('100');
	});
	
			$(".zoom_icon1").live("click",function(){
			if($.cookie('img_size_cookie')==null){
				var plus_size = "100";
			}else{
				if(parseInt($.cookie('img_size_cookie'))<110){
					var plus_size = "100";
				}else{					
					var plus_size = parseInt($.cookie('img_size_cookie'))-10;
				}
			}
			
			$("#zoom_sd").val(plus_size);
			img_size_change(plus_size);
		});			
		
		$(".zoom_icon2").live("click",function(){
			if($.cookie('img_size_cookie')==null){
				var plus_size = "110";
			}else{
				if(parseInt($.cookie('img_size_cookie'))<190){
					var plus_size = parseInt($.cookie('img_size_cookie'))+10;
				}else{
					var plus_size = "200";
				}
			}
			$("#zoom_sd").val(plus_size);
			img_size_change(plus_size);
		});	
	

	$.cookie('click_page' , null ,{ expires: -1 });

	//=========================================================================== 초기 설정 시작 ==============================================================================================//

//gif이미지 동작 스크립트 merlot 2016-01-12
/*$(".Table_Motion img, .Table_Product img, .Table_Screen img").each(function(){
	if($(this).attr("src") == "contents/images/S-battery.png" ||
		$(this).attr("src") == "contents/images/S-battery2-4_singlesim.png" ||
		$(this).attr("src") == "contents/images/S-battery4.png" ||
		$(this).attr("src") == "contents/images/S-battery4_wireless.png" ||
		$(this).attr("src") == "contents/images/S-glancelighting.png" ||
		$(this).attr("src") == "contents/images/S-gesture_tap.png" ||
		$(this).attr("src") == "contents/images/S-gesture_tapandhold.png" ||
		$(this).attr("src") == "contents/images/S-gesture_drag.png" ||
		$(this).attr("src") == "contents/images/S-gesture_doubletap.png" ||
		$(this).attr("src") == "contents/images/S-gesture_swipe.png" ||
		$(this).attr("src") == "contents/images/S-gesture_spread_pinch.png" ||
		$(this).attr("src") == "contents/images/S-peopleglance_tray.png" ||
		$(this).attr("src") == "contents/images/S-curvedscreen_missed.png" ||
		$(this).attr("src") == "contents/images/S-curvedscreen_mypeople.png" ||
		$(this).attr("src") == "contents/images/S-notification.png" ||
		$(this).attr("src") == "contents/images/S-multiwindow_menu.png" ||
		$(this).attr("src") == "contents/images/S-multiwindow_drag.png" ||
		$(this).attr("src") == "contents/images/S-multiwindow_resize.png" ||
		$(this).attr("src") == "contents/images/S-beam.png" ||
		$(this).attr("src") == "contents/images/S-battery_dualsim.png" ||
		$(this).attr("src") == "contents/images/S-battery2-1_dualsim.png" ||
		$(this).attr("src") == "contents/images/S-battery2-4_dualsim.png" ) {
			var this_img_w = ($(this).width()) / 2;
			var this_img_h = ($(this).height() +40) / 2 * (-1);
			var img_id = $(this).attr("src").split(".");

			//$(this).parent("div").append("<img class='play_b' src='contents/images/template/play.png' width='40px' height='auto' style='float:right;margin-bottom:30px; z-index:9999;' /><div id='bvv' style='float:right;margin-top:6px;'><img src='contents/images/template/image_size_icon2.png' style='width:40px; height:auto; margin-top:-5px;margin-right:10px' rel='"+img_id[0]+".png' /></div>");
	}
});

$(".Table_Motion img[class='play_b'], .Table_Product img[class='play_b'], .Table_Screen img[class='play_b']").live("click", function(){
	var this_src = $(this).prev("img").attr("src");
	var this_src2 = this_src.split(".");

	$(".Table_Motion img, .Table_Product img, .Table_Screen img").each(function(){
		var t_src = $(this).attr("src");
		var t_src2 = t_src.split(".");
		$(this).attr("src", t_src2[0] + ".png");
		$(this).parent("div").children(".play_b").attr("src","contents/images/template/play.png");
	});
	if($(this).prev("img").attr("src") == "contents/images/S-battery.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-battery2-4_singlesim.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-battery4.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-battery4_wireless.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-glancelighting.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-gesture_tap.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-gesture_tapandhold.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-gesture_drag.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-gesture_doubletap.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-gesture_swipe.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-gesture_spread_pinch.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-peopleglance_tray.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-curvedscreen_missed.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-curvedscreen_mypeople.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-notification.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-multiwindow_menu.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-multiwindow_drag.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-multiwindow_resize.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-beam.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-battery_dualsim.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-battery2-1_dualsim.png" ||
		$(this).prev("img").attr("src") == "contents/images/S-battery2-4_dualsim.png") {

		if(this_src2[1] == "png" && $(this).attr("src") == "contents/images/template/play.png"){
			$(this).attr("src","contents/images/template/stop.png");
			$(this).prev("img").attr("src", this_src2[0] + ".gif");
		}else if (this_src2[1] == "gif" && $(this).attr("src") == "contents/images/template/stop.png"){
			$(this).attr("src","contents/images/template/play.png");
			$(this).prev("img").attr("src", this_src2[0] + ".png");
		}
	}
});
//gif이미지 동작 스크립트 끝

	var language_t = $("html").attr("data-language");
	$('body').find('img').each(function() {
		var this_img = $(this).attr("src");
		var strArray = this_img.split('/'); //strArray[1] : 이미지 이름
		strArray.reverse();
		try{
			for (var i=0, iLen = alt_img[language_t].length; i<iLen; i++) {
				if(strArray[0] == alt_img[language_t][i].name) {
					$(this).attr("alt", alt_img[language_t][i].alt);
				}
			}
		} catch(e) {
			console.log(e);
		}
	});
		2016-01-12 */
				
	var search_url = location.href.indexOf("search/search.html");
	var start_url = location.href.indexOf("start_here.html");	
	var deep = location.href.indexOf("#app");
	if(search_url==-1 && start_url ==-1){
		//초기 로딩이미지 보이기
		$("body").prepend("<div class='load_img' ><img src='contents/images/template/loading5.gif' style='width:50px; height:auto;' /></div>");
		$("div.heading1").css("visibility","hidden");
		$("#count").css("visibility","hidden");
		if(deep==-1){
			$(".real-con").css("display","none");
			$("#nav").css("display","none");	
			$("#count").css("visibility","hidden");			
		}

		$("#scrollmask span#chapter_2").css("display","none");
		$("#scrollmask span#chapter").css("display","none");
		//}, 1100);
		if(deep!==-1){
			setTimeout(function(){
			$("div.heading1").css("visibility","visible");
			$(".load_img").css("display","none");
			$("#nav").css("display","block");	
			$("#count").css("visibility","visible");
			}, 1300);
		}
		//초기 로딩이미지 보이기	
	}else{
		if(search_url!==-1){
		//$("#search_wrap").css("height", $(window).height()-10);
		$("#search_wrap").fadeIn(600);
		}
	}
		
	//가로, 세로 전환 시 효과
	//적용 1. jquery-1.8.2_bv.js 내 // 가로, 세로 페이지 기억을 위한 쿠키 생성 (핸드북용) 주석부분
	//적용 2. $("#touchSlider6").touchSlider({ counter내  가로, 세로 페이지 기억을 위한 쿠키 생성
	$(window).on("orientationchange", function(){
		//alert($(document).height());

		setTimeout(function(){
		$(".real-con").css("height", screen.height);
		},200);
	});
	
	if($.cookie('this_page') !== null && deep!==-1) {
		setTimeout(function(){
			$("#count a:eq(" + $.cookie('this_page') + ")").trigger("click");		
		},900);
		//},1300);
	}
	
	
	var start_url = location.href.indexOf("start_here.html");
	if(start_url==-1){
		
		//alert($.cookie('safety_txt')+"&"+$.cookie('safety_txt2'));
		var chap_txt = $("#scrollmask span#chapter").html();		
		var chap_num = (parseInt($.cookie('chap')));
		$.cookie('chap_name', chap_txt, { path : '/' });
		if($.cookie('chap')==0 || $.cookie('chap')==null ){
			$.cookie('chap', 4, { path : '/' });
		}
		//
		//목차 toc1.html 불러오기
		$("body").append("<div id='toc_info'></div>");
		$("#toc_info").css("display","none");
		$("#toc_info").load("toc1.html #id_toc1");
		
		//$("#scrollmask span#chapter").css("display","none");
		
		setTimeout(function(){		
			safety_link = $("#id_toc1").children("ul:last").children("li").children("a").attr("href");
			
			if($.cookie('safety_link')==null || $.cookie('safety_link')==""){
				$.cookie('safety_link', safety_link, { path : '/' });	
			}		
			
			safety_txt = $("#id_toc1").children("h1:last").children("img").next("span").text();			
			if($.cookie('safety_txt')==null || $.cookie('safety_txt')==""){
				$.cookie('safety_txt', safety_txt, { path : '/' });	
			}
			//$("#id_toc1 h1:last").remove();
			safety_txt2 = $("#id_toc1").children("h1:last").children("img").next("span").text();
			if($.cookie('safety_txt2')==null || $.cookie('safety_txt2')==""){
				$.cookie('safety_txt2', safety_txt2, { path : '/' });
			}
			var safety_first_page = location.href.indexOf($.cookie('safety_link'));
			if(chap_txt!=null){
				if(trim(chap_txt)==trim($.cookie('safety_txt')) && safety_first_page !== -1){
					$("#scrollmask span#chapter").text($.cookie('safety_txt2'));
				}
			}
				//$("#scrollmask span#chapter").css("display","block");					
				$("#toc_info h1.toc-chap").each(function(i){
					if(trim($(this).children(".chapter_text2").text()) == trim($("#scrollmask span#chapter").text())){
						$.cookie('chap', ($(this).index()/2), { path : '/' });
					}				
				});
				if(trim($("#scrollmask span#chapter").text()) == trim($.cookie('safety_txt'))){
					//alert('a');
					$.cookie('chap',3, { path : '/' });
				}	
		}, 500);
	}

	
	//초기 엘리먼트 생성
	setTimeout(function(){	
		if($(".real-con div[class*='Heading2']").size() > 1 || /settings.html/g.test(location.href)) { //Heading2가 2개 이상이고, settings와 같이 페이지 분리 된 것 아닌 경우에만 목차 생성
			$(".real-con div[class*='Heading2']:eq(0)").append("<div id='h2_contents'><div id='h2_contents_l'></div></div><div id='get_toc1'></div><div id='get_toc2'></div>");
		}
	},10);
	
	//마지막으로 이동하는 로직
	var first_url2 = location.href;
	var last_check = first_url2.indexOf("#last");
	if(last_check !== -1) { // #last 가 있다면 맨 뒤로 이동
	//if($.cookie('this_page') == 'last') {
	$("#scrollmask span#chapter_2").css("display","none");
	$("#scrollmask span#chapter").css("display","none");
		setTimeout(function(){			
			//$("#h2_contents_l").children("dl").siblings().last().children("dt").children("a").trigger("click");
			$(".real-con").get(0).go_page($(".real-con div[class*='Heading2']").size()-1); //코드개선
			//$("#h2_contents").css("display","block"); //목차 보이기
		},600);
		//},1600);
		$("div.heading1").css("visibility","hidden");
		
		setTimeout(function(){		
			$("div.heading1").css("visibility","visible");
			$(".load_img").css("display","none");
		}, 1700);
		//},1900);
	}
	//마지막으로 이동하는 로직
		
	//h2 이전 태그들 첫번째 h2안으로 이동
	$(".real-con").children("table:eq(0)").prependTo($(".real-con").children("div[class*=Heading2]:eq(0)"));
	$(".real-con").children(".Description:eq(0)").prependTo($(".real-con").children("div[class*=Heading2]:eq(0)"));
	//h2 이전 태그들 첫번째 h2안으로 이동
	
	//h2가 없는 H1을 위한 설정
	$(".Heading1-H3, .Heading1-TroubleShooting").css({"position":"relative", "margin-bottom":"20px"});
	$(".Heading1-H3, .Heading1-TroubleShooting").parent().prepend("<div><p>&nbsp</p></div>");
	
	//페이지 내 heading2를 가지고 있는지 체크
	if($(".real-con").children("div:eq(0)").attr("class") == "Heading2" || $(".real-con").children("div:eq(0)").attr("class") == "Heading2-APPLINK") {
		//alert("있음");		
	}/*else if($('div.heading1 :first').attr('class') == 'Table_Notice'){
		alert('tab;e')
	}*/
	else {
		//alert("없음");	
		//Safty 구분
		if($(".real-con").children("div:eq(0)").attr("class") == "Heading2-Safety"){
			$("h1.Heading1-Safety").prependTo(".real-con div.Heading2-Safety:eq(0)");			
			$("h1.Heading1-Safety").css({"position":"relative"});
		}
		else if($(".real-con .Heading2-TroubleShooting").size() > 0 ){
			$(".real-con .Description:eq(0)").prependTo(".real-con div.Heading2-TroubleShooting:eq(0)");
			$("h1.Heading1").prependTo(".real-con div.Heading2-TroubleShooting:eq(0)");
			$("h1.Heading1").css({"position":"relative"});
		}
		else {
			var realcon = $(".real-con").html();
			$(".real-con").html("");
			$(".real-con").html("<div class='Heading2'></div>");
			var safety_page = $("div.heading1").attr("id")+".html";
			if(trim($.cookie('safety_link'))==trim(safety_page)){
				$("#scrollmask span#chapter").text($.cookie('safety_txt2'));				
				//$(".real-con .Heading2").html("<h1 class='bv_h1' style='font-size: 28px; display: none;'>"+$.cookie('safety_txt')+"</h1>"+realcon);
				$(".real-con .Heading2").html(realcon);
			}else if($('div.heading1 :first').attr('class') == 'Table_Notice'){// heading1의처음자식이 div가 아닌 테이블인경우
				var tb_notice=$('div.heading1 :first').clone();
				$('div.heading1 :first').css('display','none');
				$(".real-con .Heading2").html(realcon);
				$(".real-con .Heading2").prepend(tb_notice)

			}else{
				$(".real-con .Heading2").html(realcon);
			
			}
			//$("#h2_contents_l").css("display","none");
		}
	}
	
	$("h1[class='Heading1']").attr("class","bv_h1");
	
	//h1의 첫번째 h2 숨김
	$("h1[class='Heading1-APPLINK']").attr("class","bv_h1-APPLINK");
	$("h1[class='Heading1-APPLINK-Simple']").attr("class","bv_h1-APPLINK");
	$("h1[class='Heading1-APPLINK-Nosub']").attr({"class":"bv_h1-APPLINK","rel":"Nosub"});
	$("h1[class='Heading1-APPLINK-Nosub-Intro']").attr({"class":"bv_h1-APPLINK","rel":"Nosub-Intro"});
	//첫번째 h1 자신을 숨기기 위한 id 값 추가
	$("h1[class='Heading1-Intro-Self']").attr("id","hide_self");
	$("h1[class*='Heading1-Intro']").attr("class","bv_h1-APPLINK");
	
	$(".bv_h1").prependTo($(".real-con div[class*=Heading2]:eq(0)"));
	$(".bv_h1-APPLINK").prependTo($(".real-con div[class*=Heading2]:eq(0)"));
	
	$("div.heading1").prepend("<h1 class='Heading1'>&nbsp;</h1>");
	
	//CTC 중국향
	$("h1.Heading1-NoTOC").prependTo($(".real-con div[class*=Heading2]:eq(0)"));
	

	
	//h2가 없는 H1을 위한 설정
	//=========================================================================== 초기 설정 끝 ==============================================================================================//


	//=========================================================================== UM, APP 구분 시작 ==============================================================================================//
	var first_url = location.href;
	var result = first_url.indexOf("#");
	var deep = RightReplace(first_url, 4);
	var setting_check = first_url.indexOf("settings.html");

	/////////////////////////////////////////////////////////////////////////////////////////////////
	////// #해시값이 있는 경우, TOC 클릭해서 들어온 경우 UM동작
	////// 집모양클릭 : start_here.html으로 이동,  목차모양클릭: toc1으로 이동 현재창
		var view_css = [/*"Heading3",*/ "Orderlist_1-1_Child","Orderlist_2-1_Child","Unorderlist_2-1","Unorderlist_1_2","Heading2-HIDE",/*"Heading3-HIDE",*/"Table_CallOut-Text-HIDE","Table_Note-HIDE","Table_Screen-HIDE", "Table_Note"];
	/////////////////////////////////////////////////////////////////////////////////////////////////

		if(deep!="#app"){

			$("#count").css("color","#646464");

			//위치 변경
			//$("#toolbar span:eq(2)").insertBefore($("#toolbar span:eq(0)"));
			//$("#toolbar span:eq(2) img").css("margin-bottom","3px");

			//UM에서도 숨기기/펼치기 보여달라는 요청에따른 코드 아래 추가
			//보이기/숨기기
			/*
			for(i=0; i < view_css.length; i++) {
				$("." + view_css[i]).css("display","none");
				$("." + view_css[i]).css("background-color","#f2f2f2");
			}
			*/

			//UM에서는 첫페이지 하단 목록 숨김설정, an introduction만 보임, bv_h1-APPLINK 을 가진 항목만 보임.
/*			setTimeout(function(){
				if($(".bv_h1-APPLINK").text() !== "") {

					//첫페이지 목차 갯수에 따라 보여줄 것인지, 숨길 것인지 판단.. 2개 이하이면 숨기기
					if($("#h2_contents_l").children("dl").size() == 1) {
						//alert($("#h2_contents_l").children("dl").size());
						$("#h2_contents").css("display","none");
					}
					else if($("#h2_contents_l").children("dl").size() > 1) {
						//alert($("#h2_contents_l").children("dl").size());
						$("#h2_contents").css("display","block");
					}

				}
				else {
					$("#h2_contents").css("display","none");
				}
			},400);*/
			//},1000);
			setTimeout(function(){
				if($(".bv_h1-APPLINK").text() !== "") {
					if($(".bv_h1-APPLINK").attr("rel")=="Nosub" || $(".bv_h1-APPLINK").attr("rel")=="Nosub-Intro"){
						$("#h2_contents").css("display","none");
					}
				}
				else {
					$("#h2_contents").css("display","none");
				}
			},100);
			//},1000);

			//상세매뉴얼이고, h1_Applink 인 경우 다음 첫번째 제목 숨김
			if($(".bv_h1-APPLINK").attr("rel")!="Nosub"){
				$(".bv_h1-APPLINK").next("h2[class*='Heading2']").hide();
			}
			first_url = first_url.split("#");
			//파일명.확장자
			var filename0 = first_url[1];
			//035287E7-B46E-47A0-8880-CD77FB94382C#771105BVTOC1
				if(filename0){
					filename0 = filename0.split("#");
				}else{
					filename0 = "";
				}

				//해시값 ID
				var filehash01 = filename0[0];

				//해시값 771105BVTOC1
				var filehash02 = first_url[1];

				//method1 실행 후, 동작 되도록 설정
				var method2 = function(menu_cnt){

					if(menu_cnt>7){
						time_up = 1600;
						time_up2 = 2000;
					}else{
						time_up = 1200;
						time_up2 = 1500;
					}

					if(filehash01 !== null) {
						setTimeout(function(){ //ggg
							var start00 = 1;
							$("#h2_contents_l dl").each(function(){

								if($(this).children("a").attr("id") == filehash01) {
									$(this).children("a").trigger("click");
								};
								start00 = start00 + 1;
							});
							$("dt a").each(function(){
								var sss = $(this).attr("href");
								if(sss){
									var sss0 = sss.split("#");
									var sss1 = parseInt(sss0[0]);
									var sss2 = sss0[1];
									if(sss2 == filehash01) {
										$.cookie('click_page', sss1);
										$(".real-con").get(0).go_page(sss1);
									};
								}
								start00 += 1;
							});
					},time_up);//ggg
					setTimeout(function(){ //ggg
							$("div.heading1").css("visibility","visible");
							$(".load_img").css("display","none");
							$(".real-con").css("display","block");
							var link_j = location.href;
							var results = link_j.split("#");
							//alert(results[1]);


								var h2_id = $("#"+results[1]).parent("div[class*='Heading3']").parent("div[class*='Heading2']").index();
								if(h2_id != -1){
									$(".real-con").get(0).go_page(h2_id);
									setTimeout(function(){
										$(".real-con div[class*='Heading2']:eq("+h2_id+")").animate({scrollTop:$("div[class*='Heading2']:eq("+h2_id+") h3[id='" + results[1] + "']").offset().top - 52}, 300);
									}, 200);
								}else{
									$(".real-con div[class*='Heading2']").animate({scrollTop: 0}, 1);
								}

							$("#nav").css("display","block");
							$("#count").css("visibility","visible");
						}, time_up2); // ggg
					}
				};

				//h1_Applink 인 경우, id=hode_slft 인경우 숨김
				setTimeout(function(){
					if( $("#hide_self").text() !== "") {


						$(".bv_h1-APPLINK").css("visibility","hidden");
						$(".real-con div.Heading2").css("margin-top", "-20px");

						//settings에서 본문 클릭시 제목 보이는 현상...
						$("div.heading1").live("click",function(){
							$(".bv_h1-APPLINK").css("visibility","hidden");
							$("div.Heading2:eq(0)").css("margin-top","-20px");
						});
					};
					$("#hide_self").hide();
					if($("#hide_self").css("visibility")=="hidden"){
						$("#hide_self").css("margin-top","0px");
					}
					$("#hide_self").parent(".Heading2").css("padding-top", "58px");

				},40);

				$("#toolbar li:eq(1)").live("click", function(){
					$.cookie("this_page_name", null ,{ expires: -1 });
					$.cookie('this_page_num', null ,{ expires: -1 });
					$.cookie("from_search", null ,{ expires: -1 });
				});
				$("#toolbar li:eq(2)").live("click", function(){
					$.cookie("this_page", null ,{ expires: -1 });
				});

		}
	/////////////////////////////////////////////////////////////////////////////////////////////////
	//////해시값이 없다면... 간단 매뉴얼인 경우  목차 숨김
	////// 집모양클릭 : 앱의 H1 첫페이지로 이동,  책모양으로 변경, 클릭: toc1으로 이동 새창
	/////////////////////////////////////////////////////////////////////////////////////////////////
		else {
			//상단 아이콘 위치이동
			//1. 책모양아이콘 돋보기 왼쪽으로 이동
			$("#top").children("#home_area").children('a').remove();
			$("#top").children("#home_area").append('<span><img src="contents/images/template/home_icon_app.png" alt="" id="deep_home" class="home2" /></span>');
			$("#home_txt2").text(message[language].home);
			//$("#top span:eq(1)").prepend("#toolbar");
			//$("#toolbar span:eq(1)").css("padding-right", "45px");
			$(".toc").css("margin-top", "-10px");
			//2. 홈 아이콘 왼쪽 상단으로 위치이동, 스크롤마스크 좌 여백 줄임
			//$(".home").css("margin-left","-30px");
			$("#scrollmask").css("margin-left","52px");


			//$("#toolbar #main_search").insertBefore($("#toolbar span:eq(0)"));
			//목차모양으로 변경 동작
			$("#toolbar li:eq(0)").remove();
			$("#toolbar li:eq(1)").remove();
			$("#toolbar li:eq(0) img").attr("src","contents/images/template/um_icon.png");
			$("#toolbar li:eq(0) img").addClass("toc_um");
			$("#toolbar li:eq(0) img").css({"height":"25px", "width":"auto", "margin-top":"2px", "cursor":"pointer","margin-left":"-4px"});

			//$("#home_txt").css("right","8px");
			var this_app;
			var this_imagename;

			if(/settings.html/g.test(location.href)) {
				this_app = "settings.html";
				this_imagename = "images/toc1_settings.png";
				app_link(this_app,this_imagename);
			}
			else if(/s_health.html/g.test(location.href)) {
				this_app = "s_health.html";
				this_imagename = "images/toc1_shealth.png";
				app_link(this_app,this_imagename);
			}

			//홈버튼 동작
			$("#toolbar a:eq(0)").live("click", function(){
				$(".real-con").get(0).go_page(0);
				try {
					$(".real-con div[class*='Heading2']:eq(0)").animate({scrollTop: 0}, 1);
				}
				catch(e) {
					console.log(e);
				}
				return false;
			});

			$(".toc").parent("a").live("click", function() {
				return true;
			});
			//보이기/숨기기
			/*
			for(i=0; i < view_css.length; i++) {
				$("." + view_css[i]).css("display","none");
				$("." + view_css[i]).css("background-color","#f2f2f2");
			}
			*/

			//간단매뉴얼이고, h1_Applink 인 경우 다음 첫번째 제목 숨김
			if($(".bv_h1-APPLINK").attr("rel")!="Nosub"){
				$(".bv_h1-APPLINK").next("h2[class*='Heading2']").hide();
			}
			$(".Heading2-HIDE").remove();


			//딥링크 페이지 이동  s_note.html#widget_s_note#app
			var link_j = location.href;
			var xxx = link_j.split("#");
			var xxx0 = xxx[0];
			var xxx1 = xxx[1];

			var xxx2 = xxx1.split("#");
			var deeplink = xxx2[0];
			//alert(deeplink);

			var index = $(".Heading2, .Heading2-APPLINK").has("#" + deeplink).index();
			//alert(index);
			if(index==0){
				$("h3[class='Heading3-APPLINK']").attr("class","Heading3-APPLINK2");
			}
			setTimeout(function(){
				$(".real-con").get(0).go_page(index);
				try {
					//$(".real-con div[class*='Heading2']:eq(" + (index) + ")").animate({scrollTop:$("div.Heading2:eq(" + (index) + ") h3[id*='" + deeplink + "']").offset().top - 52}, 100);
				}
				catch(e) {
					console.log(e);
				}
			},1600);
		}
	//=========================================================================== UM, APP 구분 끝 ==============================================================================================//


	//=========================================================================== 슬라이드 기능 시작 ==============================================================================================//
	function swipe_slider() {
		$(".real-con").swipe_slider({
			roll : false,
			page : 1,
			flexible : true,
			btn_prev : $(".btn_prev"),
			btn_next : $(".btn_next"),
			initComplete : function (e) {

				$("#swipe_Slider_paging").html("");
				var full_tag = "";
				$("#scrollmask span#chapter_2").css("display","none");
				$("#scrollmask span#chapter").css("display","none");
				// UM이면
				if(deep!="#app"){
					var time_setup = 400;
					//var time_setup = 1600;
				}
				else {
					var time_setup = 100;
					//var time_setup = 400;
				}

				var h1_name = $("h1[class*='bv_h1']").text();
				$.cookie('h1_name', h1_name, { path : '/' });

				li_count = $(".real-con").children("div[class*=Heading2]").length;

				if(li_count != 1){
					$("#scrollmask span#chapter").after("<span id='chapter_2' style='display:none;'>"+h1_name+"</span>");
				}else{
					$("#scrollmask span#chapter").after("<span id='chapter_2' style='display:none;'></span>");
				}


					//간단 하위 목차 표현 로드를 위한 딜레이설정 1200
					setTimeout(function(){	 // ggg

						//1차: 목차 생성 후,  링크 동작 되도록 설정. when, then
						var method1 = function() {
							var full_tag2 = "";
							$(".real-con").children("div[class*=Heading2]").each(function (i, el) {
								var j = $(this).index();



								//특정 3개 이외 챕터인 경우
									full_tag = full_tag + ('<dl><dt><a href="' + j + '#' + $(this).children('h2:eq(0)').attr("id") + '" class="btn_page">' + $(this).children('h2:eq(0)').text() + '</a>');

									if($(this).children("div.Heading3")) {
										$(this).children("div.Heading3").each(function(){
										});
									}
									full_tag = full_tag + "</dt></dl>";

							});

								$("#h2_contents_l").html(full_tag);

								menu_cnt =$("#h2_contents_l").children("dl").size();

								//그중 맨 위 리스트 항목 삭제(현재페이지)
								$("#h2_contents_l dl:eq(0)").css("display","none");

								//세팅 목록에서 자식이 있는 부모는 링크값 삭제
								$("#h2_contents_l dl dt dl").each(function(){
									//um이면
										if(deep=="#app"){
									}
									else {
										$(this).parent("dt").children("a").removeAttr("href");
										$(this).parent("dt").parent("dl").addClass("h2_contents_l_child");
									}
								});

								$("dl dt").children("dl").each(function(){
									$(this).css("display","none");
								});

							//첫페이지 목차 갯수에 따라 보여줄 것인지, 숨길 것인지 판단.. 2개 이하이면 숨기기
							if($("#h2_contents_l").children("dl").size() < 1) {
								$("#h2_contents").css("display","none");
							}
							else {
								//$("#h2_contents").css("display","block");
							}
						};

						$.when(method1()).then(method2(menu_cnt));
					}, time_setup); // ggg

				//h1내 h2목차 링크 이동
				$("#h2_contents_l p").live("click", function (e) {
					var i = $(this).index();
					$(".real-con").get(0).go_page(i);
				});
				//h1내 h2목차 링크 이동
				if(deep!="#app"){
					$(".real-con div[class*='Heading2']").animate({scrollTop: 0}, 1);
				}

			},
			counter : function (e) {
					setTimeout(function(){
						$.cookie('this_page', e.current-1);
					},700);

				var link_j = location.href;
				var results = link_j.indexOf("#");
				//var deep = link_j.indexOf("#app");
				var deep = RightReplace(link_j, 4);
				if(deep=="#app") {
					var xxx = link_j.split("#");
					var xxx0 = xxx[0];
					var xxx1 = xxx[1];
					var xxx2 = xxx1.split("#");
					var xxx3 = xxx2[0];
				}
				//alert(xxx1);
				//alert("a-"+$.cookie('click_page'));
			if(deep=="#app") {

					if($.cookie('click_page') == 0){ //처음접속한경우 해당위치로
						if(index==(e.current-1)){
							if($("#"+xxx1).attr("class")=="Heading3-APPLINK2"){
								$.cookie('click_page', 1);
							}else{
								$.cookie('click_page', e.current-1);
							}

						}
						if($("#"+xxx1).attr("class")=="Heading3-APPLINK2" && $.cookie('click_page')==1){
							//alert('a');
							$.cookie('click_page', e.current-1);
						}else{
							//alert('aa');
							setTimeout(function(){
								try {
										$(".real-con div[class*='Heading2']:eq(" + (e.current-1) + ")").animate({scrollTop:$("div[class*='Heading2']:eq(" + (e.current-1) + ") h3[id='" + xxx3 + "']").offset().top - 52}, 100);
								}
								catch(e) {
									console.log(e);
								}
							}, 1200);
						}
					}else{
						//alert($.cookie('click_page'));
						if($("#"+xxx1).attr("class")=="Heading3-APPLINK2" && $.cookie('click_page')==undefined){
							//alert('c');
							$.cookie('click_page',1);
							setTimeout(function(){
								try {
										$(".real-con div[class*='Heading2']:eq(" + (e.current-1) + ")").animate({scrollTop:$("div[class*='Heading2']:eq(" + (e.current-1) + ") h3[id='" + xxx3 + "']").offset().top - 52}, 100);
								}
								catch(e) {
									console.log(e);
								}
							}, 1200);
						}else{
							//alert('d');
						}
					}
				}

				//첫페이지가 아니면 h1 숨기기, h2제목 위 여백 조금 주기

				wrapper = $('#scrollmask').width() - 40 - 124;
				$('#chapter marquee').css({"font-size":"20px !important"});
				if(e.current !== 1) {
					$('#chapter').css("display","none");
					$('#chapter_2').css({"display":"block","width":"auto"});

					setTimeout(function(){
						title_width = $('#chapter_2').width();
						$('#chapter_2').css('width', title_width);
						if (parseInt(title_width) > parseInt(wrapper)) {//제목너비가 mask 길이보다 길면 	제목을 스크롤
							//제목이 길 경우
							chapter_2_class = $('#chapter_2').children().hasClass('js-marquee-wrapper');
							if(chapter_2_class==false){
								$('#chapter_2').marquee({
									speed: 5000,
									gap: title_width,
									delayBeforeStart: 4000,
									direction: 'left',
									duplicated: true,
									pauseOnHover: false
								});
							}
							if(last_check !== -1){
								chapter_2_class = $('#chapter_2').children().hasClass('js-marquee-wrapper');
								if(chapter_2_class==false){
									$('#chapter_2').marquee({
										speed: 5000,
										gap: title_width,
										delayBeforeStart: 4000,
										direction: 'left',
										duplicated: true,
										pauseOnHover: false
									});
								}
							}


						}

					},200);


					var book_name ="";
					var book_chk ="";

					$(".btn_box .book_icon").attr('src','contents/images/template/bookmark_off.png');

					//alert('b');
					$("h1[class*='bv_h1']").css("display","none");
					$( ".real-con div[class*='Heading2']:eq(" + (e.current-1) + ") h2[class*='Heading2']").css("padding-top", "0px");

					$("div[class*='Heading2']").css("height", $(document).height()-164);
					// 2016-01-12 $("div[class*='Heading2']").css("padding-bottom", "255");
					$("div[class*='Heading2']").css("padding-top", "0");

					//북마크아이콘 추가하기
					book_name = 		$("div[class*=Heading2]").children("h2[class*=Heading2]:eq("+(e.current-1)+")").text()+"|"+"../"+$("div.heading1").attr("id")+".html#"+$("div[class*=Heading2]").children("h2[class*=Heading2]:eq("+(e.current-1)+")").attr("id");
					//console.log(book_name);

					if($.cookie('sel_cate')!=null){
					book_chk = $.cookie('sel_cate').indexOf(book_name);
						if(book_chk!=-1){
							$(".btn_box .book_icon").attr('src','contents/images/template/bookmark_on.png');

						}else{
							$(".btn_box .book_icon").attr('src','contents/images/template/bookmark_off.png');
						}
						$(".btn_box .book_icon").attr('rel',book_name);
					}else{
						$(".btn_box .book_icon").attr('rel',book_name);
					}

				} else {
						$('#chapter_2').css("display","none");
					$('#chapter').css({"display":"block","width": "auto"});

					setTimeout(function(){
						title_width = $('#chapter').width();
						$('#chapter').css('width', title_width);
						//$('#chapter').css({"display":"block"});

						if (parseInt(title_width) > parseInt(wrapper)) {//제목너비가 mask 길이보다 길면 	제목을 스크롤
							//제목이 길 경우
							chapter_class = $('#chapter').children().hasClass('js-marquee-wrapper');
							if(chapter_class==false){
								$('#chapter').marquee({
									speed: 5000,
									gap: title_width,
									delayBeforeStart: 4000,
									direction: 'left',
									duplicated: true,
									pauseOnHover: false
								});
							}
						}
					},200);

					var book_name ="";
					var book_chk = "";
					$(".btn_box .book_icon").attr('src','contents/images/template/bookmark_off.png');
					//alert('a');
					$(".real-con div[class*='Heading2']:eq(" + (e.current-1) + ") .btn_box .book_icon").attr('src','contents/images/template/bookmark_off.png');
					$( ".btn_box").append()
					$("h1[class*='bv_h1']").css("display","block");
					$("div[class*='Heading2']").css("height", $(document).height()-164);
					$("div[class*='Heading2']").css("padding-top", "0px");

					//북마크아이콘 추가하기
				book_name = $("h1[class*='bv_h1']").text()+"|"+"../"+$("div.heading1").attr("id")+".html#"+$("h1[class*='bv_h1']").attr("id");
				if(book_name.match(',')){
						var book_name=book_name.replace(",","&comma;")
							//alert(book_name)
					}
					if($("h1[class*='bv_h1']").attr("id")==undefined){
						book_name = $("h1[class*='Heading1']").text()+"|"+"../"+$("div.heading1").attr("id")+".html#"+$(".Heading2 h1[class*='Heading1']").attr("id");
					}
					if($("div[class*=Heading2]").children("h2[class*=Heading2]").attr("id")!=undefined && $("div[class*=Heading2]").children("h2[class*=Heading2]").css("display")!="none"){
						book_name = 		$("div[class*=Heading2]").children("h2[class*=Heading2]:eq(0)").text()+"|"+"../"+$("div.heading1").attr("id")+".html#"+$("div[class*=Heading2]").children("h2[class*=Heading2]:eq(0)").attr("id");
					}
					console.log(book_name);
					if($.cookie('sel_cate')!=null){
						book_chk = $.cookie('sel_cate').indexOf(book_name);
						if(book_chk!=-1){
							$(".btn_box .book_icon").attr('src','contents/images/template/bookmark_on.png');
						}else{
							$(".btn_box .book_icon").attr('src','contents/images/template/bookmark_off.png');
						}
						$(".btn_box .book_icon").attr('rel',book_name);
					}else{
						$(".btn_box .book_icon").attr('rel',book_name);
					}

				}




			var first_url = location.href;
				var result = first_url.indexOf("#");
				//var deep = first_url.indexOf("#app");
				var deep = RightReplace(first_url, 4);
				$("#count").addClass("type_a");
				count_time = 150;
				setTimeout(function(){ // ggg
				//setTimeout(function(){
					//아이콘 모양 변경
					//보이기/숨기기
					/*$("#show_hide a:eq(1)").attr("class", "show");
					$("#show_hide img:eq(1)").attr("src","contents/images/template/view_off.png");
					$(".show_hide_text").text(message[language].expand);
					$("#show_hide a:eq(1) img").attr("alt",$(".show_hide_text").text());*/
					//실제 동작
					if(e.total>7){
							$("#count").attr("class","type_b");
							count_time = 400;
					}
					//UM이면
					if(deep!="#app"){

						$("#show_hide .go_top").fadeOut();
						$("#sizer").css("display","block");

						//check_safty_information
						if($("#info_check").html() == "True") {
							//safty_information인경우 동작하지 않음. safty_information로직 동작
							$("#count").before("<div id='count2' ></div>");
							$("#count2").html(e.current + "/" + e.total);
							$("#count2").css("display","none");
						}
						else {
							//UM에서는 1/1 카운트로 처음과 끝 구분
							$("#count").html("");
							$("#count .btn_page").removeClass("on");

							//현재 위치 네비게이션 on 추가 표시
							//if(e.total > 1){
							for(i=0; i < e.total; i++){
								$("#count").append('<a class="btn_page">    </a>');
							};
							$("#count .btn_page").eq(e.current-1).addClass("on");
							$("#count").before("<div id='count2' ></div>");
							$("#count2").html(e.current + "/" + e.total);
							$("#count2").css("display","none");
						}

						//um에서도 숨기기/펼치기 넣어달라는 요청으로 아래코드 추가
						//보이기/숨기기
						/*
						$(".Orderlist_1-1_Child, .Orderlist_2-1_Child, .Unorderlist_2-1, Unorderlist_1_2, .Table_CallOut-Text-HIDE, .Table_Note-HIDE, .Table_Screen-HIDE, .Table_Note").css("display","none");
						$("#show_hide").css("bottom","auto");
						$("#show_hide").css("top","60px");
						$("#show_hide").css("display","block");*/

					//간단매뉴얼이면
					} else {
						//초기 하단 네비게이션 버튼 on 제거
						$("#count").html("");
						$("#count .btn_page").removeClass("on");

						//현재 위치 네비게이션 on 추가 표시
						//if(e.total > 1){
							for(i=0; i < e.total; i++){
								$("#count").append('<a class="btn_page">    </a>');
							};
							$("#count .btn_page").eq(e.current-1).addClass("on");
						//}

						//보이기/숨기기
						/*
						$(".Orderlist_1-1_Child, .Orderlist_2-1_Child, .Unorderlist_2-1, Unorderlist_1_2, .Table_CallOut-Text-HIDE, .Table_Note-HIDE, .Table_Screen-HIDE, .Table_Note").css("display","none");

						//페이지 넘길 때 간단매뉴얼에서 펼치기 활성화
						$("#show_hide").css("bottom","auto");
						$("#show_hide").css("top","60px");
						$("#show_hide").css("display","block");
						*/
					}

					if($("div.heading1").attr("data-next") == undefined ){
						$("#count").css("display","none");
						$.cookie('chap', -1, { path : '/' });
					}

					$("#show_hide .go_top").fadeOut();
					$("#sizer").css("display","block");

				},count_time);	 // ggg


				//페이지 내 숨김 스타일이 없다면 펼치기,닫기 버튼 숨김
				//보이기/숨기기
				/*
				var style_count = 0;
				for(i=0; i < view_css.length; i++) {
					$(".real-con div[class*='Heading2']:eq(" + (e.current-1) + ") ." + view_css[i]).each(function() {
						style_count = style_count + 1;
					});
				}
				if(style_count == 0) {
					$("#show_hide a:eq(1)").css("display","none");
				}
				else {
					//alert(style_count);
					//UM이면

					//um에서도 숨기기/펼치기 넣어달라는 요청으로 아래코드 추가
					//if(result !== -1){} else {$("#show_hide a:eq(1)").css("display","block");}
					$("#show_hide a:eq(1)").css("display","block");
				}
				*/
			} //:counter 닫힘 태그
		});
	}
	//=========================================================================== 슬라이드 기능 끝 ==============================================================================================//

	//get TOC 동작
	$("dl dt a").live('click', function(){

		//settings.html, UM이면... 링크 동작
		if ((/settings.html/g.test(location.href) && deep!="#app") || ($("#hide_self").text() !== "" && deep!="#app")) {

		}
		else {

				//현재 클릭 위치 닫혀있다면 하위 열기
				if($(this).next("dl").css("display") !== "block") {
					//기본적으로 모든 하위 닫기
					$("dl dt").children("dl").each(function(){
						$(this).css("display","none");
						$(this).parent("dt").parent("dl").attr("class","h2_contents_l_child");
					});
					$(this).siblings("dl").css("display","block");
					if($(this).attr("href")){
					}
					else {
						$(this).parent("dt").parent("dl").attr("class","h2_contents_l_child_none");
					}
				} else {
					//기본적으로 모든 하위 닫기
					$("dl dt").children("dl").each(function(){
						$(this).css("display","none");
						$(this).parent("dt").parent("dl").attr("class","h2_contents_l_child");
					});
				}

					var link_j = $(this).attr("href");
				var link_j_result = link_j.indexOf("#");

				if(link_j_result !== -1){
					var xxx = link_j.split("#");
				}
				var xxx0 = parseInt(xxx[0]);
				var xxx1 = xxx[1];
				$.cookie('click_page', xxx0);
				$(".real-con").get(0).go_page(xxx0);

				setTimeout(function(){
					if(xxx1) {
							if(/s_health________.html/g.test(location.href) || /settings.html/g.test(location.href)) {
								$(".real-con div[class*='Heading2']:eq(" + (xxx0) + ")").animate({scrollTop: 0}, 400);
								$(".real-con div[class*='Heading2']:eq(" + (xxx0) + ")").animate({scrollTop: $("div.Heading2:eq(" + (xxx0) + ") h2.Heading2 h2.Heading2[id='" + xxx1 + "']").offset().top - 60}, 500);
							}
							else {
								$(".real-con div[class*='Heading2']:eq(" + (xxx0) + ")").animate({scrollTop: 0}, 400);
								try{
									$(".real-con div[class*='Heading2']:eq(" + (xxx0) + ")").animate({scrollTop: $("div.Heading2:eq(" + (xxx0) + ") .Heading3[id='" + xxx1 + "']").offset().top - 60}, 500);
								}
								catch(e) {
									console.log(e);
								}
							}
					}
					else {
							$('html,body').animate({scrollTop: 0}, 1);
							$(".real-con div[class*='Heading2']:eq(" + (xxx0) + ")").animate({scrollTop:0}, 400);
					}
				}, 600);
			return false;
		} //if
	});
	//get TOC 동작

	//UM, 간단 매뉴얼에 따른 스와이프 슬라이더 로드 시간 설정, 로딩 이미지 삽입
	if(deep=="#app"){
		setTimeout(function(){
		swipe_slider();
		},500);
	}
	else {
		//$("#container").css("visibility","hidden");
		$(".heading1").css("visibility","hidden");

		setTimeout(function(){
			swipe_slider();
		}, 250);
		//}, 950);
/*		setTimeout(function(){
			//$("#container").css("visibility","visible");
			$(".heading1").css("visibility","hidden");
			$(".load_img").css("display","none");
		}, 700);*/
		//}, 960);

	}
	//슬라이드 기능

	//첫 li h2 안보이기 제목 (Heading1-APPLINK 가 붙는 제목 밑에것만 숨기기)
	$("h1[class='Heading1-APPLINK']").next(".real-con").children("div.Heading2:eq(0)").children("h2.Heading2").css("display","none");
	//첫 li h2 안보이기

	//첫 li h2 안보이기 list 링크
	$("#h2_contents_l p:eq(0)").css("display","none");
	//첫 li h2 안보이기

	// 숨김, 보이기 설정
	//보이기/숨기기
	/*
	$("#show_hide a:eq(1)").live("click", function(){

		//숨겨진 것을 보이기
		if($(this).attr("class") == "show") {
			//아이콘 모양 변경
			$(this).attr("class", "hide");
			$("#show_hide img:eq(1)").attr("src","contents/images/template/view_on.png");
			$(".show_hide_text").text(message[language].collapse);
			$("#show_hide a:eq(1) img").attr("alt",$(".show_hide_text").text());

			//실제 동작
			$(".Orderlist_1-1_Child, .Orderlist_2-1_Child, .Unorderlist_1_2, .Unorderlist_2-1, .Table_CallOut-Text-HIDE, .Table_Note-HIDE, .Table_Screen-HIDE,  .Table_Note").slideDown("fast");

		//숨기기
		} else {
			//아이콘 모양 변경
			$(this).attr("class", "show");
			$("#show_hide img:eq(1)").attr("src","contents/images/template/view_off.png");
			$(".show_hide_text").text(message[language].expand);
			$("#show_hide a:eq(1) img").attr("alt",$(".show_hide_text").text());

			//실제 동작
			$(".Orderlist_1-1_Child, .Orderlist_2-1_Child, .Unorderlist_1_2, .Unorderlist_2-1, .Table_CallOut-Text-HIDE, .Table_Note-HIDE, .Table_Screen-HIDE, .Table_Note").slideUp("fast");
		}
		return false;
	});
	*/
	// 숨김, 보이기 설정

	$(".heading1").css("height", $(document).height()-93);
	//alert($('.heading1').css('height'))
	$(".real-con").css("height", $(document).height());
	setTimeout(function(){
		$("div[class*='Heading2']").css("height", $(document).height()-164);
	},100);

/*	//일반 링크로 h2 찾아가기
	$(".C_CrossReference").each(function(){
		var c_url = $(this).children("a").attr("href");
		if(c_url){
			var c_url2 = c_url.split("#");
		} else {
			var c_url2 = "";
		};


		//파일명.확장자
		var filename = c_url2[0];
		//해시값
		var filehash = c_url2[1];

		if(filehash !== null) {
			var tag_name = $("#"+filehash).prop("tagName");
			if(tag_name=="H3"){
				var h3_parent = $("#"+filehash).parent().parent().children("h2").attr("id");
				if(h3_parent != undefined){
					$(this).children("a").attr("href", filename+"#"+h3_parent + "#");
				}else{
					$(this).children("a").attr("href", $(this).children("a").attr("href") + "#");
				}
			}else{
				$(this).children("a").attr("href", $(this).children("a").attr("href") + "#");
			}
		}
	});
	$(".C_CrossReference a").live("click", function(){
		var c_url = $(this).attr("href").split('#');
		ref_url = location.href.split('#');
		var url_check = ref_url[0].indexOf(c_url[0]);
		if(url_check !== -1){
			Ref_Heading2 = $(this).parents("div[class*='Heading2']").children("h2[class*='Heading2']").attr("id");

			$(".real-con").children("div[class*=Heading2]").each(function (i, el) {
				//alert(c_url[1]);
				if($(this).children('h2').attr("id")==c_url[1]){
					Heading_num = $(this).index();
				}
			});

			if(Ref_Heading2 != undefined && ref_url[0] != undefined ){
				window.history.replaceState(null, "", ref_url[0]+"#"+Ref_Heading2)
			}
			var c_url = $(this).attr("href");
			location.href = c_url;

		}else{
			Ref_Heading2 = $(this).parents("div[class*='Heading2']").children("h2[class*='Heading2']").attr("id");
			if(Ref_Heading2 != undefined && ref_url[0] != undefined ){
				window.history.replaceState(null, "", ref_url[0]+"#"+Ref_Heading2)
			}
			var c_url = $(this).attr("href");
			location.href = c_url;
		}
	});
	//일반 링크로 h2 찾아가기

$(window).hashchange( function(){
			Heading_num2 = "";
			Heading_num3 = "";
			ref_url2 = location.href.split('#');
			var search_url = location.href.indexOf("search/search.html");
			if(search_url == -1){

				$(".real-con").children("div[class*=Heading2]").each(function (i, el) {
				
					//alert(c_url[1]);
					if($(this).children('h2').attr("id")==ref_url2[1]){
						Heading_num2 = $(this).index();
					}
				});
				$(".real-con").children("div[class*=Heading2]").children("div[class*=Heading3]").each(function (i, el) {
					if($(this).children('h3').attr("id")==ref_url2[1]){
						Heading_num3 = $(this).parent().index();
					}
				});
			
				if (Heading_num2 != undefined && ref_url2[1] =="interval_shot" ){
					//location.reload();
					last_cnt = $(".btn_area .btn_page").length-1;
					
					$("div.heading1").css("visibility","hidden");
						$("#h2_contents_l dl dt a:eq("+last_cnt+")").trigger("click");
						$("#h2_contents_l dl dt a:eq("+Heading_num2+")").trigger("click");
					setTimeout(function(){
						$("div.heading1").css("visibility","visible");

					},150);
				}else if(Heading_num3 != undefined && ref_url2[1] =="camera_selfie_effect" ){
					last_cnt = $(".btn_area .btn_page").length-1;
					$("div.heading1").css("visibility","hidden");
						$("#h2_contents_l dl dt a:eq("+last_cnt+")").trigger("click");
						$("#h2_contents_l dl dt a:eq("+Heading_num3+")").trigger("click");
					setTimeout(function(){
						$("div.heading1").css("visibility","visible");

					},150);
				}

				if(Heading_num2 != undefined && !Heading_num3 ){
					$(".real-con").get(0).go_page(Heading_num2);
				}
			}

	});

	if(/what_cookie/g.test(location.href)) {
		$("#container h1:eq(0)").css("font-size","18px");
		//alert("18px");
	}
*/

$(".C_CrossReference a").live("click", function() {	

	var c_url = $(this).attr("href");
	var c_url2 = c_url.split("#");
	var ref_url = location.href;
	var ref_url2 = ref_url3 = "";
	if(ref_url.indexOf("#")!=-1){
		ref_url2 = ref_url.split("#");
		ref_url3 = ref_url2[0];
	}else{
		ref_url3 = ref_url;
	}
	var url_check = ref_url.indexOf(c_url);

	//같은페이지
	if(url_check !== -1){

		$(".real-con").children("div[class*=Heading2]").each(function (i, el) {
			//alert(c_url[1]);

			if($(this).children('h2').attr("id")==c_url2[1]){
				Heading_num = $(this).index();
			
				$(".real-con").get(0).go_page(Heading_num);
				//alert(Heading_num);
			}
		});
		return false;
	}else{//다른페이지
		$(".real-con").css("display","none");
		Ref_Heading2 = $(this).parents("div[class*='Heading2']").children("h2[class*='Heading2']").attr("id");
		if(Ref_Heading2 != undefined && ref_url3 != undefined ){
			window.history.replaceState(null, "", ref_url3+"#"+Ref_Heading2)
		}			
		//var c_url = $(this).attr("href");
		//location.href = c_url;
		$(this).attr("href", c_url);
	}
});
	var search_url = location.href.indexOf("search/search.html");
	var start_url = location.href.indexOf("start_here.html");	
	
$(window).hashchange( function(){ 
	if(search_url==-1 && start_url ==-1){
		location.reload();
	}
});
	/* 제목 스크롤 시작 */
	String.prototype.bytes = function() {//바이트 수 구하는 메소드
		var str = this;
		var l = 0;
		for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
		return l;
	}
	/* 제목 스크롤 끝 */


	//하단 네비게이션 버튼 클릭 동작
	$("#count .btn_page").live("click", function (e) {
		if($("#count").attr("class")=="type_a" || deep=="#app"){
			p += 1;
			if(p == 1 && deep=="#app"){
				k = 0;
			}else{
				k = $(this).index();
			}

			$.cookie('click_page', k);
			//alert('6');
			$(".real-con").get(0).go_page(k);
		}
	});


	//쿠키값에 따라 이미지 확대 비율 로딩
	if($.cookie('img_size_cookie') != null) {
		$("#zoom_sd").val($.cookie('img_size_cookie'));
		img_size_change($.cookie('img_size_cookie'));
	}
	//쿠키값에 따라 텍스트 확대 비율 로딩
	if($.cookie('text_size_cookie') != null) {
		text_size_change($.cookie('text_size_cookie'));
		$("#slider-1").val($.cookie('text_size_cookie'));
	}
	//쿠키값에 따라 줄간격 비율 로딩
	if($.cookie('line_height_cookie') != null) {
		line_height_change($.cookie('line_height_cookie'));
		$("#slider-2").val($.cookie('line_height_cookie'));
	}

	setTimeout(function() {
	change_contents();
	}, 100);
	setTimeout(function() {
	language_text_index();
	},200);
	setTimeout(function() {
	after_load();
	},300);

	//즐겨찾기 삭제 후 레이어 띄우기
	if($.cookie('del_cate')=="ok" && $.cookie('sel_cate')!=null){
		setTimeout(function(){
		//alert($("#keyword_img  ul li:eq(3) ").children('div').attr("id"));
		$("#keyword_img  ul li:eq(3) ").children('a').trigger("click");
		$.cookie('del_cate' ,null,{expires:-1, path : '/' });
		}, 300);
		//$("#keyword_img > ul > li:eq(3) > div").trigger("click");
	}

	//카테고리 이미지클릭
	$("#keyword_img > ul > li > a").live("click", function(){
		var img_index = $(this).parent().index();
		var key_layer = '';
		//$(".btn_plus-2").css("display","none");
        $("#keyword_img > ul > li > a").each(function(i){
        	if(img_index!=i){
	        	src = $(this).children('div').children('img').attr("src").replace("_on", "_off");
	       	}else{
	       		if($(this).children('div').children('img').attr("src").indexOf("_off")!=-1){
		       		src = $(this).children('div').children('img').attr("src").replace("_off", "_on");
				}else{
					src = $(this).children('div').children('img').attr("src").replace("_on", "_off");
					key_layer = 'close';
				}
	       	}
	        $(this).children('div').children('img').attr("src", src);
	    	$(".category_layer_2").fadeOut(400);
	    });
	    if(key_layer=="close"){
			$("#category_layer_"+(img_index+1)).fadeOut(400);
		}else{
			$("#category_layer_"+(img_index+1)).fadeIn(400);
			$("#category_layer_"+(img_index+1)).attr('tabindex', '0').focus();
		}


		$("#category_layer").css("display","none");
	});





	//검색 결과 닫기 버튼 클릭
 	$(".search_close_btn").live("click", function(){
		$("#bookmark_area").fadeIn(600);
	 	$("#keyword_area").fadeIn(600);
	 	$("#keyword_img").fadeIn(600);
	 	$("#id_results2").fadeOut(600);
 	});


	//컨텐츠 북마크 아이콘 클릭
	$(".book_icon").live("click", function(){
		//쿠키생성
		var cate_error = "";
		book_name2 = $(this).attr("rel");
		list = new cookieList("sel_cate");
		//alert(book_name2);

				//등록된 즐겨찾기 비교
				if($.cookie('sel_cate')!=null){
					var sel_category = $.cookie('sel_cate').split(',');
					//20개 개수제한
					if(sel_category.length>=20){
						cate_error = "over";
					}
					var cookie_chk = $.cookie('sel_cate').indexOf(book_name2);
				}else{
					var cookie_chk = -1;
				}

				//등록된적 없고 20개 이하일 경우 등록
				if(cookie_chk==-1 && cate_error!="over"){
  					list.add(book_name2);
  					src = $(this).attr("src").replace("_off", "_on");
					$(this).attr("src", src);
  				}else{
  					//이미 등록된 경우 삭제함
  					if(cookie_chk!=-1){
  						//alert('a');
  						var sel_category = $.cookie('sel_cate').split(',');
						var del_txt = $(this).attr("rel");

						var list = new cookieList("sel_cate");
						list.clear('sel_cate');
						var list = new cookieList("sel_cate");
						for (i=0; i<sel_category.length; i++){
							if(trim(sel_category[i])!=trim(del_txt)){
								list.add(sel_category[i]);
							}
						}
						src = $(this).attr("src").replace("_on", "_off");
						$(this).attr("src", src);
					//20개이상 오류메세지
  					}else if(cate_error=="over"){
  						setTimeout(function(){
							csscody.error("<p>"+message[language].bookmark_over+"<a ref=''></a></p>");
						},50);
  					//등록오류
  					}else{
  						//alert('error');
  					}
  				}
	});

	//카테고리 내용 레이어 닫기 버튼 클릭
	$(".cate_close_icon2").live("click", function(){
		//온 이미지 모두 오프로 변경
		$("#keyword_img > ul > li > a").each(function(i){
        	src = $(this).children('div').children('img').attr("src").replace("_on", "_off");
	        $(this).children('div').children('img').attr("src", src);
	        //$(this).removeClass('shake1');
	        $("#keyword_img ul li #btn_plus"+(i+1)).css("display","none");
	    });

		$("#search_wrap").css("display","block");
		$(".category_layer_2").fadeOut(400);
	});
	//alert($.cookie('sel_cate'));

	//북마크 삭제 아이콘
	$(".del_icon2").live("click", function(){
		var sel_category = $.cookie('sel_cate').split(',');
		var del_cate = $(this).prev('a').text();
		var del_url = $(this).prev('a').attr('href');
		var del_txt = del_cate+"|"+del_url;

		var list = new cookieList("sel_cate");
		list.clear('sel_cate');
		var list = new cookieList("sel_cate");
		for (i=0; i<sel_category.length; i++){
			if(trim(sel_category[i])!=trim(del_txt)){
				list.add(sel_category[i]);
			}
		}
		$.cookie('del_cate','ok',{expires:1, path : '/' });
		location.reload();
	});

	$("#deep_home").live("click", function(){
			window.open('', '_self', '');
           	window.close();
			return false;

	});
});
//=========================================================================== dom ready 끝 ==============================================================================================//



/****************** 안드로이드테스트영역 *********************************/
setTimeout(function() {
init();
},500);

function init()
{
   try {
	   AndroidFunction.showToast(location.href + ", imgsize[쿠키:" + $.cookie('img_size_cookie') + "%, 실크기:" + $("#zoom_sd").val() + "%]");
   } catch(e) {
				console.log(e);
			}
}

function callFromActivity(msg){
 $("#chapter").html(msg);
}
/****************** 안드로이드테스트영역 *********************************/


function after_load() {

//떨어져 있는 페이지 로딩 시간 500 보다 이후 시간 설정
setTimeout(function() {

	//-->해시값을 이용한 다른페이지 이동
	var first_url = location.href;
	var deep = RightReplace(first_url, 4);
	var setting_check = first_url.indexOf("settings.html");

	//초기 엘리먼트 생성 - 간단이면 생성
/*	if(deep !== -1){

	} else {
		//setting이 아닌 간단이면.
		if(/settings.html/g.test(location.href)){
			$(".real-con div.Heading2:eq(0)").append("<div id='h2_contents'><div id='h2_contents_l'></div></div><div id='get_toc1'></div><div id='get_toc2'></div>");
		}
		else {
		}
	}*/
	//초기 엘리먼트 생성

	////////////////////////////////이미지 확대 아이콘 추가////////////////////////////////////////////////
	$("Table[class*='Table_CallOut'] td").each(function(){
		var img_id = $(this).find(".Img-Center").children("img").attr('src');
		//alert(img_id);
		$(this).append("<div id='bvv' style='float:right;'><img src='contents/images/template/image_size_icon2.png' style='width:40px; height:auto; margin-top:-30px;' rel='"+img_id+"' /></div>");

		var language_t = $("html").attr("data-language");
		$('body').find('img').each(function() {
			var this_img = $(this).attr("src");
			var strArray = this_img.split('/'); //strArray[1] : 이미지 이름
			strArray.reverse();
			try{
				for (var i=0, iLen = alt_img[language_t].length; i<iLen; i++) {
					if(strArray[0] == alt_img[language_t][i].name) {
						$(this).attr("alt", alt_img[language_t][i].alt);
					}
				}
			} catch(e) {
				console.log(e);
			}
		});

	});
	////////////////////////////////이미지 확대 아이콘 추가 끝////////////////////////////////////////////////

	// 위로가기 삭제해달라는 요청에 의해 숨기기(최강철K) 2014/09/02
	$("#show_hide .go_top").css("display","none");
	//보이기/숨기기
	/*
	//scroll 감지 이전
	$("#show_hide").css("bottom","auto");
	$("#show_hide").css("top","60px");
	$("#show_hide").css("display","block");

	//$(".real-con div.Heading2:eq(" + count_index + "), .real-con div.Heading2-HIDE:eq(" + count_index + ")").scroll(function(e) {
	$(".real-con div.Heading2").scroll(function(e) {
		var doc_height = $(document).height();
		var win_height= $(window).height();
		var scroll_pos = $(this).scrollTop();
		var this_height = $(this).prop("scrollHeight") - $(this).height();

		var count_index = $("#count .on").index();
		//alert(count_index);

		// 아래로 스크롤 했을 경우
		if (scroll_pos < 80) {
			$("#show_hide").css("bottom","auto");
			$("#show_hide").css("top","60px");
			$("#show_hide").css("display","block");
		}
		else if(scroll_pos > 80 && scroll_pos < this_height - 180) {
			$("#show_hide").css("display","none");
		// 맨 위로 갔을 경우
		}
		else if (scroll_pos > this_height - 180) {
			$("#show_hide").css("top","auto");
			$("#show_hide").css("bottom","46px");
			$("#show_hide").css("display","block");

			$(".Table_Motion img, .Table_Product img, .Table_Screen img").each(function(){
				var t_src = $(this).attr("src");
				var t_src2 = t_src.split(".");
				$(this).attr("src", t_src2[0] + ".png");
				$(this).parent("div").children(".play_b").attr("src","contents/images/template/play.png");
			});
		}
	});
	*/
	//scroll 감지
},200);
//},600);
}
///////////////////////////////////////after_load/////////////////////////////////////////////////

function language_text_index() {
	var language = $("html").attr("data-language");
	setTimeout(function() {
		$("#userManual").html(message[language].title);
		$("#id_search").attr("placeholder", message[language].keyword);
		$("#id_main_search").attr("placeholder", message[language].keyword);
		$("#keyword_text").text(message[language].recent_key);
		noresult = message[language].reslut;
		$(".toc_bottom").text(message[language].toc_bottom);
		$(".show_hide_text").text(message[language].expand);
	},100);
}


function change_contents() {
	for (i=1; i<=30; i++) {
		$("div.Center_Number_"+ i).attr("class","Center_Number_"+ i);

		$(".Center_Number_" + i).html('<img src="contents/images/number_icon/'+i + '.png">');
		$(".numbered_" + i).html("<img src='contents/images/number_icon/number" + i + ".png'>  ");
		$(".numbered_" + i + " img").css({
			height: "20px",
			width: "auto",
			verticalAlign:"top"
		});
	}

	$(".C_CircleNumber img").each(function(){
		var img_path = $(this).attr("src").replace("contents/images/","contents/images/number_icon/");
		$(this).attr("src", img_path);
	});

	$(".C_Superscript-R-TM").each(function(){
		if($(this).text()=="™"){
			$(this).css("font-size","13px");
		}
	});

	$("img[src='images/M-caution.png']").attr("src","contents/images/number_icon/M-caution.png");
	$("img[src='images/M-note.png']").attr("src","contents/images/number_icon/M-note.png");
	$("img[src='images/M-warning.png']").attr("src","contents/images/number_icon/M-warning.png");

	$('body').find('.Table_Note').each(function() {
	$('.Table_Note .Note-col1').addClass('noteclasswidth'); //Table_Note의 첫번째 컬럼 너비고정
	});

	$("span.C_Seepage").html("▶");
	$(".C_Symbol:contains('►')").html("▶");
	$(".C_Symbol:contains('◄')").html("◀");
	$(".C_Arial_R:contains('►')").html("▶");
	$(".C_Arial_R:contains('◄')").html("◀");
	$(".C_Singlestep:contains('→')").html(" → ");
	$(".C_SingleStep:contains('→')").html(" → ");
	$("h2:contains('<br>')").html("<br/><br/>");

	$(".Description br").each(function() {
	$(this).wrap("<span class='br_span'>");
    });

	/* C_Italic으로 된 텍스트는 url임. 이걸 <a>로 링크를 걸어주는 스크립트 */
	$('body').find('.C_Italic').each(function() {
		var imgsrc = $(this).text();
		$(this).wrap("<a href='http://"+ imgsrc + "'>" + imgsrc + "</a>");
	});

	// 2016-01-12 add
	var prc_etc = prc_etc2 = "";
	$(".UnorderList_3-CHN p").each(function() {
		prc_etc = $(this).html().split("•");
		prc_etc2 = "<div style='margin-left:20px;'>"+prc_etc[1]+"</div>";
		$(this).html("<div style='display:inline-block;float:left;margin-top:-3px;'>■</div>"+prc_etc2);
	});

	var tai_etc = tai_etc2 = "";
	$(".UnorderList_4-Star p").each(function() {
		tai_etc = $(this).html().split("•");
		tai_etc2 = "<div style='margin-left:12px;'>"+tai_etc[1]+"</div>";
		$(this).html("<div style='display:inline-block;float:left;height:10px;margin-top:3px'>&#42;</div>"+tai_etc2);
	});

	$('body').find('.Heading1-TroubleShooting').each(function(){
		if($(this).children("img").attr("src")=="contents/images/M-warning.png" || $(this).children("img").attr("src")=="contents/images/M-caution.png"){
			var img_path = $(this).children("img").attr("src");
			var h1_txt = $(this).text();
			$(this).html("<table class='h1_table'><tr><td class='h1_td'><img src='"+img_path+"' class='img_waring'></td><td><h1 class='Heading1-TroubleShooting'>"+h1_txt+"</h1></td></tr></table>");
			if($(this).prev().html()=="<p>&nbsp;</p>"){
				$(this).prev().remove();
			}
		}
	});
	// 2016-01-12 add

}

function goUrl(){
	var full_url = location.href;
		var top_offset = $('#top').innerHeight();
		var parts = full_url.split("#");
		var trgt = parts[1];
		if(trgt) {
		var target_top = $("#"+trgt).offset().top;

		$('html, body').animate({scrollTop:target_top- top_offset-20}, 500);
		$("#"+trgt).delay(600).fadeTo("slow",0.2).fadeTo("slow",1);
		}
}

function fncSearchKeyDown(keyCode){
		try{
			if (!document.getElementById('*')) {
				if (keyCode == 13) {
					document.getElementById("id_main_search").style.border = "0px";
					doSearch();
				}
			}
			}catch(e){
				console.log(e);
		}
}
function doSearch(){
	var value=$("#id_main_search").val();
	$("#id_main_search").blur();
	if(value){
		location.href="./search/search.html?StrSearch="+value;
	}else {
	location.href="./search/search.html"
	}
}

$("#top a:eq(1)").live("click", function() {
		$.cookie('current' ,null,{ path : '/' });
})

function app_link(page, imgname) {
$(".real-con").css("display","none");


		var chater_first_title;

		//떨어져 있는 페이지 로딩 시간
		setTimeout(function() {
			$("#toc_info h1.toc-chap").each(function() {
				if($(this).children("img").attr("src") == imgname) {
					chater_first_title = $(this).children(".chapter_text").text();

					$(this).next("ul").children("li").each(function(){
						var li_a_href = $(this).children("a").attr("href");
						var li_a_text = $(this).children("a").text();
						//alert(li_a_href);

						//첫번째는 기존 내용 대치
						if(aa == 1) {
							$(".real-con").html("<div class='Heading2'><h2 class='Heading2'>" + li_a_text + "</h2></div>");
							$(".real-con .Heading2:last").load(li_a_href + " .real-con");
						}
						else {
							$(".real-con").append("<div class='Heading2'><h2 class='Heading2'>" + li_a_text + "</h2></div>");
							$(".real-con .Heading2:last").load(li_a_href + " .real-con");
						}
						aa = aa + 1;
					});
				}
			});
		},500);

		setTimeout(function() {
			$("div.Heading2 .real-con h1[class*='Heading1']").wrapInner("<h2 class='Heading2'></h2>");
			$("div.Heading2 .real-con .Heading2").unwrap(".Heading1");
			$("div.Heading2 .real-con .Heading2").unwrap(".real-con");

			//앱링크 Heading1-APPLINK인 첫번째 제목은 숨김 요청
			$(".real-con .Heading2:eq(0) .Heading2:eq(0) .Heading2:eq(0)").css("display","none");
			$(".real-con").css("display","block");
			change_contents();
			language_text_index();
		},700);

		//$(".real-con").prepend("<h1 class='Heading1-APPLINK'></h1>");
		//챕터 제목 넣기
		setTimeout(function() {
			$(".real-con").prev(".Heading1").text(chater_first_title);
			//$("#chapter").text(chater_first_title);
		},650);
}


/////////////////////이미지팝업////////////////////////////////
function img_size_change(value) {
	//값 저장을 위한 쿠키 생성
	$.cookie('img_size_cookie', value);
	$(".popup_img .image_area img").css("width", value + "%");
	init();
};
/////////////////////////////////이미지 팝업 끝///////////////////////////

///////////////////////////////폰트크기 조절////////////////////////////////////////////
var fontsize1 = new Array(
[16, 18, 22, '.UnorderList_1 p','.UnorderList_1_2 p','.UnorderList_1_2 p span','.UnorderList_1 p span','.UnorderList_2 p','.UnorderList_2 p span','.UnorderList_1-Cell p','.OrderList1_1 p','.OrderList1_1 p span','.OrderList2_1 p','.OrderList2_1 p span','.Description-Cell','.Description-Cell .C_NoBreak','.Description-Cell .MMI','div .Description','div .Description span','.Heading4','.C_Important-Semi','p .C_NoBreak','.OrderList2_1-Child p','.Description-UpSp','.OrderList1_1-Child p','p .MMI','.Description-UpSp .MMI','.Description-Semi','.UnorderList_2-Cell p','.UnorderList_1-Cell-Child p','.Description-Safety','.UnorderList_1-Safety p'],
[24, 26, 29, 'h1','h1 span', 'div .Heading1-APPLINK', 'div .Description-NoHTML'],
[28, 30, 32, '#container h1.bv_h1'],
[16, 18, 24, '.chapter_text'],
[22, 24, 27, 'h2', 'h2 span'],
[18, 20, 22, 'dl dt a.btn_page', '#h2_contents_l a.btn_page'],
[16, 18, 20, 'div .Heading2 .Description .MMI','div .Heading2 .OrderList1_1 .MMI','div .Heading2 .OrderList2_1 .MMI','div .Heading2 .UnorderList_1 .MMI','div .Heading2 .UnorderList_1-Cell .C_FontChange', '.C_URL a', '.C_CrossReference a'],
[18, 20, 22, '.Heading4-Safety'],
[20, 22, 24, 'h3','.Heading3-TroubleShooting', '.Heading3-Safety', '.Heading1-TroubleShooting','.Heading3-APPLINK .MMI_NoBold'],
[12, 13, 14, '.UnorderList_1 p .C_Superscript-R-TM']);

function text_size_change(value) {
	//값 저장을 위한 쿠키 생성
	$.cookie('text_size_cookie', value);
	for(var i=0; i< fontsize1.length; i++) {
		for(var j=0; j< fontsize1[i].length; j++) {
			if(j > 2) {
				//스타일 순차적으로 불러와 css적용, 슬라이더 값 = value
				$("" + fontsize1[i][j] + "").css("font-size", fontsize1[i][value-1] + "px");
			}
		}
	}
};
///////////////////////////////폰트크기 조절////////////////////////////////////////////

///////////////////////////////줄간격기능////////////////////////////////////////////
var line_height1 = new Array(
[140, 160, 180, '.UnorderList_1 p','.UnorderList_1_2 p','.UnorderList_1_2 p span','.UnorderList_1 p span','.UnorderList_2 p','.UnorderList_2 p span','.UnorderList_1-Cell p','.OrderList1_1 p','.OrderList1_1 p span','.OrderList2_1 p','.OrderList2_1 p span','.Description-Cell','.Description-Cell .C_NoBreak','.Description-Cell .MMI','div .Description','div .Description span','.Heading4','.C_Important-Semi','p .C_NoBreak','.OrderList2_1-Child p','.Description-UpSp','.OrderList1_1-Child p','p .MMI','.Description-UpSp .MMI','.Description-Semi','.UnorderList_2-Cell p','.UnorderList_1-Cell-Child p','.Description-Safety','.UnorderList_1-Safety p'],
[140, 160, 180, 'h1','h1 span', 'div .Heading1-APPLINK', 'div .Description-NoHTML'],
[140, 160, 180, '#container h1.bv_h1'],
[140, 160, 180, '.chapter_text'],
[140, 160, 180, 'h2', 'h2 span'],
[140, 160, 180, 'dl dt a.btn_page', '#h2_contents_l a.btn_page'],
[140, 160, 180, 'div .Heading2 .Description .MMI','div .Heading2 .OrderList1_1 .MMI','div .Heading2 .OrderList2_1 .MMI','div .Heading2 .UnorderList_1 .MMI','div .Heading2 .UnorderList_1-Cell .C_FontChange', '.C_URL a', '.C_CrossReference a'],
[140, 160, 180, '.Heading4-Safety'],
[140, 160, 180, 'h3','.Heading3-TroubleShooting', '.Heading3-Safety', '.Heading1-TroubleShooting','.Heading3-APPLINK .MMI_NoBold'],
[140, 160, 180, '.UnorderList_1 p .C_Superscript-R-TM']);

function line_height_change(value) {
	//높이값 저장을 위한 쿠키 생성
	$.cookie('line_height_cookie', value);
	for(var i=0; i< line_height1.length; i++) {
		for(var j=0; j< line_height1[i].length; j++) {
			if(j > 2) {
				//스타일 순차적으로 불러와 css적용, 슬라이더 값 = value
				$("" + line_height1[i][j] + "").css("line-height", line_height1[i][value-1] + "%");
			}
		}
	}
}
///////////////////////////////줄간격기능////////////////////////////////////////////

