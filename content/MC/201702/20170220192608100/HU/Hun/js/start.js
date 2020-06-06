// 초기 설정 =====================================================================================	

var ua = navigator.userAgent;
var isAndroid = ua.match(/Android/);
var is_ie     = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
var s_top_margin;

window.addEventListener('load', function() {
setTimeout(scrollTo, 0, 0, 1);
}, false);

// 브라우저별 설정 =====================================================================================

var Browser = { version : navigator.userAgent.toLowerCase() }

Browser = {
    ie : /*@cc_on true || @*/ false,
    ie6 : Browser.version.indexOf('msie 6') != -1,
    ie7 : Browser.version.indexOf('msie 7') != -1,
    ie8 : Browser.version.indexOf('msie 8') != -1,
    ie9 : Browser.version.indexOf('msie 9') != -1,
    ie10 : Browser.version.indexOf('msie 10') != -1,
	ie11 : Browser.version.indexOf('trident/7.0') != -1,
    opera : !!window.opera,
    safari : Browser.version.indexOf('safari') != -1,
    safari3 : Browser.version.indexOf('applewebkit/5') != -1,
    mac : Browser.version.indexOf('mac') != -1,
    chrome : Browser.version.indexOf('chrome') != -1,
    firefox : Browser.version.indexOf('firefox') != -1
}

// 브라우저별 설정 =====================================================================================	
$(document).ready(function() {	
	

		//Accessory 매뉴얼에서는 Key Feature 숨김
	if($(".choice_f a:eq(0)").attr("href") == "contents/contents/handbook_index.html") {
		$(".choice_f a:eq(0)").remove();
		$(".choice_f .line_left:eq(0)").remove();
		$(".choice_f .line:eq(0)").remove();
	}
	
	//$("div#main").wrap("<div id='main_wrap'></div>");

	var start_url = location.href.indexOf("start_here.html");	
	if(start_url!==-1){		
		$.removeCookie('chap');
	}
	
	if($("#id_toc1 h1:eq(0) span").attr("id") == "key_features") {
		$("#id_toc1 h1:eq(0)").remove();
		$("#id_toc1 ul:eq(0)").remove();
	}	
	//[뒤로가기] 동작설정
	$("#header a:eq(0)").attr("href","start_here.html");
	
	//다국어 message 자동넣기
		var language = $("html").attr("data-language");	
		//$("#key_features").text(message[language].view_toc3);
		$("span.model").html(message[language].title);
		$("span.model_name").html(message[language].model);
		nosearch = message[language].keyword;
		$("#userManual").text(message[language].title);
		//$("ul.choice_f li:eq(0) span").text(message[language].view_toc3);
		$("#id_search").attr("placeholder", message[language].keyword);	
		$("#id_main_search").attr("placeholder", message[language].keyword);	
		$("#keyword_text").text(message[language].recent_key);
		noresult = message[language].reslut;
// 2016-04-18
		$("#home_txt").text(message[language].home);
		$("#search_txt").text(message[language].search);
		$(".toolbar li:first-child a").live("click", function() {
			$.cookie("this_page_name", null ,{ expires: -1 });
			$.cookie('this_page_num', null ,{ expires: -1 });
			$.cookie("from_search", null ,{ expires: -1 });
			$.cookie('toc_search', 'toc', { path : '/' });
			var link_j = location.href;
			var link_name = link_j.split("#");
			if(!/start_here.html/g.test(location.href)){
				$.cookie("this_page_name", link_name[0]);
				$.cookie('this_page_num', $("#count a.on").index());
				$.cookie("from_search", "2");
			}
		});


	//toc에 핸드북 메뉴 추가
	if(language=="Thai"){
		$("span.model, .chapter_text2").css({"font-weight":"normal"});
	}	
	
	
	//긴언어 css수정
	if(language=="Bulgarian" || language=="Russian" || language=="Uzbek"){
		$("#main span.model").css({"font-size":"36px","line-height":"38px"});
		$("#id_main_search").css({"font-size":"16px"});
	}
	if(language=="Turkish"){
		$("#main span.model").css({"font-size":"34px","line-height":"36px"});
		$("#id_main_search").css({"font-size":"16px"});
	}	
	if(language=="Czech" ||  language=="Vietnamese"){
		$("#main span.model").css({"font-size":"36px","letter-spacing":"-1px","line-height":"38px"});
	}
	if(language=="Dutch" || language=="Italian" || language=="Lithuanian" ){
		$("#main span.model").css({"font-size":"38px","letter-spacing":"-1px"});
	}	
	if(language=="Hungarian" || language=="Indonesian" || language=="Kazakh" || language=="Latvian" || language=="Portuguese" || language=="Romanian" || language=="Serbian" || language=="Slovak" || language=="Slovenian" || language=="Ukrainian" || language=="Macedonian"){
		$("#main span.model").css({"line-height":"38px"});
	}
	if(language=="Croatian" || language=="German" || language=="Greek" || language=="Spanish_LA" || language=="Spanish"){
		$("#main span.model").css({"letter-spacing":"-1px"});
	}
	if(language=="Spanish" || language=="Macedonian" ){
		$("#id_main_search").css({"font-size":"16px"});
	}	
	if(language=="Polish" ){
		$("#id_main_search").css({"font-size":"15px"});
	}

	//toc 목차 불러오기(위에서 아래로 슬라이드)
	$("#top").hide();
	$("#container").hide();
	$("#top").slideDown(300);
	$("#container").delay(300).slideDown(600);	

	//챕터 클릭시 쿠키 저장(목차로 돌아오기 위함)
	
	$(".choice_f li").click(function(){		
		//alert($(this).index()/3);
		$.cookie('chap', $(this).index(), { path : '/' });
	});
	
	//챕터 클릭 효과(서브메뉴 슬라이드)
	setTimeout(function(){
		$("#id_toc1 .toc-chap:eq("+$.cookie('chap')+")").trigger("click");
	},600);
	
	//3depth 이상 지우기
	$(".toc-chap").next().children("li").children("ul").children("li").children("ul").remove();
	
	//settings 서브메뉴추가
	
	//$("img[src*='toc1_settings.png']").parent().next("ul").children("li:eq(0)").addClass('toc_cate');	

	var setting_menu_tmp = setting_menu = "";
	var set_name = "";
	$(".toc-sect > li").each(function(){		
		if($(this).attr("data-cate_toc1")!=undefined){
			setting_menu = $(this).attr("data-cate_toc1");			
			if(setting_menu != setting_menu_tmp){
				if(setting_menu=="Connections"){
					set_name = message[language].setting_tit1;
				}else if(setting_menu=="Device"){
					set_name = message[language].setting_tit2;
				}else if(setting_menu=="Personal"){
					set_name = message[language].setting_tit3;
				}else if(setting_menu=="System"){
					set_name = message[language].setting_tit4;
				}	
				$("li[data-cate_toc1*="+setting_menu+"]:eq(0)").before('<li class="toc_cate">'+ /*set_name+*/ '</li>');		
			}
			setting_menu_tmp = setting_menu;		
		}		
	});	
	
	//목차 초기 세팅
	
	$("#id_toc1 .toc-sect li ul").removeAttr("class");	
	var topMenuLi=$('#id_toc1 .toc-sect>li');//2dep li
	var tum=$('#id_toc1 ul.toc-sect li>ul');//3dep wraper

	setTimeout(scrollTo, 0, 0, 1);
	$('ul.toc-sect').addClass('hidden');
	$(topMenuLi).has('ul').addClass('child');
	$(tum).css("display","none");
	
	
	setTimeout(function(){
		
		$("#hb_menu li a").each(function(){		
			var hp_path = $(this).attr("href").replace("handbook","contents/contents/handbook");
			$(this).attr("href", hp_path);
		});		
	},500);
		
	//toc chapter 클릭
	$('.toc-chap').live("click",function(){
		var thissect = $(this).next('.toc-sect');
		var num = $(this).index()/2+1;
		$('.toc-sect').removeAttr('style');
		
		if (thissect.css('display') != 'none') {
			thissect.addClass('hidden');
			changeBackImg($(this), 1);
		}
		else {
			$('.toc-sect').addClass('hidden');
			//alert(thissect);
			setTimeout(function(){
				thissect.removeClass('hidden');	
			},300);

			changeBackImg($('.toc-chap'), 1);
			changeBackImg($(this), 2);
		}
		
		if($(this).hasClass("no-sect")){
			$(this).css("background-image", 'none');	
		}		
		s_top_margin = 54;		
		var chap = $("#id_toc1 h1").eq(num-1).offset().top-54;		
		$.cookie('chap', (num-1), { path : '/' });		
		setTimeout(function(){
			$("html,body").animate({scrollTop:chap}, 400);
		},400);
	});

	function changeBackImg(target, num) { //toc 열림/닫힘 버튼 이미지 
		var img_path = 'url(images/but' + num + '.png)';
		$(target).css("background-image",img_path);	
	}	

	//목차 하위 sect 클릭
	setTimeout(function(){
	$('.child>a').click(function(e) {
		e.preventDefault();
		var tobj=$(this).next();
		var pobj=$(this).parent();

		if(tobj.css('display') != 'none'){
				tobj.hide();
			pobj.removeClass("open");
		}else{
		$('ul.toc-sect li ul').hide();
		$('ul.toc-sect li').removeClass("open");
				tobj.show();
				pobj.addClass("open");
			}
	});
	}, 300);
	
	/* 하위 메뉴가 1개일 경우
	$("#id_toc1 .toc-sect li").each(function() {
		if($(this).children("ul").children("li").size() == 1) {			
			$(this).removeClass('child');
			$(this).children("ul").remove();
			var toc_link = $(this).children("a").attr("href");
			$(this).children("a").attr("href",toc_link);
		}
	});
	*/
	
	//대체텍스트넣기
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
	
//목차 하단에 경고메세지추가  h1태그에서 p태그로 수정
	var language = $("html").attr("data-language");
	if(language!="PRC Chinese"){
		$("#id_toc1").append('<p data-style="Chapter"><span class="chapter_text3">&nbsp;</span></p>');
		$("#id_toc1 p .chapter_text3").text(message[language].toc_bottom);


	}

	//홈버튼, 검색버튼을 눌렀을 경우 쿠키 초기화 9/15
	$("#header a, #search a, .view_lst a:eq(0)").live("click",function(){
		$.cookie('from_toc', null);
	});	


	//마지막 toc-chap은 화살표 제거
	if(language!="PRC Chinese"){
		$("#id_toc1 .toc-chap:last").addClass("no-sect");
	}

});

/* scroll to plugin
	2012. 10. 26일 추가
/**
 * @depends jquery
 * @name jquery.scrollto
 * @package jquery-scrollto {@link http://balupton.com/projects/jquery-scrollto}
 */

/**
 * jQuery Aliaser
 */
(function(window,undefined){
	// Prepare
	var jQuery, $, ScrollTo;
	jQuery = $ = window.jQuery;

	/**
	 * jQuery ScrollTo (balupton edition)
	 * @version 1.2.0
	 * @date July 9, 2012
	 * @since 0.1.0, August 27, 2010
	 * @package jquery-scrollto {@link http://balupton.com/projects/jquery-scrollto}
	 * @author Benjamin "balupton" Lupton {@link http://balupton.com}
	 * @copyright (c) 2010 Benjamin Arthur Lupton {@link http://balupton.com}
	 * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
	 */
	ScrollTo = $.ScrollTo = $.ScrollTo || {
		/**
		 * The Default Configuration
		 */
		config: {
			duration: 400,
			easing: 'swing',
			callback: undefined,
			durationMode: 'each',
			offsetTop: 0,
			offsetLeft: 0
		},

		/**
		 * Configure ScrollTo
		 */
		configure: function(options){
			// Apply Options to Config
			$.extend(ScrollTo.config, options||{});

			// Chain
			return this;
		},

		/**
		 * Perform the Scroll Animation for the Collections
		 * We use $inline here, so we can determine the actual offset start for each overflow:scroll item
		 * Each collection is for each overflow:scroll item
		 */
		scroll: function(collections, config){
			// Prepare
			var collection, $container, container, $target, $inline, position,
				containerScrollTop, containerScrollLeft,
				containerScrollTopEnd, containerScrollLeftEnd,
				startOffsetTop, targetOffsetTop, targetOffsetTopAdjusted,
				startOffsetLeft, targetOffsetLeft, targetOffsetLeftAdjusted,
				scrollOptions,
				callback;

			// Determine the Scroll
			collection = collections.pop();
			$container = collection.$container;
			container = $container.get(0);
			$target = collection.$target;

			// Prepare the Inline Element of the Container
			$inline = $('<span/>').css({
				'position': 'absolute',
				'top': '0px',
				'left': '0px'
			});
			position = $container.css('position');

			// Insert the Inline Element of the Container
			$container.css('position','relative');
			$inline.appendTo($container);

			// Determine the top offset
			startOffsetTop = $inline.offset().top;
			targetOffsetTop = $target.offset().top;
			targetOffsetTopAdjusted = targetOffsetTop - startOffsetTop - parseInt(config.offsetTop,10) - s_top_margin;//맨 뒤에 42는 상단에 고정된 #top 때문에 추가.

			// Determine the left offset
			startOffsetLeft = $inline.offset().left;
			targetOffsetLeft = $target.offset().left;
			targetOffsetLeftAdjusted = targetOffsetLeft - startOffsetLeft - parseInt(config.offsetLeft,10);

			// Determine current scroll positions
			containerScrollTop = container.scrollTop;
			containerScrollLeft = container.scrollLeft;

			// Reset the Inline Element of the Container
			$inline.remove();
			$container.css('position',position);

			// Prepare the scroll options
			scrollOptions = {};

			// Prepare the callback
			callback = function(event){
				// Check
				if ( collections.length === 0 ) {
					// Callback
					if ( typeof config.callback === 'function' ) {
						config.callback.apply(this,[event]);
					}
				}
				else {
					// Recurse
					ScrollTo.scroll(collections,config);
				}
				// Return true
				return true;
			};

			// Handle if we only want to scroll if we are outside the viewport
			if ( config.onlyIfOutside ) {
				// Determine current scroll positions
				containerScrollTopEnd = containerScrollTop + $container.height();
				containerScrollLeftEnd = containerScrollLeft + $container.width();

				// Check if we are in the range of the visible area of the container
				if ( containerScrollTop < targetOffsetTopAdjusted && targetOffsetTopAdjusted < containerScrollTopEnd ) {
					targetOffsetTopAdjusted = containerScrollTop;
				}
				if ( containerScrollLeft < targetOffsetLeftAdjusted && targetOffsetLeftAdjusted < containerScrollLeftEnd ) {
					targetOffsetLeftAdjusted = containerScrollLeft;
				}
			}

			// Determine the scroll options
			if ( targetOffsetTopAdjusted !== containerScrollTop ) {
				scrollOptions.scrollTop = targetOffsetTopAdjusted;
			}
			if ( targetOffsetLeftAdjusted !== containerScrollLeft ) {
				scrollOptions.scrollLeft = targetOffsetLeftAdjusted;
			}

			// Perform the scroll
			if ( $.browser.safari && container === document.body ) {				
				$container.animate(scrollOptions, config.duration, config.easing, callback);
				//window.scrollTo(scrollOptions.scrollLeft, scrollOptions.scrollTop);
				//callback();
			}
			else if ( scrollOptions.scrollTop || scrollOptions.scrollLeft ) {			
				$container.animate(scrollOptions, config.duration, config.easing, callback);
			}
			else {
				callback();
			}

			// Return true
			return true;
		},

		/**
		 * ScrollTo the Element using the Options
		 */
		fn: function(options){
			// Prepare
			var collections, config, $container, container;
			collections = [];

			// Prepare
			var	$target = $(this);
			if ( $target.length === 0 ) {
				// Chain
				return this;
			}

			// Handle Options
			config = $.extend({},ScrollTo.config,options);

			// Fetch
			$container = $target.parent();
			container = $container.get(0);

			// Cycle through the containers
			while ( ($container.length === 1) && (container !== document.body) && (container !== document) ) {
				// Check Container for scroll differences
				var scrollTop, scrollLeft;
				scrollTop = $container.css('overflow-y') !== 'visible' && container.scrollHeight !== container.clientHeight;
				scrollLeft =  $container.css('overflow-x') !== 'visible' && container.scrollWidth !== container.clientWidth;
				if ( scrollTop || scrollLeft ) {
					// Push the Collection
					collections.push({
						'$container': $container,
						'$target': $target
					});
					// Update the Target
					$target = $container;
				}
				// Update the Container
				$container = $container.parent();
				container = $container.get(0);
			}

			// Add the final collection
			collections.push({
				'$container': $(
					($.browser.msie || $.browser.mozilla) ? 'html' : 'body'
				),
				'$target': $target
			});

			// Adjust the Config
			if ( config.durationMode === 'all' ) {
				config.duration /= collections.length;
			}

			// Handle
			ScrollTo.scroll(collections,config);

			// Chain
			return this;
		}
	};

	// Apply our jQuery Prototype Function
	$.fn.ScrollTo = $.ScrollTo.fn;

})(window);
/* scrollTo plugin end */