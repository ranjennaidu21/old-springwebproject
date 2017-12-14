function showLoaderOverlay(ref) {
    var loader = $('<div class="loading01" />'), owner = $(ref), ev;
    ev = function(e) {
	loader.css({
	    marginLeft : owner.css('marginLeft'),
	    marginRight : owner.css('marginRight'),
	    marginTop : owner.css('marginTop'),
	    marginBottom : owner.css('marginBottom'),
	    left : owner.position().left,
	    top : owner.position().top,
	    width : owner.width(),
	    height : owner.height()
	});
    };
    ev();
    owner.data('loader', loader);
    loader.data('ev', ev);
    $(window).on('resize orientationchange respondUpdate', ev);
    $(ref).after(loader);
}
function hideLoaderOverlay(ref) {
    "use strict";
    if ($(ref).data('loader')) {
	var loader = $(ref).data('loader');
	$(window).unbind('resize', loader.data('ev'));
	loader.remove();
	$(ref).data('loader', 'undefined');
    }
}

function tb_preloader() {
	"use strict";
	$("#TB_window").removeClass('TB_window_hidden').addClass('TB_window_visible');
	// $("#TB_window").css({ width: '10000px' });
	var tb_tmp01w = $('#TB_window').outerWidth() - $('#TB_body').outerWidth() + 200;
	$("#TB_window").css({
		marginLeft: '-' + parseInt((tb_tmp01w / 2), 10) + 'px',
		top: $(document).scrollTop() + (tb_getPageSize()[1] / 2) - ($("#TB_window").outerHeight() / 2) + 'px',
		width: tb_tmp01w + 'px'
	});
}

function tb_getPageSize() {
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w, h];
	return arrayPageSize;
}

function tb_parseQuery(query) {
	var Params = {};
	if (!query) {
		return Params;
	} // return empty object
	var Pairs = query.split(/[;&]/);
	for (var i = 0; i < Pairs.length; i++) {
		var KeyVal = Pairs[i].split('=');
		if (!KeyVal || KeyVal.length != 2) {
			continue;
		}
		var key = unescape(KeyVal[0]);
		var val = unescape(KeyVal[1]);
		val = val.replace(/\+/g, ' ');
		Params[key] = val;
	}
	return Params;
}

function tb_setTop() {
	"use strict";
	var desiredtop;
	if ($('#TB_window').outerHeight() - $('#TB_body').outerHeight() + $("#TB_window").outerHeight() > tb_getPageSize()[1]) {
		desiredtop = $(document).scrollTop() + 10;
	} else {
		desiredtop = $(document).scrollTop() + 10 + (tb_getPageSize()[1] / 2) - ($("#TB_window").outerHeight() / 2);
	}
	$("#TB_window").css({
		top: (desiredtop > 10 ? desiredtop : 10) + 'px'
	});
}

function tb_scale() {
	// handle height of the window
	$("#TB_window").removeClass('TB_window_hidden').addClass('TB_window_visible');
	$("#TB_content_placeholder").removeClass('hidden');
	$("#TB_loader3").addClass('hidden');
    if ($('#TB_iframeContent').length > 0 && ($('#TB_iframeContent').data('autoscale') == 1 || $('#TB_iframeContent').data('autoscale') == 2)) {
        var $contents = $('#TB_iframeContent').contents();
        $contents.find('HTML').css({
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        TB_HEIGHT2 = $contents.find('BODY').outerHeight() + 2;
        TB_WIDTH2 = TB_WIDTH;
        $('#TB_main DIV.main-b').css({
            marginRight: '20px'
        });
        $('#TB_iframeContent').css('width', TB_WIDTH2 + 'px');
        $contents.find('#TB_content_container').css('width', TB_WIDTH);
        // $('#TB_iframeContent').css('height', TB_HEIGHT2);
    } else if ($('#TB_ajaxContent').length > 0 && $('#TB_ajaxContent').data('autoscale') == 1) {
        // autoscale 1 - content resize changes window height, div
        TB_HEIGHT2 = $('#TB_content_container').outerHeight() + 2;
        TB_WIDTH2 = TB_WIDTH;
        $('#TB_main DIV.main-b').css({
            marginRight: '20px'
        });
        $('#TB_ajaxContent').css('width', TB_WIDTH2 + 'px').find('#TB_content_container').css('width', TB_WIDTH);
        $('#TB_ajaxContent').css('height', TB_HEIGHT2);
    } else if ($('#TB_ajaxContent').length > 0 && $('#TB_ajaxContent').data('autoscale') == 2) {
        // autoscale 2 - content does not resize window height, div
        TB_HEIGHT2 = TB_HEIGHT + 2;
        if ($('#TB_content_container').outerHeight() < TB_HEIGHT) {
            TB_WIDTH2 = TB_WIDTH;
            $('#TB_main DIV.main-b').css({
                marginRight: '20px'
            });
        } else {
            TB_WIDTH2 = TB_WIDTH + 30;
            $('#TB_main DIV.main-b').css({
                marginRight: '10px'
            });
        }
        $('#TB_ajaxContent').css('width', TB_WIDTH2 + 'px').find('#TB_content_container').css('width', TB_WIDTH);
        $('#TB_ajaxContent').css('height', TB_HEIGHT2);
    } else if ($('#TB_error').length > 0 && $('#TB_error').data('autoscale') == 1) {
        // autoscale 1 - content resize changes window height, div
        TB_HEIGHT2 = $('#TB_content_container').outerHeight() + 2;
        TB_WIDTH2 = TB_WIDTH;
        $('#TB_main DIV.main-b').css({
            marginRight: '20px'
        });
        $('#TB_error').css('width', TB_WIDTH2 + 'px').find('#TB_content_container').css('width', TB_WIDTH);
        $('#TB_error').css('height', TB_HEIGHT2);
    } else {
        // no autoscale - fixed everything
        if ($('#TB_iframeContent').length > 0) {
            $('#TB_iframeContent').contents().find('HTML').css({
                overflow: 'hidden'
            });
        }
        if ($('#TB_ajaxContent').length > 0) {
            $('#TB_ajaxContent').css({
                overflow: 'hidden'
            });
        }
        TB_WIDTH2 = TB_WIDTH;
        TB_HEIGHT2 = TB_HEIGHT + 2;
    }
    $('#TB_content_placeholder').css({
        width: TB_WIDTH2 + 'px',
        height: TB_HEIGHT2 + 'px'
    });
    $("#TB_window").css({
        width: TB_WIDTH2 + 40
    });
    var tb_tmp01w = $('#TB_window').outerWidth() - $('#TB_body').outerWidth() + TB_WIDTH2;
    $("#TB_window").css({
        marginLeft: '-' + parseInt((tb_tmp01w / 2), 10) + 'px',
        width: tb_tmp01w + 'px',
        left: '50%'
    });
	$("#TB_window").removeClass('TB_window_hidden').addClass('TB_window_visible');
}

function tb_display() {
	// display the window
	//window.clearTimeout(tb_timer1);
	//window.clearTimeout(tb_timer2);

	// Bind scaling events
	if ($('#TB_iframeContent').data('autoscale')) {
		var $contents = $('#TB_iframeContent').contents();
		$contents.find('BODY').bind('mouseup click', function () { tb_timer2 = window.setTimeout('tb_scale()', 1); });
		$contents.find('BODY').wrapInner('<div id="TB_content_container" class="longtext"></div>');
	}
	if ($('#TB_ajaxContent').data('autoscale')) {
		$('#TB_ajaxContent').bind('mouseup click', function () { tb_timer2 = window.setTimeout('tb_scale()', 1); });
		if ($('#TB_ajaxContent #TB_content_container').length == 0) { $('#TB_ajaxContent').wrapInner('<div id="TB_content_container" class="longtext"></div>'); }
	}
	if ($('#TB_error').data('autoscale')) {
		$('#TB_error').bind('mouseup click', function () { tb_timer2 = window.setTimeout('tb_scale()', 1); });
		if ($('#TB_error #TB_content_container').length == 0) { $('#TB_error').wrapInner('<div id="TB_content_container" class="longtext"></div>'); }
	}
	$("#TB_load").remove();
	tb_scale();
	tb_setTop();
	window.setTimeout(function () { $(document).scrollTop(tb_scrollpos); }, 1);
}

function tb_show(caption, url, imageGroup, callback) {
	tb_scrollpos = $(document).scrollTop();
	tb_remove();
	try {
		window["ajaxTimeoutCallback"] = null;
		if (typeof (callback) === "function"){ window["ajaxTimeoutCallback"] = callback; }
		if (document.getElementById("TB_overlay") === null) {
			$("BODY").append("<div id='TB_overlay'></div><div id='TB_window' class='TB_window_hidden'></div>");
		}
		$("#TB_overlay").click(tb_remove).css({ height: '10000px' });
		$("#TB_overlay").addClass("TB_overlayBG");
		if (caption === null) {
			caption = "";
		}
		// $("body").append("<div id='TB_load'></div>"); //add loader to the page
		var baseURL;
		if (url.indexOf("?") !== -1) {
			// ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
		} else {
			baseURL = url;
		}
		var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
		var urlType = baseURL.toLowerCase().match(urlString);
		// Create template
		var template = '';
		template += "<div id='TB_container1'>";
		template += "<div id='TB_main'><div class='TB_header' id='TB_header'><div class='a'><div class='logo'></div></div></div><div class='main-b'><div id='TB_body' class='clear'>";
		if (typeof (locales) != 'undefined' && locales.simpleloader) {
			template += '<div id="TB_loader3" class="loader03 center"><span>' + locales.simpleloader + '</span></div>';
		} else {
			template += '<div id="TB_loader3" class="loader03 center"><span>...</span></div>';
		}
		template += "</div></div></div>";
		template += "</div>";
		$("#TB_container1").remove();
		$("#TB_window").append(template);
		tb_timer1 = window.setTimeout('tb_preloader()', 1000);
		$("#TB_window").hide();
		$("#TB_window").fadeIn(450);
		if (urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp') {
			// code to show images
			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if (imageGroup) {
				TB_PrevHTML = "<a href='#' id='TB_prev'></a>";
				TB_NextHTML = "<a href='#' id='TB_next'></a>";
				TB_TempArray = $("a[rel=" + imageGroup + "]").get();
				for (TB_Counter = 0;
					 ((TB_Counter < TB_TempArray.length) && (TB_NextURL === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
					if (!(TB_TempArray[TB_Counter].href == url)) {
						if (!TB_FoundURL) {
							TB_PrevCaption = TB_TempArray[TB_Counter].title;
							TB_PrevURL = TB_TempArray[TB_Counter].href;
						} else {
							TB_NextCaption = TB_TempArray[TB_Counter].title;
							TB_NextURL = TB_TempArray[TB_Counter].href;
						}
					} else {
						TB_FoundURL = true;
						TB_imageCount = "<span id='TB_imgcount'>" + (TB_Counter + 1) + " / " + (TB_TempArray.length) + "</span>";
					}
				}
			}
			imgPreloader = new Image();
			imgPreloader.onload = function () {
				imgPreloader.onload = null;
				// Resizing large images - orginal by Christian Montoya edited by me.
				var pagesize = tb_getPageSize();
				var x = pagesize[0] - 70;
				var y = pagesize[1] - 70;
				var imageWidth = imgPreloader.width;
				var imageHeight = imgPreloader.height;
				if (imageWidth > x) {
					imageHeight = imageHeight * (x / imageWidth);
					imageWidth = x;
					if (imageHeight > y) {
						imageWidth = imageWidth * (y / imageHeight);
						imageHeight = y;
					}
				} else if (imageHeight > y) {
					imageWidth = imageWidth * (y / imageHeight);
					imageHeight = y;
					if (imageWidth > x) {
						imageHeight = imageHeight * (x / imageWidth);
						imageWidth = x;
					}
				}
				// End Resizing
				TB_WIDTH = imageWidth;
				TB_HEIGHT = imageHeight;
				// Fixing small images - original by me :)
				var placeholderInject = '';
				var x2 = 300;
				var y2 = 250;
				var z = '';
				if (imageWidth < x2) {
					TB_WIDTH = x2;
					z += ' padding-left: ' + (x2 - imageWidth) / 2 + 'px;';
					z += ' padding-right: ' + (x2 - imageWidth) / 2 + 'px;';
				}
				if (imageHeight < y2) {
					TB_HEIGHT = y2;
					z += ' padding-top: ' + (y2 - imageHeight) / 2 + 'px;';
					z += ' padding-bottom: ' + (y2 - imageHeight) / 2 + 'px;';
				}
				placeholderInject = ' style="' + z + '"';
				var createwindow = '';
				createwindow += "<div class='clear' id='TB_ajaxWindowTitle'>";
				createwindow += "<a href='#' id='TB_closeWindowButton'>" + locales.tbclose + "</a>";
				createwindow += TB_PrevHTML;
				createwindow += TB_imageCount;
				createwindow += TB_NextHTML;
				createwindow += "</div>";
				createwindow += "<div id='TB_container2'><div id='TB_content_placeholder'><a href='' id='TB_ImageOff'" + placeholderInject + "><img id='TB_Image' src='" + url + "' width='" + imageWidth + "' height='" + imageHeight + "' alt=''/></a></div></div>";
				if (caption !== "") {
					createwindow += "<div id='TB_caption'><p>" + caption + "</p></div>";
				}
				$("#TB_body").append(createwindow);
				$("#TB_closeWindowButton").click(function () {
					tb_remove();
					return false;
				});
				if (!(TB_PrevURL === "")) {
					function goPrev() {
						if ($(document).unbind("click", goPrev)) {
							$(document).unbind("click", goPrev);
						}
						$("#TB_window").remove();
						$("body").append("<div id='TB_window'></div>");
						tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
						return false;
					}
					$("#TB_prev").click(function () {
						goPrev();
						return false;
					});
				} else {
					$("#TB_prev").addClass('TB_disabled').click(function () {
						return false;
					});
				}
				if (!(TB_NextURL === "")) {
					function goNext() {
						$("#TB_window").remove();
						$("body").append("<div id='TB_window'></div>");
						tb_show(TB_NextCaption, TB_NextURL, imageGroup);
						return false;
					}
					$("#TB_next").click(function () {
						goNext();
						return false;
					});
				} else {
					$("#TB_next").addClass('TB_disabled').click(function () {
						return false;
					});
				}
				document.onkeydown = function (e) {
					if (e == null) { // ie
						keycode = event.keyCode;
					} else { // mozilla
						keycode = e.which;
					}
					if (keycode == 27) { // close
						tb_remove();
					} else if (keycode == 39) { // display previous image
						if (!(TB_NextHTML == "")) {
							document.onkeydown = "";
							goNext();
						}
					} else if (keycode == 37) { // display next image
						if (!(TB_PrevURL == "")) {
							document.onkeydown = "";
							goPrev();
						}
					}
				};
				$("#TB_load").remove();
				$("#TB_ImageOff").click(tb_remove);
				tb_display();
			};
			imgPreloader.src = url;
		} else {
			// code to show html
			var queryString = url.replace(/^[^\?]+\??/, '');
			var params = tb_parseQuery(queryString);
			TB_WIDTH = (params.width * 1) || 630;
			TB_HEIGHT = (params.height * 1) || 440;
			ajaxContentW = TB_WIDTH;
			ajaxContentH = TB_HEIGHT;
			if (url.indexOf('TB_iframe') != -1) {
				// iframe
				urlNoQuery = url.split('#TB_');
				$("#TB_iframeContent").empty().remove();
				if (params.modal == "true") {
					$("#TB_overlay").unbind();
				}
				$('#TB_content_placeholder').remove();
				$('#TB_body').append("<div id='TB_content_placeholder' class='hidden'><iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' style='width:" + (ajaxContentW) + "px;height:" + (ajaxContentH) + "px;' scrolling='auto'></iframe></div>");
			} else if (url.indexOf('TB_error') != -1) {
				if (params.modal == "true") {
					$("#TB_overlay").unbind();
				}
				$('#TB_content_placeholder').remove();
				$('#TB_body').append("<div id='TB_content_placeholder' class='hidden'><div id='TB_error' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px'><p>" + imageGroup + "</p><ul class='actions01 clear'><li><a href='#' class='btn main'><span>OK</span></a></li></ul></div></div>");
				$('#TB_error A').click(function () {
					return tb_remove();
				});
				$('#TB_overlay')[0].className = 'TB_overlayClear';
				$('#TB_window')[0].className = 'TB_window_error';
			} else {
				// inline
				if ($("#TB_window").hasClass('TB_window_visible') != true) {
					if (params.modal == "true") {
						$("#TB_overlay").unbind();
					}
					$('#TB_content_placeholder').remove();
					$('#TB_body').append("<div id='TB_content_placeholder' class='hidden'><div id='TB_ajaxContent_holder'><div id='TB_ajaxContent' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px'></div></div></div>");
				} else {
					// this means the window is already up, we are just loading new content via ajax
					$("#TB_ajaxContent")[0].style.width = ajaxContentW + "px";
					$("#TB_ajaxContent")[0].style.height = ajaxContentH + "px";
					$("#TB_ajaxContent")[0].scrollTop = 0;
					$("#TB_ajaxWindowTitle").html(caption);
				}
			}
			if (url.indexOf('TB_inline') != -1) {
				$('#TB_content_container').contents().unwrap();
				$("#TB_ajaxContent").append($('#' + params.inlineId).children());
				$("#TB_window").bind('tb_unload', function () {
					$('#' + params.inlineId).append($("#TB_ajaxContent").children()); // move
													    // elements
													    // back when
													    // you're
													    // finished
				});
				if (url.indexOf('autoscale') != -1) {
					$('#TB_ajaxContent').data('autoscale', params.autoscale);
				}
				tb_display();
			} else if (url.indexOf('TB_error') != -1) {
				$('#TB_content_container').contents().unwrap();
				if (url.indexOf('autoscale') != -1) {
					$('#TB_error').data('autoscale', params.autoscale);
				}
				tb_display();
			} else if (url.indexOf('TB_iframe') != -1) {
				if (url.indexOf('autoscale') != -1) {
					$('#TB_iframeContent').data('autoscale', params.autoscale);
				}
				$('#TB_iframeContent').load(tb_display);
			} else {
				$("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()), function () {
					$("#TB_load").remove();
					tb_init("#TB_ajaxContent A.thickbox");
				});
				tb_display();
			}
		}
		if (!params.modal && url.indexOf('TB_error') == -1) {
			$('#TB_header DIV.a').append('<a href="#" class="close"><span>' + locales.tbclose + '</span></a>');
			$("#TB_header DIV.a A.close").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
				tb_remove();
			});
			document.onkeyup = function (e) {
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if (keycode == 27) { // close
					tb_remove();
				}
			};
		}
        //addIframeProxy();
	} catch (e) {
	    console.error(e);
	}
}

function tb_remove() {
	"use strict";
	//window.clearTimeout(tb_timer1);
	//window.clearTimeout(tb_timer2);
	$("#TB_ImageOff").unbind("click");
		$('#TB_window, #TB_overlay, #TB_HideSelect').trigger("tb_unload").unbind().remove();
		$("#TB_load").remove();
		document.onkeydown = "";
		document.onkeyup = "";
		$(document).scrollTop(tb_scrollpos);
		$(window).unbind('thickbox');
		return false;
}

/*var tb_timer1 = '',
	tb_timer2 = '',
	tb_scrollpos = 0,
	highchartoptions;

// Jquery regex

jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ?
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

// #################### THICKBOX RELATED #################### //

$(document).ready(function () {
	"use strict";
	tb_init('a.thickbox, area.thickbox, input.thickbox');
});
// add thickbox to href & area elements that have a class of .thickbox

function tb_init(domChunk) {
	"use strict";
	$(domChunk).click(function () {
		var t = this.title || this.name || $(this).data('title') || null,
			a = this.href || this.alt,
			g = this.rel || false;
		tb_show(t, a, g);
		this.blur();
		return false;
	});
}

var keys = {
	    37 : 1,
	    38 : 1,
	    39 : 1,
	    40 : 1
	};
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
	e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
	preventDefault(e);
	return false;
	}
    }

function disableScroll() {
    if (window.addEventListener) // older FF
	window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
    }

function enableScroll() {
    if (window.removeEventListener)
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
    }

function tb_removeQuick() {
    "use strict";
    $("#TB_ImageOff").unbind("click");
    $('#TB_window, #TB_overlay, #TB_HideSelect').trigger("tb_unload").unbind().remove();
    $('#TB_window, #TB_overlay, #TB_HideSelect, #TB_load').remove();
    document.onkeydown = "";
    document.onkeyup = "";
    $(document).scrollTop(tb_scrollpos);
    $(window).unbind('thickbox');
}

function tb_show_no_scroll(caption, url, imageGroup, callback) {
    tb_show(caption, url, imageGroup, callback);
    
    $('#TB_overlay').mouseover(function() {
	disableScroll();
    });

    $('#TB_window').mouseover(function() {
	enableScroll();
	$(window).scroll(function() {

	    var pageTop = $(window).scrollTop();
	    var pageBottom = pageTop + $(window).height();
// var elementTop = $('#TB_window').offset().top;
	    var elementTop = ($('#TB_window').offset() || { "top": NaN }).top;
	    if (isNaN(elementTop)) {
		elementTop = 0;
	    }
	    var elementBottom = elementTop + $('#TB_window').height();

	    if (elementTop > pageTop && elementBottom < pageBottom) {
		
		var screenHeight = pageBottom - pageTop;
		var popupHeight = elementBottom - elementTop;
		var topPosition = (screenHeight - popupHeight) / 2;
		
		$("#TB_window").css({
		    "margin-top" : pageTop + "px",
		    "top" : topPosition + "px",
		});
	    } else if (elementTop < pageTop && elementBottom < pageBottom) {
		$("#TB_window").css({
		    "margin-top" : pageTop - (pageTop - elementTop) + "px",
		    "top" : "20px",
		});
	    } else if (elementBottom > pageBottom && elementTop > pageTop) {
		$("#TB_window").css({
		    "margin-top" : pageTop + "px",
		    "top" : "20px",
		});
	    }
	});
    });
}*/



/*function tb_preloader() {
	"use strict";
	$("#TB_window").removeClass('TB_window_hidden').addClass('TB_window_visible');
	// $("#TB_window").css({ width: '10000px' });
	var tb_tmp01w = $('#TB_window').outerWidth() - $('#TB_body').outerWidth() + 200;
	$("#TB_window").css({
		marginLeft: '-' + parseInt((tb_tmp01w / 2), 10) + 'px',
		top: $(document).scrollTop() + (tb_getPageSize()[1] / 2) - ($("#TB_window").outerHeight() / 2) + 'px',
		width: tb_tmp01w + 'px'
	});
}
// All the positioning and resizing functionality.

function tb_scale() {
	// handle height of the window
	$("#TB_window").removeClass('TB_window_hidden').addClass('TB_window_visible');
	$("#TB_content_placeholder").removeClass('hidden');
	$("#TB_loader3").addClass('hidden');
    if ($('#TB_iframeContent').length > 0 && ($('#TB_iframeContent').data('autoscale') == 1 || $('#TB_iframeContent').data('autoscale') == 2)) {
        var $contents = $('#TB_iframeContent').contents();
        $contents.find('HTML').css({
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        TB_HEIGHT2 = $contents.find('BODY').outerHeight() + 2;
        TB_WIDTH2 = TB_WIDTH;
        $('#TB_main DIV.main-b').css({
            marginRight: '20px'
        });
        $('#TB_iframeContent').css('width', TB_WIDTH2 + 'px');
        $contents.find('#TB_content_container').css('width', TB_WIDTH);
        // $('#TB_iframeContent').css('height', TB_HEIGHT2);
    } else if ($('#TB_ajaxContent').length > 0 && $('#TB_ajaxContent').data('autoscale') == 1) {
        // autoscale 1 - content resize changes window height, div
        TB_HEIGHT2 = $('#TB_content_container').outerHeight() + 2;
        TB_WIDTH2 = TB_WIDTH;
        $('#TB_main DIV.main-b').css({
            marginRight: '20px'
        });
        $('#TB_ajaxContent').css('width', TB_WIDTH2 + 'px').find('#TB_content_container').css('width', TB_WIDTH);
        $('#TB_ajaxContent').css('height', TB_HEIGHT2);
    } else if ($('#TB_ajaxContent').length > 0 && $('#TB_ajaxContent').data('autoscale') == 2) {
        // autoscale 2 - content does not resize window height, div
        TB_HEIGHT2 = TB_HEIGHT + 2;
        if ($('#TB_content_container').outerHeight() < TB_HEIGHT) {
            TB_WIDTH2 = TB_WIDTH;
            $('#TB_main DIV.main-b').css({
                marginRight: '20px'
            });
        } else {
            TB_WIDTH2 = TB_WIDTH + 30;
            $('#TB_main DIV.main-b').css({
                marginRight: '10px'
            });
        }
        $('#TB_ajaxContent').css('width', TB_WIDTH2 + 'px').find('#TB_content_container').css('width', TB_WIDTH);
        $('#TB_ajaxContent').css('height', TB_HEIGHT2);
    } else if ($('#TB_error').length > 0 && $('#TB_error').data('autoscale') == 1) {
        // autoscale 1 - content resize changes window height, div
        TB_HEIGHT2 = $('#TB_content_container').outerHeight() + 2;
        TB_WIDTH2 = TB_WIDTH;
        $('#TB_main DIV.main-b').css({
            marginRight: '20px'
        });
        $('#TB_error').css('width', TB_WIDTH2 + 'px').find('#TB_content_container').css('width', TB_WIDTH);
        $('#TB_error').css('height', TB_HEIGHT2);
    } else {
        // no autoscale - fixed everything
        if ($('#TB_iframeContent').length > 0) {
            $('#TB_iframeContent').contents().find('HTML').css({
                overflow: 'hidden'
            });
        }
        if ($('#TB_ajaxContent').length > 0) {
            $('#TB_ajaxContent').css({
                overflow: 'hidden'
            });
        }
        TB_WIDTH2 = TB_WIDTH;
        TB_HEIGHT2 = TB_HEIGHT + 2;
    }
    $('#TB_content_placeholder').css({
        width: TB_WIDTH2 + 'px',
        height: TB_HEIGHT2 + 'px'
    });
    $("#TB_window").css({
        width: TB_WIDTH2 + 40
    });
    var tb_tmp01w = $('#TB_window').outerWidth() - $('#TB_body').outerWidth() + TB_WIDTH2;
    $("#TB_window").css({
        marginLeft: '-' + parseInt((tb_tmp01w / 2), 10) + 'px',
        width: tb_tmp01w + 'px',
        left: '50%'
    });
	$("#TB_window").removeClass('TB_window_hidden').addClass('TB_window_visible');
}

function tb_display() {
	// display the window
	window.clearTimeout(tb_timer1);
	window.clearTimeout(tb_timer2);

	// Bind scaling events
	if ($('#TB_iframeContent').data('autoscale')) {
		var $contents = $('#TB_iframeContent').contents();
		$contents.find('BODY').bind('mouseup click', function () { tb_timer2 = window.setTimeout('tb_scale()', 1); });
		$contents.find('BODY').wrapInner('<div id="TB_content_container" class="longtext"></div>');
	}
	if ($('#TB_ajaxContent').data('autoscale')) {
		$('#TB_ajaxContent').bind('mouseup click', function () { tb_timer2 = window.setTimeout('tb_scale()', 1); });
		if ($('#TB_ajaxContent #TB_content_container').length == 0) { $('#TB_ajaxContent').wrapInner('<div id="TB_content_container" class="longtext"></div>'); }
	}
	if ($('#TB_error').data('autoscale')) {
		$('#TB_error').bind('mouseup click', function () { tb_timer2 = window.setTimeout('tb_scale()', 1); });
		if ($('#TB_error #TB_content_container').length == 0) { $('#TB_error').wrapInner('<div id="TB_content_container" class="longtext"></div>'); }
	}
	$("#TB_load").remove();
	tb_scale();
	tb_setTop();
	window.setTimeout(function () { $(document).scrollTop(tb_scrollpos); }, 1);
}

function tb_setTop() {
	"use strict";
	var desiredtop;
	if ($('#TB_window').outerHeight() - $('#TB_body').outerHeight() + $("#TB_window").outerHeight() > tb_getPageSize()[1]) {
		desiredtop = $(document).scrollTop() + 10;
	} else {
		desiredtop = $(document).scrollTop() + 10 + (tb_getPageSize()[1] / 2) - ($("#TB_window").outerHeight() / 2);
	}
	$("#TB_window").css({
		top: (desiredtop > 10 ? desiredtop : 10) + 'px'
	});
}



function tb_parseQuery(query) {
	var Params = {};
	if (!query) {
		return Params;
	} // return empty object
	var Pairs = query.split(/[;&]/);
	for (var i = 0; i < Pairs.length; i++) {
		var KeyVal = Pairs[i].split('=');
		if (!KeyVal || KeyVal.length != 2) {
			continue;
		}
		var key = unescape(KeyVal[0]);
		var val = unescape(KeyVal[1]);
		val = val.replace(/\+/g, ' ');
		Params[key] = val;
	}
	return Params;
}

function tb_getPageSize() {
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w, h];
	return arrayPageSize;
}

function tb_detectMacXFF() {
	"use strict";
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox') != -1) {
		return true;
	}
}

// #################### DATEPICKER RELATED #################### //

*//**
 * 
 * Date picker Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 * 
 * Modified by e90alki
 * 
 *//*
(function ($) {
	var DatePicker = function () {
		var	ids = {},
			views = {
				years: 'datepickerViewYears',
				moths: 'datepickerViewMonths',
				days: 'datepickerViewDays'
			},
			tpl = {
				wrapper: '<div class="datepicker"><div class="posrel"><div class="datepickerContainer"><div class="datepickerContainer-a"><p class="close clear"><a href="#"><i></i><span><%=closelabel%></span></a> <span class="info"><%=infolabel%></span></p><div class="tables-a"><div class="tables-b"><div class="w100p"><table class="container"><tbody><tr></tr></tbody></table></div></div></div><div class="quickset hidden"><a href="#" class="today"><%=today%></a> <span>|</span> <a href="#" class="tomorrow"><%=tomorrow%></a></div></div></div></div></div>',
				head: [
					'<td>',
					'<table>',
						'<thead>',
							'<tr class="years">',
								'<th class="datepickerGoPrev"><a href="#"><span><%=prev%></span></a></th>',
								'<th colspan="5" class="datepickerYear"><span></span></th>',
								'<th class="datepickerGoNext"><a href="#"><span><%=next%></span></a></th>',
							'</tr>',
							'<tr class="months">',
								'<th class="datepickerGoPrev"><a href="#"><span><%=prev%></span></a></th>',
								'<th colspan="5" class="datepickerMonth"><span></span></th>',
								'<th class="datepickerGoNext"><a href="#"><span><%=next%></span></a></th>',
							'</tr>',
							'<tr class="datepickerDoW">',
								'<th><span><%=day1%></span></th>',
								'<th><span><%=day2%></span></th>',
								'<th><span><%=day3%></span></th>',
								'<th><span><%=day4%></span></th>',
								'<th><span><%=day5%></span></th>',
								'<th><span><%=day6%></span></th>',
								'<th><span><%=day7%></span></th>',
							'</tr>',
						'</thead>',
					'</table></td>'
				],
				space : '<td class="datepickerSpace"><div></div></td>',
				days: [
					'<tbody class="datepickerDays">',
						'<tr>',
							'<td class="first <%=weeks[0].days[0].classname%>"><a href="#"><span><%=weeks[0].days[0].text%></span></a></td>',
							'<td class="<%=weeks[0].days[1].classname%>"><a href="#"><span><%=weeks[0].days[1].text%></span></a></td>',
							'<td class="<%=weeks[0].days[2].classname%>"><a href="#"><span><%=weeks[0].days[2].text%></span></a></td>',
							'<td class="<%=weeks[0].days[3].classname%>"><a href="#"><span><%=weeks[0].days[3].text%></span></a></td>',
							'<td class="<%=weeks[0].days[4].classname%>"><a href="#"><span><%=weeks[0].days[4].text%></span></a></td>',
							'<td class="<%=weeks[0].days[5].classname%>"><a href="#"><span><%=weeks[0].days[5].text%></span></a></td>',
							'<td class="<%=weeks[0].days[6].classname%>"><a href="#"><span><%=weeks[0].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td class="first <%=weeks[1].days[0].classname%>"><a href="#"><span><%=weeks[1].days[0].text%></span></a></td>',
							'<td class="<%=weeks[1].days[1].classname%>"><a href="#"><span><%=weeks[1].days[1].text%></span></a></td>',
							'<td class="<%=weeks[1].days[2].classname%>"><a href="#"><span><%=weeks[1].days[2].text%></span></a></td>',
							'<td class="<%=weeks[1].days[3].classname%>"><a href="#"><span><%=weeks[1].days[3].text%></span></a></td>',
							'<td class="<%=weeks[1].days[4].classname%>"><a href="#"><span><%=weeks[1].days[4].text%></span></a></td>',
							'<td class="<%=weeks[1].days[5].classname%>"><a href="#"><span><%=weeks[1].days[5].text%></span></a></td>',
							'<td class="<%=weeks[1].days[6].classname%>"><a href="#"><span><%=weeks[1].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td class="first <%=weeks[2].days[0].classname%>"><a href="#"><span><%=weeks[2].days[0].text%></span></a></td>',
							'<td class="<%=weeks[2].days[1].classname%>"><a href="#"><span><%=weeks[2].days[1].text%></span></a></td>',
							'<td class="<%=weeks[2].days[2].classname%>"><a href="#"><span><%=weeks[2].days[2].text%></span></a></td>',
							'<td class="<%=weeks[2].days[3].classname%>"><a href="#"><span><%=weeks[2].days[3].text%></span></a></td>',
							'<td class="<%=weeks[2].days[4].classname%>"><a href="#"><span><%=weeks[2].days[4].text%></span></a></td>',
							'<td class="<%=weeks[2].days[5].classname%>"><a href="#"><span><%=weeks[2].days[5].text%></span></a></td>',
							'<td class="<%=weeks[2].days[6].classname%>"><a href="#"><span><%=weeks[2].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td class="first <%=weeks[3].days[0].classname%>"><a href="#"><span><%=weeks[3].days[0].text%></span></a></td>',
							'<td class="<%=weeks[3].days[1].classname%>"><a href="#"><span><%=weeks[3].days[1].text%></span></a></td>',
							'<td class="<%=weeks[3].days[2].classname%>"><a href="#"><span><%=weeks[3].days[2].text%></span></a></td>',
							'<td class="<%=weeks[3].days[3].classname%>"><a href="#"><span><%=weeks[3].days[3].text%></span></a></td>',
							'<td class="<%=weeks[3].days[4].classname%>"><a href="#"><span><%=weeks[3].days[4].text%></span></a></td>',
							'<td class="<%=weeks[3].days[5].classname%>"><a href="#"><span><%=weeks[3].days[5].text%></span></a></td>',
							'<td class="<%=weeks[3].days[6].classname%>"><a href="#"><span><%=weeks[3].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td class="first <%=weeks[4].days[0].classname%>"><a href="#"><span><%=weeks[4].days[0].text%></span></a></td>',
							'<td class="<%=weeks[4].days[1].classname%>"><a href="#"><span><%=weeks[4].days[1].text%></span></a></td>',
							'<td class="<%=weeks[4].days[2].classname%>"><a href="#"><span><%=weeks[4].days[2].text%></span></a></td>',
							'<td class="<%=weeks[4].days[3].classname%>"><a href="#"><span><%=weeks[4].days[3].text%></span></a></td>',
							'<td class="<%=weeks[4].days[4].classname%>"><a href="#"><span><%=weeks[4].days[4].text%></span></a></td>',
							'<td class="<%=weeks[4].days[5].classname%>"><a href="#"><span><%=weeks[4].days[5].text%></span></a></td>',
							'<td class="<%=weeks[4].days[6].classname%>"><a href="#"><span><%=weeks[4].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td class="first <%=weeks[5].days[0].classname%>"><a href="#"><span><%=weeks[5].days[0].text%></span></a></td>',
							'<td class="<%=weeks[5].days[1].classname%>"><a href="#"><span><%=weeks[5].days[1].text%></span></a></td>',
							'<td class="<%=weeks[5].days[2].classname%>"><a href="#"><span><%=weeks[5].days[2].text%></span></a></td>',
							'<td class="<%=weeks[5].days[3].classname%>"><a href="#"><span><%=weeks[5].days[3].text%></span></a></td>',
							'<td class="<%=weeks[5].days[4].classname%>"><a href="#"><span><%=weeks[5].days[4].text%></span></a></td>',
							'<td class="<%=weeks[5].days[5].classname%>"><a href="#"><span><%=weeks[5].days[5].text%></span></a></td>',
							'<td class="<%=weeks[5].days[6].classname%>"><a href="#"><span><%=weeks[5].days[6].text%></span></a></td>',
						'</tr>',
					'</tbody>'
				],
				months: [
					'<tbody class="<%=className%>">',
						'<tr>',
							'<td colspan="2"><a href="#"><span><%=data[0]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[1]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[2]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[3]%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td colspan="2"><a href="#"><span><%=data[4]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[5]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[6]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[7]%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td colspan="2"><a href="#"><span><%=data[8]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[9]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[10]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[11]%></span></a></td>',
						'</tr>',
					'</tbody>'
				]
			},
			defaults = {
				flat: false,
				starts: 1,
				prev: '&#9664;',
				next: '&#9654;',
				lastSel: false,
				mode: 'single',
				view: 'days',
				calendars: 1,
				format: 'yy-mm-dd',
				position: 'bottom',
				eventName: 'click',
				setmargin: '',
				onRender: function () { return {}; },
				onChange: function () { return true; },
				onShow: function () { return true; },
				onBeforeShow: function () { return true; },
				onHide: function () { return true; },
				locale: {
					days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
					daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
					months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					weekMin: 'wk',
                    today: 'Today',
                    tomorrow: 'Tomorrow',
					closelabel: 'Close',
					infolabel01: 'Select a start date from calendar',
					infolabel02: 'Select a end date from calendar for date range',
					infolabel03: 'When done, click close'
				}
			},
			fill = function(el) {
				var options = $(el).data('datepicker');
				var cal = $(el);
				var currentCal = Math.floor(options.calendars/2), date, data, dow, month, cnt = 0, week, days, indic, indic2, html, tblCal;
				cal.find('td>table tbody').remove();
				for (var i = 0; i < options.calendars; i++) {
					date = new Date(options.current);
					date.addMonths(-currentCal + i);
					tblCal = cal.find('table').eq(i+1);
					switch (tblCal[0].className) {
						case 'datepickerViewDays':
							dow = formatDate(date, 'B');
							dow2 = formatDate(date, 'Y');
							break;
						case 'datepickerViewMonths':
							dow = date.getFullYear();
							break;
						case 'datepickerViewYears':
							dow = (date.getFullYear()-6) + ' - ' + (date.getFullYear()+5);
							break;
					}
					tblCal.find('thead tr:eq(0) th:eq(1) span').text(dow2);
					tblCal.find('thead tr:eq(1) th:eq(1) span').text(dow);
					dow = date.getFullYear()-6;
					data = {
						data: [],
						className: 'datepickerYears'
					}
					for ( var j = 0; j < 12; j++) {
						data.data.push(dow + j);
					}
					html = tmpl(tpl.months.join(''), data);
					date.setDate(1);
					data = {weeks:[], test: 10};
					month = date.getMonth();
					var dow = (date.getDay() - options.starts) % 7;
					date.addDays(-(dow + (dow < 0 ? 7 : 0)));
					week = -1;
					cnt = 0;
					while (cnt < 42) {
						indic = parseInt(cnt/7,10);
						indic2 = cnt%7;
						if (!data.weeks[indic]) {
							week = date.getWeekNumber();
							data.weeks[indic] = {
								week: week,
								days: []
							};
						}
						data.weeks[indic].days[indic2] = {
							text: date.getDate(),
							classname: []
						};
						if (month !== date.getMonth()) {
							data.weeks[indic].days[indic2].classname.push('datepickerNotInMonth');
						}
						if (date.getDay() === 0) {
							data.weeks[indic].days[indic2].classname.push('datepickerSunday');
						}
						if (date.getDay() === 6) {
							data.weeks[indic].days[indic2].classname.push('datepickerSaturday');
						}
						var fromUser = options.onRender(date);
						var val = date.valueOf();
						if (fromUser.selected || options.date === val || $.inArray(val, options.date) > -1 || (options.mode === 'range' && val >= options.date[0] && val <= options.date[1])) {
							if( options.mode === 'range' && ((val < options.date[0]+8640000) || (val >= options.date[1]-86400000))){
								data.weeks[indic].days[indic2].classname.push('datepickerSelected');
							} else if(options.date === val){
								data.weeks[indic].days[indic2].classname.push('datepickerSelected');
							}else {
								data.weeks[indic].days[indic2].classname.push('datepickerSelectedInRange');
							}
						}
						if (fromUser.disabled) {
							data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
						}

						var futdate = new Date();
						var expdate = futdate.getTime();
						if (fromUser.className) {
							data.weeks[indic].days[indic2].classname.push(fromUser.className);
						}
						data.weeks[indic].days[indic2].classname = data.weeks[indic].days[indic2].classname.join(' ');
						cnt++;
						date.addDays(1);
					}
					html = tmpl(tpl.days.join(''), data) + html;
					data = {
						data: options.locale.monthsShort,
						className: 'datepickerMonths'
					};
					html = tmpl(tpl.months.join(''), data) + html;
					tblCal.append(html);
				}
			},
			parseDate = function (date, format) {
				if (date.constructor === Date) {
					return new Date(date);
				}
				var parts = date.split(/\W+/);
				var against = format.split(/\W+/), d, m, y, h, min, now = new Date();
				for (var i = 0; i < parts.length; i++) {
					switch (against[i]) {
						case 'd':
						case 'e':
							d = parseInt(parts[i],10);
							break;
						case 'm':
							m = parseInt(parts[i], 10)-1;
							break;
						case 'Y':
						case 'y':
							y = parseInt(parts[i], 10);
							y += y > 100 ? 0 : (y < 29 ? 2000 : 1900);
							break;
						case 'H':
						case 'I':
						case 'k':
						case 'l':
							h = parseInt(parts[i], 10);
							break;
						case 'P':
						case 'p':
							if (/pm/i.test(parts[i]) && h < 12) {
								h += 12;
							} else if (/am/i.test(parts[i]) && h >= 12) {
								h -= 12;
							}
							break;
						case 'M':
							min = parseInt(parts[i], 10);
							break;
					}
				}
				return new Date(
					y === undefined ? now.getFullYear() : y,
					m === undefined ? now.getMonth() : m,
					d === undefined ? now.getDate() : d,
					h === undefined ? now.getHours() : h,
					min === undefined ? now.getMinutes() : min,
					0
				);
			},
			formatDate = function(date, format) {
				var m = date.getMonth();
				var d = date.getDate();
				var y = date.getFullYear();
				var wn = date.getWeekNumber();
				var w = date.getDay();
				var s = {};
				var hr = date.getHours();
				var pm = (hr >= 12);
				var ir = (pm) ? (hr - 12) : hr;
				var dy = date.getDayOfYear();
				if (ir === 0) {
					ir = 12;
				}
				var min = date.getMinutes();
				var sec = date.getSeconds();
				var parts = format.split(''), part;
				for ( var i = 0; i < parts.length; i++ ) {
					part = parts[i];
					switch (parts[i]) {
						case 'a':
							part = date.getDayName();
							break;
						case 'A':
							part = date.getDayName(true);
							break;
						case 'b':
							part = date.getMonthName();
							break;
						case 'B':
							part = date.getMonthName(true);
							break;
						case 'C':
							part = 1 + Math.floor(y / 100);
							break;
						case 'd':
							part = (d < 10) ? ("0" + d) : d;
							break;
						case 'e':
							part = d;
							break;
						case 'H':
							part = (hr < 10) ? ("0" + hr) : hr;
							break;
						case 'I':
							part = (ir < 10) ? ("0" + ir) : ir;
							break;
						case 'j':
							part = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy;
							break;
						case 'k':
							part = hr;
							break;
						case 'l':
							part = ir;
							break;
						case 'm':
							part = (m < 9) ? ("0" + (1+m)) : (1+m);
							break;
						case 'M':
							part = (min < 10) ? ("0" + min) : min;
							break;
						case 'p':
						case 'P':
							part = pm ? "PM" : "AM";
							break;
						case 's':
							part = Math.floor(date.getTime() / 1000);
							break;
						case 'S':
							part = (sec < 10) ? ("0" + sec) : sec;
							break;
						case 'u':
							part = w + 1;
							break;
						case 'w':
							part = w;
							break;
						case 'y':
							part = ('' + y).substr(2, 2);
							break;
						case 'Y':
							part = y;
							break;
					}
					parts[i] = part;
				}
				return parts.join('');
			},
			extendDate = function(options) {
				if (Date.prototype.tempDate) {
					return;
				}
				Date.prototype.tempDate = null;
				Date.prototype.months = options.months;
				Date.prototype.monthsShort = options.monthsShort;
				Date.prototype.days = options.days;
				Date.prototype.daysShort = options.daysShort;
				Date.prototype.getMonthName = function(fullName) {
					return this[fullName ? 'months' : 'monthsShort'][this.getMonth()];
				};
				Date.prototype.getDayName = function(fullName) {
					return this[fullName ? 'days' : 'daysShort'][this.getDay()];
				};
				Date.prototype.addDays = function (n) {
					this.setDate(this.getDate() + n);
					this.tempDate = this.getDate();
				};
				Date.prototype.addMonths = function (n) {
					if (this.tempDate === null) {
						this.tempDate = this.getDate();
					}
					this.setDate(1);
					this.setMonth(this.getMonth() + n);
					this.setDate(Math.min(this.tempDate, this.getMaxDays()));
				};
				Date.prototype.addYears = function (n) {
					if (this.tempDate === null) {
						this.tempDate = this.getDate();
					}
					this.setDate(1);
					this.setFullYear(this.getFullYear() + n);
					this.setDate(Math.min(this.tempDate, this.getMaxDays()));
				};
				Date.prototype.getMaxDays = function() {
					var tmpDate = new Date(Date.parse(this)),
						d = 28, m;
					m = tmpDate.getMonth();
					d = 28;
					while (tmpDate.getMonth() === m) {
						d ++;
						tmpDate.setDate(d);
					}
					return d - 1;
				};
				Date.prototype.getFirstDay = function() {
					var tmpDate = new Date(Date.parse(this));
					tmpDate.setDate(1);
					return tmpDate.getDay();
				};
				Date.prototype.getWeekNumber = function() {
					var tempDate = new Date(this);
					tempDate.setDate(tempDate.getDate() - (tempDate.getDay() + 6) % 7 + 3);
					var dms = tempDate.valueOf();
					tempDate.setMonth(0);
					tempDate.setDate(4);
					return Math.round((dms - tempDate.valueOf()) / (604800000)) + 1;
				};
				Date.prototype.getDayOfYear = function() {
					var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
					var then = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
					var time = now - then;
					return Math.floor(time / 24*60*60*1000);
				};
			},
			layout = function (el) {
				var options = $(el).data('datepicker');
				var cal = $('#' + options.id);
				var tbl = cal.find('table:first').get(0);
				var width = $(tbl).outerWidth();
				var height = $(tbl).outerHeight();
			},
			click = function(ev) {
				if ($(ev.target).is('span')) {
					ev.target = ev.target.parentNode;
				}
				var el = $(ev.target);
				if (el.is('a')) {
					ev.target.blur();
					if (el.hasClass('datepickerDisabled')) {
						return false;
					}
					var options = $(this).data('datepicker');
					var parentEl = el.parent();
					var tblEl = parentEl.parent().parent().parent();
					var tblIndex = $('table', this).index(tblEl.get(0)) - 1;
					var tmp = new Date(options.current);
					var changed = false;
					var fillIt = false;
					if (parentEl.is('th')) {
						if (parentEl.parent().parent().is('thead') && parentEl.parent().is('.months')) {
							switch (tblEl.get(0).className) {
								case 'datepickerViewDays':
									options.current.addMonths(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
								case 'datepickerViewMonths':
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
								case 'datepickerViewYears':
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -12 : 12);
									break;
							}
							fillIt = true;
						} else if (parentEl.parent().parent().is('thead') && parentEl.parent().is('.years')){
							switch (tblEl.get(0).className) {
								case 'datepickerViewDays':
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
							}
							fillIt = true;
						}
					} else if (parentEl.is('td') && !parentEl.hasClass('datepickerDisabled')) {
						switch (tblEl.get(0).className) {
							case 'datepickerViewMonths':
								options.current.setMonth(tblEl.find('tbody.datepickerMonths td').index(parentEl));
								options.current.setFullYear(parseInt(tblEl.find('thead th.datepickerMonth span').text(), 10));
								options.current.addMonths(Math.floor(options.calendars/2) - tblIndex);
								tblEl.get(0).className = 'datepickerViewDays';
								break;
							case 'datepickerViewYears':
								options.current.setFullYear(parseInt(el.text(), 10));
								tblEl.get(0).className = 'datepickerViewMonths';
								break;
							default:
								var val = parseInt(el.text(), 10);
								tmp.addMonths(tblIndex - Math.floor(options.calendars/2));
								if (parentEl.hasClass('datepickerNotInMonth')) {
									tmp.addMonths(val > 15 ? -1 : 1);
								}
								tmp.setDate(val);
								switch (options.mode) {
									case 'multiple':
										val = (tmp.setHours(0,0,0,0)).valueOf();
										if ($.inArray(val, options.date) > -1) {
											$.each(options.date, function(nr, dat){
												if (dat === val) {
													options.date.splice(nr,1);
													return false;
												}
											});
										} else {
											options.date.push(val);
										}
										break;
									case 'range':
										if (!options.lastSel) {
											$(el).parents('.datepickerContainer').eq(0).find('P.close SPAN.info').text(options.locale.infolabel02);
											options.date[0] = (tmp.setHours(0,0,0,0)).valueOf();
										} else {
											$(el).parents('.datepickerContainer').eq(0).find('P.close SPAN.info').text(options.locale.infolabel03);
										}
										val = (tmp.setHours(23,59,59,0)).valueOf();
										if (val < options.date[0]) {
											options.date[1] = options.date[0] + 86399000;
											options.date[0] = val - 86399000;
										} else {
											options.date[1] = val;
										}
										options.lastSel = !options.lastSel;
										break;
									default:
										options.date = tmp.valueOf();
										break;
								}
								break;
						}
						fillIt = true;
						changed = true;
					}
					if (fillIt) {
						fill(this);
					}
					if (changed) {
						options.onChange.apply(this, prepareDate(options));
					}
				}
				return false;
			},
			prepareDate = function (options) {
				var tmp;
				if (options.mode === 'single') {
					tmp = new Date(options.date);
					return [formatDate(tmp, options.format), tmp, options.el];
				} else {
					tmp = [[],[], options.el];
					$.each(options.date, function(nr, val){
						var date = new Date(val);
						tmp[0].push(formatDate(date, options.format));
						tmp[1].push(date);
					});
					return tmp;
				}
			},
			getViewport = function () {
				var m = document.compatMode === 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl === el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl !== container) {
					if (prEl === parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			show = function (ev) {
				var cal = $('#' + $(this).data('datepickerId')),
                    inputEl = $(this);
                if (inputEl.attr('data-showquickset') == 'true') {
                    cal.find('.quickset').removeClass('hidden');
                }
				if (!cal.is(':visible')) {
					var calEl = cal.get(0);
					fill(calEl);
					var options = cal.data('datepicker');
					options.onBeforeShow.apply(this, [cal.get(0)]);
					var pos = $(this).offset();
					var viewPort = getViewport();
					var top = pos.top;
					var left = pos.left;
					var oldDisplay = $.css(calEl, 'display');
					cal.css({
						visibility: 'hidden',
						display: 'block'
					});
					layout(calEl);
					switch (options.position){
						case 'top':
							top -= calEl.offsetHeight;
							break;
						case 'left':
							left -= calEl.offsetWidth;
							break;
						case 'right':
							left += this.offsetWidth;
							break;
						case 'bottom':
							top += this.offsetHeight;
							break;
					}
					// if (top + calEl.offsetHeight > viewPort.t + viewPort.h) { top = pos.top -
					// calEl.offsetHeight; }
					if (top < viewPort.t) {
						top = pos.top + this.offsetHeight + calEl.offsetHeight;
					}
					if (left + calEl.offsetWidth > viewPort.l + viewPort.w) {
						left = pos.left + this.offsetWidth - calEl.offsetWidth;
					}
					if (options.setmargin !== ''){
						cal.css('margin',options.setmargin);
					} else {
						cal.css('margin','0');
					}
					cal.css({
						visibility: 'visible',
						display: 'block',
						top: top + 'px',
						left: left + 'px'
					});
					if (options.onShow.apply(this, [cal.get(0)]) !== false) {
						cal.show();
					}
					$(cal).find('P.close SPAN.info').text(options.locale.infolabel01);
					$(cal).find('P.close A, A.close').mousedown(function(e){
						e.preventDefault();
						e.stopPropagation();
						$(contentholders).trigger('mousedown');
					});
					$(contentholders).bind('mousedown', {cal: cal, trigger: this}, hide);

                    cal.find('A.today').click(function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        inputEl.DatePickerSetDate(Date.now());
                        inputEl.val(inputEl.DatePickerGetDate(1));
                        inputEl.DatePickerHide();
                    });
                    cal.find('A.tomorrow').click(function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        inputEl.DatePickerSetDate(Date.now() + 1*24*60*60*1000);
                        inputEl.val(inputEl.DatePickerGetDate(1));
                        inputEl.DatePickerHide();
                    });
				}
				return false;
			},
			hide = function (ev) {
				if (ev.target !== ev.data.trigger && !isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					if (ev.data.cal.data('datepicker').onHide.apply(this, [ev.data.cal.get(0)]) !== false) {
						ev.data.cal.hide();
					}
					$(contentholders).unbind('mousedown', hide);
				}
			};
		return {
			init: function(options){
				options = $.extend({}, defaults, options||{});
				extendDate(options.locale);
				options.calendars = Math.max(1, parseInt(options.calendars,10)||1);
				options.mode = /single|multiple|range/.test(options.mode) ? options.mode : 'single';
				return this.each(function(){
					if (!$(this).data('datepicker')) {
						options.el = this;
						if (options.date.constructor === String) {
							options.date = parseDate(options.date, options.format);
							options.date.setHours(0,0,0,0);
						}
						if (options.mode !== 'single') {
							if (options.date.constructor !== Array) {
								options.date = [options.date.valueOf()];
								if (options.mode == 'range') {
									options.date.push(((new Date(options.date[0])).setHours(23,59,59,0)).valueOf());
								}
							} else {
								for (var i = 0; i < options.date.length; i++) {
									options.date[i] = (parseDate(options.date[i], options.format).setHours(0,0,0,0)).valueOf();
								}
								if (options.mode == 'range') {
									options.date[1] = ((new Date(options.date[1])).setHours(23,59,59,0)).valueOf();
								}
							}
						} else {
							options.date = options.date.valueOf();
						}
						if (!options.current) {
							options.current = new Date();
						} else {
							options.current = parseDate(options.current, options.format);
						}
						options.current.setDate(1);
						options.current.setHours(0,0,0,0);
						var id = 'datepicker_' + parseInt(Math.random() * 1000), cnt;
						options.id = id;
						$(this).data('datepickerId', options.id);
						var cal = $(tmpl(tpl.wrapper, { closelabel: options.locale.closelabel, infolabel: options.locale.infolabel01, today: options.locale.today, tomorrow: options.locale.tomorrow })).attr('id', id).bind('click', click).data('datepicker', options);
						if (options.className) {
							cal.addClass(options.className);
						}
						var html = '';
						for (var i = 0; i < options.calendars; i++) {
							cnt = options.starts;
							if (i > 0) {
								html += tpl.space;
							}
							html += tmpl(tpl.head.join(''), {
									week: options.locale.weekMin,
									prev: options.prev,
									next: options.next,
									day1: options.locale.daysMin[(cnt++)%7],
									day2: options.locale.daysMin[(cnt++)%7],
									day3: options.locale.daysMin[(cnt++)%7],
									day4: options.locale.daysMin[(cnt++)%7],
									day5: options.locale.daysMin[(cnt++)%7],
									day6: options.locale.daysMin[(cnt++)%7],
									day7: options.locale.daysMin[(cnt++)%7]
								});
						}
						cal
							.find('tr:first').append(html)
								.find('table').addClass(views[options.view]);
						fill(cal.get(0));
						if (options.flat) {
							cal.appendTo(this).show();
							layout(cal.get(0));
						} else {
							cal.appendTo(document.body);
							$(this).bind(options.eventName, show);
						}
						if(options.calendars > 1){
							$(cal).find('TR.months TH.datepickerGoPrev A:not(:first), TR.months TH.datepickerGoNext A:not(:last)').css({ visibility: 'hidden' });
							$(cal).find('TR.years TH.datepickerGoPrev A:not(:first), TR.years TH.datepickerGoNext A:not(:last)').css({ visibility: 'hidden' });
						} else {
							$(cal).find('P.close').addClass('hidden');
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('datepickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
					if ($(this).data('datepickerId')) {
						$('#' + $(this).data('datepickerId')).hide();
					}
					$(document).unbind('mousedown', hide);
				});
			},
			setDate: function(date, shiftTo){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						options.date = date;
						if (options.date.constructor == String) {
							options.date = parseDate(options.date, options.format);
							options.date.setHours(0,0,0,0);
						}
						if (options.mode !== 'single') {
							if (options.date.constructor !== Array) {
								options.date = [options.date.valueOf()];
								if (options.mode == 'range') {
									options.date.push(((new Date(options.date[0])).setHours(23,59,59,0)).valueOf());
								}
							} else {
								for (var i = 0; i < options.date.length; i++) {
									options.date[i] = (parseDate(options.date[i], options.format).setHours(0,0,0,0)).valueOf();
								}
								if (options.mode == 'range') {
									options.date[1] = ((new Date(options.date[1])).setHours(23,59,59,0)).valueOf();
								}
							}
						} else {
							options.date = options.date.valueOf();
						}
						if (shiftTo) {
							options.current = new Date (options.mode !== 'single' ? options.date[0] : options.date);
						}
						fill(cal.get(0));
					}
				});
			},
			getDate: function(formated) {
				if (this.size() > 0) {
					return prepareDate($('#' + $(this).data('datepickerId')).data('datepicker'))[formated ? 0 : 1];
				}
			},
			parseDate: function(string) {
				return parseDate(string, $('#' + $(this).data('datepickerId')).data('datepicker').format);
			},
			clear: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						if (options.mode !== 'single') {
							options.date = [];
							fill(cal.get(0));
						}
					}
				});
			},
			fixLayout: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						if (options.flat) {
							layout(cal.get(0));
						}
					}
				});
			}
		};
	}();
	$.fn.extend({
		DatePicker: DatePicker.init,
		DatePickerHide: DatePicker.hidePicker,
		DatePickerShow: DatePicker.showPicker,
		DatePickerSetDate: DatePicker.setDate,
		DatePickerGetDate: DatePicker.getDate,
		DatePickerParseDate: DatePicker.parseDate,
		DatePickerClear: DatePicker.clear,
		DatePickerLayout: DatePicker.fixLayout
	});
})(jQuery);

(function(){
 var cache = {};

 this.tmpl = function tmpl(str, data){
	// Figure out if we're getting a template, or if we need to
	// load the template - and be sure to cache the result.
	var fn = !/\W/.test(str) ?
	 cache[str] = cache[str] ||
		tmpl(document.getElementById(str).innerHTML) :

	 // Generate a reusable function that will serve as a template
	 // generator (and which will be cached).
	 new Function("obj",
		"var p=[],print=function(){p.push.apply(p,arguments);};" +

		// Introduce the data as local variables using with(){}
		"with(obj){p.push('" +

		// Convert the template into pure JavaScript
		str
		 .replace(/[\r\t\n]/g, " ")
		 .split("<%").join("\t")
		 .replace(/((^|%>)[^\t]*)'/g, "$1\r")
		 .replace(/\t=(.*?)%>/g, "',$1,'")
		 .split("\t").join("');")
		 .split("%>").join("p.push('")
		 .split("\r").join("\\'")
	 + "');}return p.join('');");

	// Provide some basic currying to the user
	return data ? fn( data ) : fn;
 };
})();

// #################### TOOLTIPS RELATED #################### //

(function($) {
	$(document).ready(function(){
		$tooltip = $("#tooltip");
		if($tooltip.length == 0){
			$tooltip = $('<div id="tooltip"><div id="tooltip-inner">' + locales.simpleloader + '</div><div id="tooltip-arrow"></div></div>');
			$('BODY').append($tooltip);
		}
		$tooltip.bind('click',function(e){
			e.preventDefault();
			e.stopPropagation();
			$('BODY>DIV:first').unbind('mouseup.tooltip');
			$tooltip.css({left: '-1000px', top: '-1000px', width: ''});
			$('#tooltip-arrow').css('marginLeft','');
			$('#tooltip-inner').html(locales.simpleloader);
		});
	});
	$.fn.extend({
		tooltip : function () {
            this.each(function () {
                $this = $(this);
                if (!$this.attr("title") && !$this.attr("alt") && $this.attr('href') !== '#' && !$this.attr('data-tooltip') && !$this.data('tooltip')){ return; }
                if(!$this.data('tooltip')){
                    if($this.attr('title') && $this.attr('title') !== ''){
                        $this.data('tooltip',$this.attr('title')).attr('title','');
                    }
                    if($this.attr('alt') && $this.attr('alt') !== ''){
                        $this.data('tooltip',$this.attr('alt')).attr('alt','');
                    }
                }
                $this.attr('tooltip-text', $this.data('tooltip'));
            });
			this.bind('click.tooltip', function(e) {
                if (getMedia() === 'narrow') {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).toggleClass('open');
                }
            });
            this.bind('mouseenter.tooltip click.tooltip', function(e){
				e.preventDefault();
				e.stopPropagation();
				$this = $(this);
				var viewport;

				if ((!$this.attr("title") && !$this.attr("alt") && $this.attr('href') === '#' && !$this.attr('data-tooltip') && !$this.data('tooltip'))){ return; }
                if ($this.outerWidth() > 20 && $this.is('.help01, .help02, .helpico01, .helpico02')) { return; }

				fit = $('BODY').outerWidth() - $this.offset().left - $tooltip.outerWidth();
				if(window.innerWidth){
					viewport = window.innerWidth;
				} else {
					viewport = $(window).width();
				}
				if (!$this.attr("title") && !$this.attr("alt") && $this.attr('href') !== '#' && !$this.attr('data-tooltip') && !$this.data('tooltip')){
					$this.click(function(e){
						e.preventDefault();
						e.stopPropagation();
					});
					$.ajax({
						url: $this.attr('href'),
						success: function(data) {
							$this.data('tooltip',data).trigger('mouseenter.tooltip');
						}
					});
				} else {
					var tooltipcontent;
					if(!$this.data('tooltip')){
						if($this.attr('title') && $this.attr('title') !== ''){
							$this.data('tooltip',$this.attr('title')).attr('title','');
						}
						if($this.attr('alt') && $this.attr('alt') !== ''){
							$this.data('tooltip',$this.attr('alt')).attr('alt','');
						}
					}
					tooltipcontent = $this.data('tooltip');
					$('#tooltip-inner').html(tooltipcontent);
					$tooltip.removeAttr('class');
					if($this.hasClass('showtooltip-right')){
						// try to show tooltip on the right
						if($this.offset().left + $this.outerWidth() + $tooltip.outerWidth() > $('BODY').outerWidth() && $this.offset().left - $tooltip.outerWidth() > 0){
							// can't fit to the right
							$tooltip.attr('class','left side').css({
								left: $this.offset().left - $tooltip.outerWidth() + 'px',
								top: $this.offset().top + 'px'
							});
						} else if($this.offset().left + $this.outerWidth() + $tooltip.outerWidth() > $('BODY').outerWidth() && $this.offset().left - $tooltip.outerWidth() < 0){
							// but can't fit to the left either
							var tmp = $('BODY').outerWidth() - ($this.offset().left + $tooltip.outerWidth()) - 15;
							if(tmp < 15){
								tmp = $this.offset().left + tmp;
							} else {
								tmp = $this.offset().left;
							}
							$tooltip.attr('class','left top').css({
								left: tmp + 'px',
								top: $this.offset().top - $tooltip.outerHeight() + 'px'
							});
							$('#tooltip-arrow').css('marginLeft', $this.offset().left - tmp);
						} else {
							// can fit
							$tooltip.attr('class','right side').css({
								left: $this.offset().left + $this.outerWidth() + 'px',
								top: $this.offset().top + 'px'
							});
						}
					} else if($this.hasClass('showtooltip-left')){
						// try to show tooltip on the left
						if($this.offset().left + $this.outerWidth() + $tooltip.outerWidth() < $('BODY').outerWidth() && $this.offset().left - $tooltip.outerWidth() < 0){
							// but can't fit to the right
							$tooltip.attr('class','right side').css({
								left: $this.offset().left + $this.outerWidth() + 'px',
								top: $this.offset().top + 'px'
							});
						} else if($this.offset().left + $this.outerWidth() + $tooltip.outerWidth() > $('BODY').outerWidth() && $this.offset().left - $tooltip.outerWidth() < 0){
							// but can't fit to the left either
							var tmp = $('BODY').outerWidth() - ($this.offset().left + $tooltip.outerWidth()) - 15;
							if(tmp < 15){
								tmp = $this.offset().left + tmp;
							} else {
								tmp = $this.offset().left;
							}
							$tooltip.attr('class','left top').css({
								left: tmp + 'px',
								top: $this.offset().top - $tooltip.outerHeight() + 'px'
							});
							$('#tooltip-arrow').css('marginLeft', $this.offset().left - tmp);
						} else {
							// can fit
							$tooltip.attr('class','left side').css({
								left: $this.offset().left - $tooltip.outerWidth() + 'px',
								top: $this.offset().top + 'px'
							});
						}
					} else {
						if( ($this.offset().left + $tooltip.outerWidth() - $(document).scrollLeft()) > $('BODY').outerWidth()){
							// does not fit in viewport
							var tmp = $('BODY').outerWidth() - ($this.offset().left + $tooltip.outerWidth()) - 15;
							if(tmp < 15){
								tmp = $this.offset().left + tmp;
							} else {
								tmp = $this.offset().left;
							}
							$tooltip.attr('class','right top').css({
								left: tmp + 'px',
								top: $this.offset().top - $tooltip.outerHeight() + 'px'
							});
							$('#tooltip-arrow').css('marginLeft', $this.offset().left - tmp);
						} else if( fit < 0 ){
							$tooltip.css({
								left: $this.offset().left + fit + 'px',
								top: $this.offset().top - $tooltip.outerHeight() + 'px'
							});
						} else {
							$tooltip.attr('class','left top').css({
								left: $this.offset().left + 'px',
								top: $this.offset().top - $tooltip.outerHeight() + 'px'
							});
						}
					}
				}
				$('BODY>DIV:first').one('mouseleave.tooltip', function (e) {
					$this.trigger('mouseleave.tooltip');
				});
			});
			this.bind('mouseleave.tooltip', function(e){
				$('BODY>DIV:first').unbind('mouseup.tooltip');
				$tooltip.css({left: '-1000px', top: '-1000px', width: ''});
				$('#tooltip-arrow').css('marginLeft','');
				$('#tooltip-inner').html(locales.simpleloader);
			});
		}
	});
})(jQuery);

// #################### TABLE HOVERS RELATED #################### //


 * jQuery tableHover plugin Version: 0.1.4
 * 
 * Copyright (c) 2007 Roman Weich http://p.sohei.org
 * 
 * Dual licensed under the MIT and GPL licenses (This means that you can choose the license that best suits your
 * project, and use it accordingly): http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 
(function(C){var A=function(Q){var S=Q.rows;var K=S.length;var P=[];for(var I=0;I<K;I++){var R=S[I].cells;var O=R.length;for(var H=0;H<O;H++){var N=R[H];var M=N.rowSpan||1;var J=N.colSpan||1;var L=-1;if(!P[I]){P[I]=[]}var E=P[I];while(E[++L]){}N.realIndex=L;for(var G=I;G<I+M;G++){if(!P[G]){P[G]=[]}var D=P[G];for(var F=L;F<L+J;F++){D[F]=1}}}}};var B=function(H){var E=0,F,D,G=(H.tHead)?H.tHead.rows:0;if(G){for(F=0;F<G.length;F++){G[F].realRIndex=E++}}for(D=0;D<H.tBodies.length;D++){G=H.tBodies[D].rows;if(G){for(F=0;F<G.length;F++){G[F].realRIndex=E++}}}G=(H.tFoot)?H.tFoot.rows:0;if(G){for(F=0;F<G.length;F++){G[F].realRIndex=E++}}};C.fn.tableHover=function(D){var E=C.extend({allowHead:true,allowBody:true,allowFoot:true,headRows:false,bodyRows:true,footRows:false,spanRows:true,headCols:false,bodyCols:true,footCols:false,spanCols:true,ignoreCols:[],headCells:false,bodyCells:true,footCells:false,rowClass:"hover",colClass:"",cellClass:"",clickClass:""},D);return this.each(function(){var N=[],M=[],J=this,F,K=0,O=[-1,-1];if(!J.tBodies||!J.tBodies.length){return }var G=function(U,X){var W,V,T,R,Q,S;for(T=0;T<U.length;T++,K++){V=U[T];for(R=0;R<V.cells.length;R++){W=V.cells[R];if((X=="TBODY"&&E.bodyRows)||(X=="TFOOT"&&E.footRows)||(X=="THEAD"&&E.headRows)){S=W.rowSpan;while(--S>=0){M[K+S].push(W)}}if((X=="TBODY"&&E.bodyCols)||(X=="THEAD"&&E.headCols)||(X=="TFOOT"&&E.footCols)){S=W.colSpan;while(--S>=0){Q=W.realIndex+S;if(C.inArray(Q+1,E.ignoreCols)>-1){break}if(!N[Q]){N[Q]=[]}N[Q].push(W)}}if((X=="TBODY"&&E.allowBody)||(X=="THEAD"&&E.allowHead)||(X=="TFOOT"&&E.allowFoot)){W.thover=true}}}};var L=function(R){var Q=R.target;while(Q!=this&&Q.thover!==true){Q=Q.parentNode}if(Q.thover===true){H(Q,true)}};var I=function(R){var Q=R.target;while(Q!=this&&Q.thover!==true){Q=Q.parentNode}if(Q.thover===true){H(Q,false)}};var P=function(T){var R=T.target;while(R&&R!=J&&!R.thover){R=R.parentNode}if(R.thover&&E.clickClass!=""){var Q=R.realIndex,U=R.parentNode.realRIndex,S="";C("td."+E.clickClass+", th."+E.clickClass,J).removeClass(E.clickClass);if(Q!=O[0]||U!=O[1]){if(E.rowClass!=""){S+=",."+E.rowClass}if(E.colClass!=""){S+=",."+E.colClass}if(E.cellClass!=""){S+=",."+E.cellClass}if(S!=""){C("td, th",J).filter(S.substring(1)).addClass(E.clickClass)}O=[Q,U]}else{O=[-1,-1]}}};var H=function(R,T){if(T){C.fn.tableHoverHover=C.fn.addClass}else{C.fn.tableHoverHover=C.fn.removeClass}var V=N[R.realIndex]||[],S=[],U=0,Q,W;if(E.colClass!=""){while(E.spanCols&&++U<R.colSpan&&N[R.realIndex+U]){V=V.concat(N[R.realIndex+U])}C(V).tableHoverHover(E.colClass)}if(E.rowClass!=""){Q=R.parentNode.realRIndex;if(M[Q]){S=S.concat(M[Q])}U=0;while(E.spanRows&&++U<R.rowSpan){if(M[Q+U]){S=S.concat(M[Q+U])}}C(S).tableHoverHover(E.rowClass)}if(E.cellClass!=""){W=R.parentNode.parentNode.nodeName.toUpperCase();if((W=="TBODY"&&E.bodyCells)||(W=="THEAD"&&E.headCells)||(W=="TFOOT"&&E.footCells)){C(R).tableHoverHover(E.cellClass)}}};A(J);B(J);for(F=0;F<J.rows.length;F++){M[F]=[]}if(J.tHead){G(J.tHead.rows,"THEAD")}for(F=0;F<J.tBodies.length;F++){G(J.tBodies[F].rows,"TBODY")}if(J.tFoot){G(J.tFoot.rows,"TFOOT")}C(this).bind("mouseover",L).bind("mouseout",I).click(P)})}})(jQuery);

// #################### URI PARSER RELATED #################### //

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

// #################### RESPONSIVE RELATED #################### //


 * ! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish,
 * Nicholas Zakas. Dual MIT/BSD license
 
 NB modified! 
window.matchMedia = window.matchMedia || (function (doc, undefined) {
	var docElem = doc.documentElement,
		refNode = docElem.firstElementChild || docElem.firstChild,
		// fakeBody required for <FF4 when executed in <head>
		fakeBody = doc.createElement('body'),
		div = doc.createElement('div');
	div.id = 'mq-test-1';
	div.style.cssText = "position:absolute;top:-100em";
	fakeBody.style.background = "none";
	fakeBody.appendChild(div);
	var mqRun = function (mq) {
		div.innerHTML = '&shy;<style media="' + mq + '"> #mq-test-1 { width: 42px; }</style>';
		docElem.insertBefore(fakeBody, refNode);
		bool = div.offsetWidth === 42;
		docElem.removeChild(fakeBody);
		return {
			matches: bool,
			media: mq
		};
	},
	getEmValue = function () {
		var ret,
		body = docElem.body,
			fakeUsed = false;
		div.style.cssText = "position:absolute;font-size:1em;width:1em";
		if (!body) {
			body = fakeUsed = doc.createElement("body");
			body.style.background = "none";
		}
		body.appendChild(div);
		docElem.insertBefore(body, docElem.firstChild);
		if (fakeUsed) {
			docElem.removeChild(body);
		} else {
			body.removeChild(div);
		}
		// also update eminpx before returning
		ret = eminpx = parseFloat(div.offsetWidth);
		return ret;
	},
	// cached container for 1em value, populated the first time it's needed
	eminpx,
	// verify that we have support for a simple media query
	mqSupport = mqRun('(min-width: 0px)').matches;
	return function (mq) {
		if (mqSupport) {
			return mqRun(mq);
		} else {
			var min = mq.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
				max = mq.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
				minnull = min === null,
				maxnull = max === null,
				currWidth = $('BODY').outerWidth(),
				em = 'em';

			if ( !! min) {
				min = parseFloat(min) * (min.indexOf(em) > -1 ? (eminpx || getEmValue()) : 1);
			}
			if ( !! max) {
				max = parseFloat(max) * (max.indexOf(em) > -1 ? (eminpx || getEmValue()) : 1);
			}
			bool = (!minnull || !maxnull) && (minnull || currWidth >= min) && (maxnull || currWidth <= max);
			return {
				matches: bool,
				media: mq
			};
		}
	};
}(document));

 ! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs 
 NB! Modified 
(function( win ){

	"use strict";

	// exposed namespace
	var respond = {};
	win.respond = respond;

	// define update even in native-mq-supporting browsers, to avoid errors
	respond.update = function(){};

	// expose media query support flag for external use
	try {
		respond.mediaQueriesSupported = win.matchMedia && win.parent.matchMedia("only all").matches;
	} catch(e){
		respond.mediaQueriesSupported = false;
	}

	// if media queries are supported, exit here
	if( respond.mediaQueriesSupported || $.cookie('responsive') === 'desktop' || parseUri(document.location.href).queryKey.responsive === "false" || window.self !== window.top){
		return;
	}

	// define vars
	var doc = win.document,
		docElem = doc.documentElement,
		mediastyles = [],
		rules = [],
		appendedEls = [],
		parsedSheets = {},
		resizeThrottle = 30,
		head = doc.getElementsByTagName( "head" )[0] || docElem,
		base = doc.getElementsByTagName( "base" )[0],
		links = head.getElementsByTagName( "link" ),
		requestQueue = [],

		// loop stylesheets, send text content to translate
		ripCSS = function(){

			for( var i = 0; i < links.length; i++ ){
				var sheet = links[ i ],
				href = sheet.href,
				media = sheet.media,
				isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

				// only links plz and prevent re-parsing
				if( !!href && isCSS && !parsedSheets[ href ] ){
					// selectivizr exposes css through the rawCssText expando
					if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
						translate( sheet.styleSheet.rawCssText, href, media );
						parsedSheets[ href ] = true;
					} else {
						if( (!/^([a-zA-Z:]*\/\/)/.test( href ) && !base) ||
							href.replace( RegExp.$1, "" ).split( "/" )[0] === win.location.host ){
							requestQueue.push( {
								href: href,
								media: media
							} );
						}
					}
				}
			}
			makeRequests();
		},

		// recurse through request queue, get css text
		makeRequests	= function(){
			if( requestQueue.length ){
				var thisRequest = requestQueue.shift();

				ajax( thisRequest.href, function( styles ){
					translate( styles, thisRequest.href, thisRequest.media );
					parsedSheets[ thisRequest.href ] = true;

					// by wrapping recursive function call in setTimeout
					// we prevent "Stack overflow" error in IE7
					setTimeout(function(){ makeRequests(); },0);
				} );
			}
		},

		// find media blocks in css text, convert to style blocks
		translate = function( styles, href, media ){
			var qs = styles.match(  /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi ),
				ql = qs && qs.length || 0;

			// try to get CSS path
			href = href.substring( 0, href.lastIndexOf( "/" ) );

			var repUrls	= function( css ){
					return css.replace( /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + href + "$2$3" );
				},
				useMedia = !ql && media;

			// if path exists, tack on trailing slash
			if( href.length ){ href += "/"; }

			// if no internal queries exist, but media attr does, use that
			// note: this currently lacks support for situations where a media attr is specified on a link
			// AND
				// its associated stylesheet has internal CSS media queries.
				// In those cases, the media attribute will currently be ignored.
			if( useMedia ){
				ql = 1;
			}

			for( var i = 0; i < ql; i++ ){
				var fullq, thisq, eachq, eql;

				// media attr
				if( useMedia ){
					fullq = media;
					rules.push( repUrls( styles ) );
				}
				// parse for styles
				else{
					fullq = qs[ i ].match( /@media *([^\{]+)\{([\S\s]+?)$/ ) && RegExp.$1;
					rules.push( RegExp.$2 && repUrls( RegExp.$2 ) );
				}

				eachq = fullq.split( "," );
				eql	= eachq.length;

				for( var j = 0; j < eql; j++ ){
					thisq = eachq[ j ];
					mediastyles.push( {
						media : thisq.split( "(" )[ 0 ].match( /(only\s+)?([a-zA-Z]+)\s?/ ) && RegExp.$2 || "all",
						rules : rules.length - 1,
						hasquery : thisq.indexOf("(") > -1,
						minw : thisq.match( /\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/ ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
						maxw : thisq.match( /\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/ ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" )
					} );
				}
			}

			applyMedia();
		},

		lastCall,

		resizeDefer,

		// returns the value of 1em in pixels
		getEmValue = function() {
			var ret,
				div = doc.createElement('div'),
				body = doc.body,
				fakeUsed = false;

			div.style.cssText = "position:absolute;font-size:1em;width:1em";

			if( !body ){
				body = fakeUsed = doc.createElement( "body" );
				body.style.background = "none";
			}

			body.appendChild( div );

			docElem.insertBefore( body, docElem.firstChild );

			ret = div.offsetWidth;

			if( fakeUsed ){
				docElem.removeChild( body );
			}
			else {
				body.removeChild( div );
			}

			// also update eminpx before returning
			ret = eminpx = parseFloat(ret);

			return ret;
		},

		// cached container for 1em value, populated the first time it's needed
		eminpx,

		// enable/disable styles
		applyMedia = function( fromResize ){
			var name = "clientWidth",
				docElemProp = docElem[ name ],
				currWidth = (doc.compatMode === "CSS1Compat" && docElemProp) || doc.body[ name ] || docElemProp,
				styleBlocks	= {},
				lastLink = links[ links.length-1 ],
				now = (new Date()).getTime();

			// throttle resize calls
			if( fromResize && lastCall && now - lastCall < resizeThrottle ){
				clearTimeout( resizeDefer );
				resizeDefer = setTimeout( applyMedia, resizeThrottle );
				return;
			}
			else {
				lastCall = now;
			}

			for( var i in mediastyles ){
				if( mediastyles.hasOwnProperty( i ) ){
					var thisstyle = mediastyles[ i ],
						min = thisstyle.minw,
						max = thisstyle.maxw,
						minnull = min === null,
						maxnull = max === null,
						em = "em";

					if( !!min ){
						min = parseFloat( min ) * ( min.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}
					if( !!max ){
						max = parseFloat( max ) * ( max.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}

					// if there's no media query at all (the () part), or min or max is not null,
					// and if either is present, they're true
					if( !thisstyle.hasquery || ( !minnull || !maxnull ) && ( minnull || currWidth >= min ) && ( maxnull || currWidth <= max ) ){
						if( !styleBlocks[ thisstyle.media ] ){
							styleBlocks[ thisstyle.media ] = [];
						}
						styleBlocks[ thisstyle.media ].push( rules[ thisstyle.rules ] );
					}
				}
			}

			// remove any existing respond style element(s)
			for( var j in appendedEls ){
				if( appendedEls.hasOwnProperty( j ) ){
					if( appendedEls[ j ] && appendedEls[ j ].parentNode === head ){
						head.removeChild( appendedEls[ j ] );
					}
				}
			}

			// inject active styles, grouped by media type
			for( var k in styleBlocks ){
				if( styleBlocks.hasOwnProperty( k ) ){
					var ss = doc.createElement( "style" ),
						css = styleBlocks[ k ].join( "\n" );

					ss.type = "text/css";
					ss.media = k;

					// originally, ss was appended to a documentFragment and sheets were appended in
					// bulk.
					// this caused crashes in IE in a number of circumstances, such as when the HTML
					// element had a bg image set, so appending beforehand seems best. Thanks to
					// @dvelyk for the initial research on this one!
					head.insertBefore( ss, lastLink.nextSibling );

					if ( ss.styleSheet ){
						ss.styleSheet.cssText = css;
					}
					else {
						ss.appendChild( doc.createTextNode( css ) );
					}

					// push to appendedEls to track for later removal
					appendedEls.push( ss );
				}
			}
		},
		// tweaked Ajax functions from Quirksmode
		ajax = function( url, callback ) {
			var req = xmlHttp();
			if (!req){
				return;
			}
			req.open( "GET", url, true );
			req.onreadystatechange = function () {
				if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
					return;
				}
				callback( req.responseText );
			};
			if ( req.readyState === 4 ){
				return;
			}
			req.send( null );
		},
		// define ajax obj
		xmlHttp = (function() {
			var xmlhttpmethod = false;
			try {
				xmlhttpmethod = new win.XMLHttpRequest();
			}
			catch( e ){
				xmlhttpmethod = new win.ActiveXObject( "Microsoft.XMLHTTP" );
			}
			return function(){
				return xmlhttpmethod;
			};
		})();

	// translate CSS
	ripCSS();

	// expose update for re-running respond later on
	respond.update = ripCSS;

	// adjust on resize
	function callMedia(){
		applyMedia( true );
		$(document).trigger('respondUpdate', 'call media');
	}
	if( win.addEventListener ){
		win.addEventListener( "resize", callMedia, false );
	}
	else if( win.attachEvent ){
		win.attachEvent( "onresize", callMedia );
	}
})(this);

// #################### HIGHCHART AND HIGHSTOCK RELATED #################### //

highchartoptions = {
    title: { text: '' },
    subtitle: { text: '' },
	chart: {
		backgroundColor: null,
		borderWidth: 1,
        borderColor: '#e6e6e6',
		plotBorderColor: '#e6e6e6',
        plotBackgroundColor: '#ffffff',
		plotBorderWidth: 1,
		shadow: false,
        plotShadow: false,
		borderRadius: '0',
		style: {
			fontFamily: '"SEB Basic Web", "Arial Narrow", "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif',
			fontSize: '11px'
		},
        events: {
            load: function () {
                $(window).trigger('resize');
            }
        },
        spacingTop: 10,
        spacingBottom: 10,
        spacingLeft: 10,
        spacingRight: 10
	},
	// colors: ['#60cd18', '#b6e498', '#99dcea', '#0092aa', '#b16694', '#943263', '#6fa4af', '#1c7080'],
	colors: [
		'#005f71', // petrol - eluase
        '#8a1b60', // purple - söök&jook
        '#60cd18', // neoonroheline - säästmine
        '#b16694', // purple 66 - laste kulud
        '#a07ea3', // wisteria - riietus
        '#bfa8c1', // wisteria 66 - isiklikud kulud
        '#54b6c0',  // capri 66 - transport
        '#0092aa',  // capri - side
        '#1c7080', // petrol 66 - majapidamine
        '#808080',  // tumehall - muud
        '#dfd3e0', // wisteria 33 - vaba aeg
        '#cfeff5',  // capri 33 - finants
        '#378710',  // tumeroheline - haridus
        '#e6f4dc',  // heleroheline - tervis
        '#F3F3F3'  // helehall - unsorted
         ],
	tooltip: {
        enabled: true,
        headerFormat: '<b>{point.key}</b><br/>',
		backgroundColor: '#fcffe6',
		borderColor: "#cccccc",
		borderWidth: 1,
		borderRadius: 3,
		shadow: true,
		style: {
			padding: "7px",
			paddingLeft: '10px',
			paddingRight: '10px',
			paddingTop: '6px',
			paddingBottom: '0',
			width: 'auto',
			fontSize: '13px',
			lineHeight: '16px'
		}
	},
	xAxis: {
        lineWidth: 0,
        gridLineWidth: 1,
        gridLineColor: 'rgba(0,0,0,0.1)',
        minorGridLineWidth: 1,
        minorGridLineColor: 'rgba(0,0,0,0.1)',
        tickLength: 0,
        minorTickLength: 0,
        tickInterval: null,
        minorTickInterval: null,
        showFirstLabel: false,
        showLastLabel: false,
        labels: {
			style: {
				color: '#999999',
				fontSize: '11px'
			},
            staggerLines: 1,
            step: 2
		},
        title: {
            text: '',
            style: {
                fontSize: 12,
                color: '#000000'
            }
        }
	},
	yAxis: {
        gridLineWidth: 1,
        gridLineColor: 'rgba(0,0,0,0.1)',
        minorGridLineWidth: 1,
        minorGridLineColor: 'rgba(0,0,0,0.1)',
        tickLength: 0,
        minorTickLength: 0,
        tickInterval: null,
        tickPixelInterval: '30',
        minorTickInterval: null,
        showFirstLabel: true,
        showLastLabel: false,
        offset: 0,
        labels: {
            align: 'right',
			style: {
				color: '#999999',
				fontSize: '11px'
			},
            staggerLines: 1,
            step: 2,
            x: -10,
            y: -2
		},
        title: {
            text: '',
            style: {
                fontSize: 12,
                color: '#000000'
            }
        }
	},

	legend: {
        enabled: false,
		borderWidth: 0,
		borderRadius: 0,
		itemHoverStyle: {
			color: '#333333'
		},
		symbolWidth: 10,
        symbolHeight: 10,
		symbolPadding: 10,
        itemMarginTop: 3,
        useHTML: false,
        margin: 10,
        padding: 0,
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        labelFormatter: function() {
            var words = this.name.split(/[\s]+/);
            var numWordsPerLine = 4;
            var str = [];

            for (var word in words) {
                if (word > 0 && word % numWordsPerLine == 0)
                    str.push('<br>');

                 str.push(words[word]);
            }

            return str.join(' ');
        }
	},
	navigator: {
        enabled: false,
		outlineColor: '#aaaaaa',
		outlineWidth: 1,
		maskFill: 'rgba(255,255,255,0.5)',
		series: {
			type: 'areaspline',
			color: '#000000',
			fillOpacity: 0.01,
			lineWidth: 1.5,
			lineColor: 'rgba(0,0,0,0.3)',
			shadow: false
		},
		margin: 10
	},
	plotOptions: {
        series: {
            shadow: false,
			animation: false,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true,
                        radius: 4
                    }
                }
            }
        },
        column: {
            borderWidth: 0,
            pointPadding: 0.09,
            groupPadding: 0.25
        },
		area: {
            lineWidth: 1,
			fillOpacity: 0.33
		},
		line: {
            lineWidth: 1.5
        },
		gauge: {
			dataLabels: { enabled: false },
			dial: {
				baseLength: '10%',
				baseWidth: '14',
				rearLength: '0%',
				radius: '90%',
				borderWidth: '1',
				borderColor: '#fff'
			},
			pivot: { radius: '6' }
		},
		pie: {
            borderWidth: 0,
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: false
			},
			showInLegend: true
		}
	},
	credits: { enabled: false },
	scrollbar: {
		barBorderRadius: 7,
		barBorderWidth: 1,
		barBorderColor: '#aaaaaa',
		buttonBorderWidth: 1,
		buttonBorderColor: '#aaaaaa',
		buttonBorderRadius: 7,
		trackBorderWidth: 1,
		trackBorderRadius: 8,
		trackBorderColor: '#dddddd'
	},
	rangeSelector: {
        enabled: false,
		inputDateFormat: '%Y/%m/%d',
		inputEditDateFormat: '%Y/%m/%d',
        buttonSpacing: 3,
		buttonTheme: {
			fill: '#e6e6e6',
			stroke: '#fff',
            'stroke-width': 0,
            'height': 20,
            'padding': 1,
            r: 10,
             width: null, 
			style: { color: '#000000', fontFamily: '"SEB Basic Web", "Arial Narrow", "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif', fontSize: '14px' },
			states: {
				hover: { fill: '#008296', stroke: '#ffffff', style: { color: 'white' }  },
				select: { fill: '#666666', stroke: '#ffffff', style: { color: 'white' } }
			}
		},
        
	 * debug buttons: [ { type: 'month', count: 1, text: '\u20021m\u2002' }, { type: 'month', count: 3, text:
	 * '\u20023m\u2002' }, { type: 'month', count: 6, text: '\u20026m\u2002' }, { type: 'ytd', text:
	 * '\u2002YTD\u2002' }, { type: 'year', count: 1, text: '\u20021y\u2002' }, { type: 'all', text: '\u2002All
	 * data\u2002' } ],
	 
		inputPosition: { x: -100, y: -100 },
        inputBoxBorderColor: 'gray',
        inputBoxWidth: 124,
        inputBoxHeight: "ontouchstart" in window ? 36 : 28,
		inputStyle: { color: '#000000', fontFamily: '"SEB Basic Web", "Arial Narrow", "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif', fontSize: '14px', textAlign: 'left' },
		labelStyle: { color: '#000000', fontFamily: '"SEB Basic Web", "Arial Narrow", "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif', fontSize: '14px', textAlign: 'left' },
		selected: 1
	}
};

if(window.Highcharts){
    Highcharts.setOptions(highchartoptions);
}
function fixHighchartsTouch(){
    Highcharts.Chart.prototype.callbacks.push(function(chart) {
      var hasTouch = document.documentElement.ontouchstart !== undefined,
          mouseTracker = chart.pointer,
          container = chart.container,
          mouseMove;

      mouseMove = function (e) {

        // let the system handle multitouch operations like two finger scroll
        // and pinching
        if (e && e.touches && e.touches.length > 1) {
          return;
        }

        if (hasTouch) {
            if (e && e.touches && e.touches.length > 1) {
                mouseTracker.onContainerTouchMove(e);
            } else {
                return;
            }
        } else {
          mouseTracker.onContainerMouseMove(e);
        }
      };

      click = function (e) {
        if (hasTouch) {
            mouseTracker.onContainerMouseMove(e);
        }
        mouseTracker.onContainerClick(e);
      }

      container.onmousemove = container.ontouchstart = container.ontouchmove = mouseMove;
      container.onclick = click;
    });
    if (window.Highcharts.StockChart) {
        var orgHighchartsRangeSelectorPrototypeRender = Highcharts.RangeSelector.prototype.render;
        Highcharts.RangeSelector.prototype.render = function (min, max) {
            orgHighchartsRangeSelectorPrototypeRender.apply(this, [min, max]);
            var leftPosition = 20,
                topPosition = this.chart.plotTop - 38,
                space = 2;
            this.zoomText.attr({
                x: 10,
                y: topPosition + 15
            });
            leftPosition += this.zoomText.getBBox().width;
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].attr({
                    x: leftPosition,
                    y: topPosition
                });
                leftPosition += this.buttons[i].width + space;
            }
        };
    }
 }

// #################### DUMMY DATA GENERATION #################### //

function generateDummyData(amount) {
	"use strict";
	var d = [1 + Math.round((Math.round(Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * 100) / 100) * 10000) / 10000],
		i,
		tmp;
	for (i = 0; i < amount; i = i + 1) {
		tmp = Math.round((d[d.length - 1] + Math.round(Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1)) / 10000) * 10000) / 10000;
		d.push(tmp);
	}
	return d;
}
function generateDummyData2(amount, amplitude, baseline){
	var d = [baseline]
	for (var i=0; i < amount; i++){
		rnd = Math.round(Math.random() * 1000) / 1000; // generate number, 0 <= x < 1.0
		change_percent = 2 * amplitude * rnd;
		if (change_percent > amplitude) {
			change_percent -= (2 * amplitude);
        }
		change_amount = d[d.length-1] * change_percent + ((rnd / 10) * amplitude);
		d.push(Math.round((d[d.length-1] + change_amount) * 10000) / 10000);
	}
	return d;
}

// #################### REQUIRE.JS #################### //


 * RequireJS 2.1.4 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved. Available via the MIT or new BSD
 * license. see: http://github.com/jrburke/requirejs for details
 
var requirejs,require,define;
(function(Y){function I(b){return"[object Function]"===L.call(b)}function J(b){return"[object Array]"===L.call(b)}function x(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function M(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function r(b,c){return da.call(b,c)}function i(b,c){return r(b,c)&&b[c]}function E(b,c){for(var d in b)if(r(b,d)&&c(b[d],d))break}function Q(b,c,d,i){c&&E(c,function(c,h){if(d||!r(b,h))i&&"string"!==typeof c?(b[h]||(b[h]={}),Q(b[h],
	c,d,i)):b[h]=c});return b}function t(b,c){return function(){return c.apply(b,arguments)}}function Z(b){if(!b)return b;var c=Y;x(b.split("."),function(b){c=c[b]});return c}function F(b,c,d,i){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=i;d&&(c.originalError=d);return c}function ea(b){function c(a,f,v){var e,n,b,c,d,k,g,h=f&&f.split("/");e=h;var l=m.map,j=l&&l["*"];if(a&&"."===a.charAt(0))if(f){e=i(m.pkgs,f)?h=[f]:h.slice(0,h.length-1);f=a=e.concat(a.split("/"));
	for(e=0;f[e];e+=1)if(n=f[e],"."===n)f.splice(e,1),e-=1;else if(".."===n)if(1===e&&(".."===f[2]||".."===f[0]))break;else 0<e&&(f.splice(e-1,2),e-=2);e=i(m.pkgs,f=a[0]);a=a.join("/");e&&a===f+"/"+e.main&&(a=f)}else 0===a.indexOf("./")&&(a=a.substring(2));if(v&&(h||j)&&l){f=a.split("/");for(e=f.length;0<e;e-=1){b=f.slice(0,e).join("/");if(h)for(n=h.length;0<n;n-=1)if(v=i(l,h.slice(0,n).join("/")))if(v=i(v,b)){c=v;d=e;break}if(c)break;!k&&(j&&i(j,b))&&(k=i(j,b),g=e)}!c&&k&&(c=k,d=g);c&&(f.splice(0,d,
	c),a=f.join("/"))}return a}function d(a){z&&x(document.getElementsByTagName("script"),function(f){if(f.getAttribute("data-requiremodule")===a&&f.getAttribute("data-requirecontext")===k.contextName)return f.parentNode.removeChild(f),!0})}function y(a){var f=i(m.paths,a);if(f&&J(f)&&1<f.length)return d(a),f.shift(),k.require.undef(a),k.require([a]),!0}function g(a){var f,b=a?a.indexOf("!"):-1;-1<b&&(f=a.substring(0,b),a=a.substring(b+1,a.length));return[f,a]}function h(a,f,b,e){var n,u,d=null,h=f?f.name:
	null,l=a,m=!0,j="";a||(m=!1,a="_@r"+(L+=1));a=g(a);d=a[0];a=a[1];d&&(d=c(d,h,e),u=i(p,d));a&&(d?j=u&&u.normalize?u.normalize(a,function(a){return c(a,h,e)}):c(a,h,e):(j=c(a,h,e),a=g(j),d=a[0],j=a[1],b=!0,n=k.nameToUrl(j)));b=d&&!u&&!b?"_unnormalized"+(M+=1):"";return{prefix:d,name:j,parentMap:f,unnormalized:!!b,url:n,originalName:l,isDefine:m,id:(d?d+"!"+j:j)+b}}function q(a){var f=a.id,b=i(j,f);b||(b=j[f]=new k.Module(a));return b}function s(a,f,b){var e=a.id,n=i(j,e);if(r(p,e)&&(!n||n.defineEmitComplete))"defined"===
	f&&b(p[e]);else q(a).on(f,b)}function A(a,f){var b=a.requireModules,e=!1;if(f)f(a);else if(x(b,function(f){if(f=i(j,f))f.error=a,f.events.error&&(e=!0,f.emit("error",a))}),!e)l.onError(a)}function w(){R.length&&(fa.apply(G,[G.length-1,0].concat(R)),R=[])}function B(a,f,b){var e=a.map.id;a.error?a.emit("error",a.error):(f[e]=!0,x(a.depMaps,function(e,c){var d=e.id,h=i(j,d);h&&(!a.depMatched[c]&&!b[d])&&(i(f,d)?(a.defineDep(c,p[d]),a.check()):B(h,f,b))}),b[e]=!0)}function C(){var a,f,b,e,n=(b=1E3*m.waitSeconds)&&
	k.startTime+b<(new Date).getTime(),c=[],h=[],g=!1,l=!0;if(!T){T=!0;E(j,function(b){a=b.map;f=a.id;if(b.enabled&&(a.isDefine||h.push(b),!b.error))if(!b.inited&&n)y(f)?g=e=!0:(c.push(f),d(f));else if(!b.inited&&(b.fetched&&a.isDefine)&&(g=!0,!a.prefix))return l=!1});if(n&&c.length)return b=F("timeout","Load timeout for modules: "+c,null,c),b.contextName=k.contextName,A(b);l&&x(h,function(a){B(a,{},{})});if((!n||e)&&g)if((z||$)&&!U)U=setTimeout(function(){U=0;C()},50);T=!1}}function D(a){r(p,a[0])||
q(h(a[0],null,!0)).init(a[1],a[2])}function H(a){var a=a.currentTarget||a.srcElement,b=k.onScriptLoad;a.detachEvent&&!V?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=k.onScriptError;(!a.detachEvent||V)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function K(){var a;for(w();G.length;){a=G.shift();if(null===a[0])return A(F("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));D(a)}}var T,W,k,N,U,m={waitSeconds:7,
	baseUrl:"./",paths:{},pkgs:{},shim:{},map:{},config:{}},j={},X={},G=[],p={},S={},L=1,M=1;N={require:function(a){return a.require?a.require:a.require=k.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?a.exports:a.exports=p[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return m.config&&i(m.config,a.map.id)||{}},exports:p[a.map.id]}}};W=function(a){this.events=i(X,a.id)||{};this.map=a;this.shim=
	i(m.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};W.prototype={init:function(a,b,c,e){e=e||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=t(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;this.ignore=e.ignore;e.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=
	b)},fetch:function(){if(!this.fetched){this.fetched=!0;k.startTime=(new Date).getTime();var a=this.map;if(this.shim)k.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],t(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;S[a]||(S[a]=!0,k.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var e=this.exports,n=this.factory;
	if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(I(n)){if(this.events.error)try{e=k.execCb(c,n,b,e)}catch(d){a=d}else e=k.execCb(c,n,b,e);this.map.isDefine&&((b=this.module)&&void 0!==b.exports&&b.exports!==this.exports?e=b.exports:void 0===e&&this.usingExports&&(e=this.exports));if(a)return a.requireMap=this.map,a.requireModules=[this.map.id],a.requireType="define",A(this.error=a)}else e=n;this.exports=e;if(this.map.isDefine&&
		!this.ignore&&(p[c]=e,l.onResourceLoad))l.onResourceLoad(k,this.map,this.depMaps);delete j[c];this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=h(a.prefix);this.depMaps.push(d);s(d,"defined",t(this,function(e){var n,d;d=this.map.name;var v=this.map.parentMap?this.map.parentMap.name:null,g=k.makeRequire(a.parentMap,{enableBuildCallback:!0});
	if(this.map.unnormalized){if(e.normalize&&(d=e.normalize(d,function(a){return c(a,v,!0)})||""),e=h(a.prefix+"!"+d,this.map.parentMap),s(e,"defined",t(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),d=i(j,e.id)){this.depMaps.push(e);if(this.events.error)d.on("error",t(this,function(a){this.emit("error",a)}));d.enable()}}else n=t(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),n.error=t(this,function(a){this.inited=!0;this.error=a;a.requireModules=
		[b];E(j,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&delete j[a.map.id]});A(a)}),n.fromText=t(this,function(e,c){var d=a.name,u=h(d),v=O;c&&(e=c);v&&(O=!1);q(u);r(m.config,b)&&(m.config[d]=m.config[b]);try{l.exec(e)}catch(j){return A(F("fromtexteval","fromText eval for "+b+" failed: "+j,j,[b]))}v&&(O=!0);this.depMaps.push(u);k.completeLoad(d);g([d],n)}),e.load(a.name,g,n,m)}));k.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){this.enabling=this.enabled=!0;x(this.depMaps,t(this,function(a,
																																																																																																																																	 b){var c,e;if("string"===typeof a){a=h(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=i(N,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;s(a,"defined",t(this,function(a){this.defineDep(b,a);this.check()}));this.errback&&s(a,"error",this.errback)}c=a.id;e=j[c];!r(N,c)&&(e&&!e.enabled)&&k.enable(a,this)}));E(this.pluginMaps,t(this,function(a){var b=i(j,a.id);b&&!b.enabled&&k.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=
	this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){x(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};k={config:m,contextName:b,registry:j,defined:p,urlFetched:S,defQueue:G,Module:W,makeModuleMap:h,nextTick:l.nextTick,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=m.pkgs,c=m.shim,e={paths:!0,config:!0,map:!0};E(a,function(a,b){e[b]?"map"===b?Q(m[b],a,!0,!0):Q(m[b],a,!0):m[b]=a});a.shim&&(E(a.shim,function(a,
																																																																																																																														   b){J(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=k.makeShimExports(a);c[b]=a}),m.shim=c);a.packages&&(x(a.packages,function(a){a="string"===typeof a?{name:a}:a;b[a.name]={name:a.name,location:a.location||a.name,main:(a.main||"main").replace(ga,"").replace(aa,"")}}),m.pkgs=b);E(j,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=h(b))});if(a.deps||a.callback)k.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(Y,arguments));
	return b||a.exports&&Z(a.exports)}},makeRequire:function(a,d){function g(e,c,u){var i,m;d.enableBuildCallback&&(c&&I(c))&&(c.__requireJsBuild=!0);if("string"===typeof e){if(I(c))return A(F("requireargs","Invalid require call"),u);if(a&&r(N,e))return N[e](j[a.id]);if(l.get)return l.get(k,e,a);i=h(e,a,!1,!0);i=i.id;return!r(p,i)?A(F("notloaded",'Module name "'+i+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):p[i]}K();k.nextTick(function(){K();m=q(h(null,a));m.skipMap=d.skipMap;
	m.init(e,c,u,{enabled:!0});C()});return g}d=d||{};Q(g,{isBrowser:z,toUrl:function(b){var d,f=b.lastIndexOf("."),h=b.split("/")[0];if(-1!==f&&(!("."===h||".."===h)||1<f))d=b.substring(f,b.length),b=b.substring(0,f);b=k.nameToUrl(c(b,a&&a.id,!0),d||".fake");return d?b:b.substring(0,b.length-5)},defined:function(b){return r(p,h(b,a,!1,!0).id)},specified:function(b){b=h(b,a,!1,!0).id;return r(p,b)||r(j,b)}});a||(g.undef=function(b){w();var c=h(b,a,!0),d=i(j,b);delete p[b];delete S[c.url];delete X[b];
	d&&(d.events.defined&&(X[b]=d.events),delete j[b])});return g},enable:function(a){i(j,a.id)&&q(a).enable()},completeLoad:function(a){var b,c,d=i(m.shim,a)||{},h=d.exports;for(w();G.length;){c=G.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);D(c)}c=i(j,a);if(!b&&!r(p,a)&&c&&!c.inited){if(m.enforceDefine&&(!h||!Z(h)))return y(a)?void 0:A(F("nodefine","No define call for "+a,null,[a]));D([a,d.deps||[],d.exportsFn])}C()},nameToUrl:function(a,b){var c,d,h,g,k,j;if(l.jsExtRegExp.test(a))g=
	a+(b||"");else{c=m.paths;d=m.pkgs;g=a.split("/");for(k=g.length;0<k;k-=1)if(j=g.slice(0,k).join("/"),h=i(d,j),j=i(c,j)){J(j)&&(j=j[0]);g.splice(0,k,j);break}else if(h){c=a===h.name?h.location+"/"+h.main:h.location;g.splice(0,k,c);break}g=g.join("/");g+=b||(/\?/.test(g)?"":".js");g=("/"===g.charAt(0)||g.match(/^[\w\+\.\-]+:/)?"":m.baseUrl)+g}return m.urlArgs?g+((-1===g.indexOf("?")?"?":"&")+m.urlArgs):g},load:function(a,b){l.load(k,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===
	a.type||ha.test((a.currentTarget||a.srcElement).readyState))P=null,a=H(a),k.completeLoad(a.id)},onScriptError:function(a){var b=H(a);if(!y(b.id))return A(F("scripterror","Script error",a,[b.id]))}};k.require=k.makeRequire();return k}var l,w,B,D,s,H,P,K,ba,ca,ia=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ja=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,aa=/\.js$/,ga=/^\.\//;w=Object.prototype;var L=w.toString,da=w.hasOwnProperty,fa=Array.prototype.splice,z=!!("undefined"!==typeof window&&navigator&&
	document),$=!z&&"undefined"!==typeof importScripts,ha=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,V="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),C={},q={},R=[],O=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(I(requirejs))return;q=requirejs;requirejs=void 0}"undefined"!==typeof require&&!I(require)&&(q=require,require=void 0);l=requirejs=function(b,c,d,y){var g,h="_";!J(b)&&"string"!==typeof b&&(g=b,J(c)?(b=c,c=d,d=y):b=[]);
	g&&g.context&&(h=g.context);(y=i(C,h))||(y=C[h]=l.s.newContext(h));g&&y.configure(g);return y.require(b,c,d)};l.config=function(b){return l(b)};l.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=l);l.version="2.1.4";l.jsExtRegExp=/^\/|:|\?|\.js$/;l.isBrowser=z;w=l.s={contexts:C,newContext:ea};l({});x(["toUrl","undef","defined","specified"],function(b){l[b]=function(){var c=C._;return c.require[b].apply(c,arguments)}});if(z&&(B=w.head=document.getElementsByTagName("head")[0],
	D=document.getElementsByTagName("base")[0]))B=w.head=D.parentNode;l.onError=function(b){throw b;};l.load=function(b,c,d){var i=b&&b.config||{},g;if(z)return g=i.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),g.type=i.scriptType||"text/javascript",g.charset="utf-8",g.async=!0,g.setAttribute("data-requirecontext",b.contextName),g.setAttribute("data-requiremodule",c),g.attachEvent&&!(g.attachEvent.toString&&0>g.attachEvent.toString().indexOf("[native code"))&&
	!V?(O=!0,g.attachEvent("onreadystatechange",b.onScriptLoad)):(g.addEventListener("load",b.onScriptLoad,!1),g.addEventListener("error",b.onScriptError,!1)),g.src=d,K=g,D?B.insertBefore(g,D):B.appendChild(g),K=null,g;$&&(importScripts(d),b.completeLoad(c))};z&&M(document.getElementsByTagName("script"),function(b){B||(B=b.parentNode);if(s=b.getAttribute("data-main"))return q.baseUrl||(H=s.split("/"),ba=H.pop(),ca=H.length?H.join("/")+"/":"./",q.baseUrl=ca,s=ba),s=s.replace(aa,""),q.deps=q.deps?q.deps.concat(s):
	[s],!0});define=function(b,c,d){var i,g;"string"!==typeof b&&(d=c,c=b,b=null);J(c)||(d=c,c=[]);!c.length&&I(d)&&d.length&&(d.toString().replace(ia,"").replace(ja,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c));if(O){if(!(i=K))P&&"interactive"===P.readyState||M(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return P=b}),i=P;i&&(b||(b=i.getAttribute("data-requiremodule")),g=C[i.getAttribute("data-requirecontext")])}(g?
	g.defQueue:R).push([b,c,d])};define.amd={jQuery:!0};l.exec=function(b){return eval(b)};l(q)}})(this);

requirejs.config({
	baseUrl: '/blf/resources/cache/js/',
	paths: {
        'jquery.ui': 'jquery.ui',
        'jquery.ui.widget': 'jquery.ui.widget',
        'jquery.column': 'jquery.column',
        'jquery.fileupload': 'upload/jquery.fileupload',
        'jquery.iframe-transport': 'upload/jquery.iframe-transport',
        'jquery.fileupload-process': 'upload/jquery.fileupload-process',
        'jquery.fileupload-validate': 'upload/jquery.fileupload-validate',
		'highcharts': 'highcharts/highcharts',
		'highcharts.more': 'highcharts/highcharts-more',
		'history': 'jquery.history',
		'highstock': 'highcharts/highstock',
		'swfobject': 'swfobject/swfobject',
		'sparkline': 'jquery.sparkline',
		'swipe': 'jquery.touchSwipe.min'
	},
	priority: [
		"jquery",
        "jquery.ui",
        "jquery.ui.widget",
        "jquery.column",
		"highcharts",
		"highcharts.more",
		"highstock",
		"history",
		"swfobject",
		"sparkline",
        "footable",
		"swipe",
        'jquery.iframe-transport',
        'jquery.fileupload-process',
        'jquery.fileupload-validate',
        'jquery.fileupload'
	],
	shim: {
		'jquery': {
			exports: '$'
		},
		'highcharts': {
			exports: 'Highcharts'
		},
		'highcharts.more': {
			deps: ['highcharts']
		},
		'highstock': {
			exports: 'Highcharts'
		},
		'history': {
			exports: 'hashchange'
		},
		'sparkline': {
			exports: 'sparkline'
		},
        'footable': {
            exports: 'footable'
        },
        'jquery.fileupload': {
            deps: ['jquery.ui', 'jquery.iframe-transport', 'jquery.fileupload-process', 'jquery.fileupload-validate']
        }
	}
});


 * jQuery UI Touch Punch 0.2.2
 * 
 * Copyright 2011, Dave Furfero Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Depends: jquery.ui.widget.js jquery.ui.mouse.js
 
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);*/
