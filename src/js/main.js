(function($) {
	$.fn.extend({
		fade: function(opt) {
			var settings = {
				url: null,
				boxWid: '100%',
				boxHei: 500,
				times: 5000,
				fadeTime: 2000,
				scale: 1.1
			};
			var o = $.extend(settings, opt);
			var $box = this;
			var $oUl = $('<ul></ul>');
			var $next = $('<h3>&gt;</h3>');
			$.each(o.url, function(index, items) {
				var StyleB = "background-image:url(" + Global.staticDomain + items.img_url + ");";
				var html = '<div><a class="back_a" name="sliders_' + items.sort + '" data-name="' + items.name + '" href=' + items.href + ' data-original=' + Global.staticDomain + items.img_url + '  style=' + StyleB + '></a>';
				if (typeof items.font_img_url !== 'undefined' && items.font_img_url) {
					html += '<a class="font-img-a" data-name="' + items.name + '" href=' + items.href + '  style=' + "width:" + items.font_width + ";top:" + items.font_top + ";left:" + items.font_left + ";" + ' ><img src="' + Global.staticDomain + items.font_img_url + '"/></a>'
				}
				html += '</div>';
				$box.append(html);
				$oUl.append('<li></li>')
			});
			$box.append($oUl, $next);
			var size = $oUl.children('li').size();
			if (size <= 1) {
				$oUl.hide();
				$next.remove()
			}
			$box.css({
				width: o.boxWid,
				height: o.boxHei,
				position: 'relative'
			}).children('div').css({
				width: o.boxWid,
				height: o.boxHei,
				'min-width': '980px',
				position: 'absolute',
				left: '0',
				top: '0',
				display: 'none',
				'overflow': 'hidden',
				'text-align': 'center',
				'-webkit-backface-visibility': 'hidden',
				'-webkit-transform': 'translate3d(0,0,0)',
			}).eq(0).css({
				display: 'block'
			}).end().find('a.back_a').css({
				display: 'inline-block',
				width: '100%',
				height: '100%',
				'background-position': 'center center',
				'background-repeat': 'no-repeat',
				'transform': 'scale(1)',
				'-webkit-transform': 'scale(1)',
				'-o-transform': 'scale(1)',
				'-moz-transform': 'scale(1)',
				'-ms-transform': 'scale(1)',
				'-webkit-backface-visibility': ' hidden',
				'-webkit-transform': 'translate3d(0,0,0)',
			}) $box.find('a.font-img-a').css({
				position: 'absolute',
				'z-indeex': '1000000',
				'height': o.boxHei,
				'display': 'block',
			}).find('img').css({
				width: '100%',
			});
			$oUl.css({
				position: 'absolute',
				bottom: o.boxHei / 20,
				left: '50%',
				overflow: 'hidden',
				zIndex: 5,
				listStyle: 'none',
				height: 11,
				'width': size * (10 + 10) + 'px',
				marginLeft: -(size * (10 + 10) / 2),
			}).children('li').css({
				float: 'left',
				'cursor': 'pointer',
				'box-shadow': '0 0 1px 0px rgba(0,0,0,0.25)',
				width: 10,
				height: 10,
				marginRight: 5,
				marginLeft: 5
			}).addClass('sliderli').eq(0).addClass('activeli');
			$box.children('h3').css({
				position: 'absolute',
				top: (o.boxHei - 70) / 2,
				padding: '20px 10px',
				fontSize: 30,
				fontFamily: '黑体',
				color: '#fff',
				background: 'rgba(0,0,0,0.5)',
				cursor: 'pointer'
			}).hide().eq(1).css('right', '0');
			setTimeout(function() {
				$box.children('div').eq(0).children("a.back_a").css({
					'transform': 'scale(' + o.scale + ')',
					'-webkit-transform': 'scale(' + o.scale + ')',
					'-o-transform': 'scale(' + o.scale + ')',
					'-ms-transform': 'scale(' + o.scale + ')',
					'-moz-transform': 'scale(' + o.scale + ')',
					"transition": " all 5s",
					'-webkit-transition': " all 5s"
				})
			}, 500) var $timer = setTimeout(move, o.times);
			var $flag = true;
			var $index = 0;

			function move() {
				$index++;
				if ($index == o.url.length) {
					$index = 0
				}
				$box.children('div').eq($index).stop().fadeIn(o.fadeTime, function() {
					if ($flag) {
						clearTimeout($timer);
						$timer = setTimeout(move, o.times)
					}
				}).siblings('div').stop().fadeOut(o.fadeTime, function() {
					$(this).children("a.back_a").css({
						'transform': 'scale(1)',
						'-webkit-transform': 'scale(1)',
						'-o-transform': 'scale(1)',
						'-ms-transform': 'scale(1)',
					})
				});
				$box.children('div').eq($index).children('a.back_a').css({
					'transform': 'scale(' + o.scale + ')',
					'-webkit-transform': 'scale(' + o.scale + ')',
					'-o-transform': 'scale(' + o.scale + ')',
					'-ms-transform': 'scale(' + o.scale + ')',
					'-moz-transform': 'scale(' + o.scale + ')',
					"transition": " all 5s",
					'-webkit-transition': " all 5s"
				});
				$oUl.children('li').eq($index).stop().addClass('activeli').siblings('li').stop().removeClass('activeli')
			}
			$oUl.children('li').hover(function() {
				$index = $(this).index();
				$box.children('div').eq($index).stop().fadeIn(o.fadeTime).siblings('div').stop().fadeOut(o.fadeTime, function() {
					$(this).children("a.back_a").css({
						'transform': 'scale(1)',
						'-webkit-transform': 'scale(1)',
						'-o-transform': 'scale(1)',
						'-ms-transform': 'scale(1)',
						'-moz-transform': 'scale(1)',
					})
				});
				$box.children('div').eq($index).children('a.back_a').css({
					'transform': 'scale(' + o.scale + ')',
					'-webkit-transform': 'scale(' + o.scale + ')',
					'-o-transform': 'scale(' + o.scale + ')',
					'-ms-transform': 'scale(' + o.scale + ')',
					'-moz-transform': 'scale(' + o.scale + ')',
					"transition": " all 5s",
					'-webkit-transition': " all 5s"
				});
				$(this).stop().addClass('activeli').siblings('li').stop().removeClass('activeli')
			}, function() {});
			$box.hover(function() {
				$flag = false;
				clearTimeout($timer)
			}, function() {
				$flag = true;
				$timer = setTimeout(move, o.times)
			});
			return this
		},
		activityFade: function(opt) {
			var settings = {
				times: 4000
			};
			var o = $.extend(settings, opt);
			var $box = this;
			var $oUl = $('<ul></ul>');
			$box.append($oUl);
			$box.find('.activity-list').each(function() {
				$oUl.append('<li></li>')
			});
			$box.css('position', 'relative').find('.activity-list').css({
				position: 'absolute',
				top: 0,
				left: 0
			});
			$box.find('ul').css({
				'position': 'absolute',
				'bottom': '15px',
				'right': '15px',
				'overflow': 'hidden'
			}).find('li').css({
				'height': 8,
				width: 8,
				'background': '#fff',
				'border': '1px solid #f1f1f1',
				'float': 'left',
				'margin-left': '8px',
				'cursor': 'pointer'
			}).eq(0).addClass('activeli');
			var $timer = setTimeout(activityMove, o.times);
			var $flag = true;
			var $index = 0;

			function activityMove() {
				$index++;
				if ($index == $box.find('.activity-list').size()) {
					$index = 0
				}
				$box.children('.activity-list').eq($index).stop().fadeIn(o.fadeTime, function() {
					if ($flag) {
						clearTimeout($timer);
						$timer = setTimeout(activityMove, o.times)
					}
				}).siblings('.activity-list').stop().fadeOut(o.fadeTime);
				$oUl.children('li').eq($index).stop().addClass('activeli').siblings('li').stop().removeClass('activeli')
			}
			$oUl.children('li').hover(function() {
				$index = $(this).index();
				$box.children('div').eq($index).stop().fadeIn(o.fadeTime).siblings('div').stop().fadeOut(o.fadeTime);
				$(this).stop().addClass('activeli').siblings('li').stop().removeClass('activeli')
			}, function() {})
		},
		leftRifhtSwitch: function(opt) {
			var settings = {
				singleLeight: 279,
				Width: 1116,
				num: 4,
				moduleListLi: $('li', this),
				smallModule: $('ul', this),
				homeButton: $('.home-button', this),
				homeButtonLeft: $('.home-left-button', this),
				homeButtonRight: $('.home-right-button', this)
			};
			var o = $.extend(settings, opt);
			var size = o.moduleListLi.size();
			var maxWidth = size * o.singleLeight;
			var maxLeft = maxWidth - o.Width;
			var i = 0;
			if (size > o.num) {
				o.homeButton.show();
				o.smallModule.css('width', maxWidth);
				o.homeButtonRight.click(function() {
					if (i <= size - o.num - 1) {
						i += 1;
						o.smallModule.animate({
							'left': -(i * o.singleLeight)
						}, 300);
						o.smallModule.parent('div').find('img.lazy').each(function() {
							$(this).attr('src', $(this).data('original'))
						}) o.homeButtonLeft.addClass('active');
						if (i == size - o.num) {
							o.homeButtonRight.addClass('active')
						}
					}
				});
				o.homeButtonLeft.click(function() {
					if (i >= 1) {
						i -= 1;
						o.smallModule.animate({
							'left': -(i * o.singleLeight)
						}, 300);
						o.homeButtonRight.removeClass('active');
						if (i == 0) {
							o.homeButtonLeft.removeClass('active')
						}
					}
				})
			}
		}
	})
}(jQuery));
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory)
	} else {
		factory(window.jQuery || window.Zepto)
	}
})(function($, undefined) {
	var w = window,
		$window = $(w),
		defaultOptions = {
			threshold: 0,
			failure_limit: 0,
			event: 'scroll',
			effect: 'show',
			effect_params: null,
			container: w,
			data_attribute: 'original',
			data_srcset_attribute: 'original-srcset',
			skip_invisible: true,
			appear: emptyFn,
			load: emptyFn,
			vertical_only: false,
			minimum_interval: 300,
			use_minimum_interval_in_ios: false,
			url_rewriter_fn: emptyFn,
			no_fake_img_loader: false,
			placeholder_data_img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
			placeholder_real_img: 'http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png'
		},
		isIOS = (/(?:iphone|ipod|ipad).*os/gi).test(navigator.appVersion),
		isIOS5 = isIOS && (/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion),
		type
	function emptyFn() {}
	type = (function() {
		var object_prototype_toString = Object.prototype.toString
		return function(obj) {
			return object_prototype_toString.call(obj).replace('[object ', '').replace(']', '')
		}
	})() function belowthefold($element, options) {
		var fold
		if (options._$container == $window) {
			fold = ('innerHeight' in w ? w.innerHeight : $window.height()) + $window.scrollTop()
		} else {
			fold = options._$container.offset().top + options._$container.height()
		}
		return fold <= $element.offset().top - options.threshold
	}
	function rightoffold($element, options) {
		var fold
		if (options._$container == $window) {
			fold = $window.width() + ($.fn.scrollLeft ? $window.scrollLeft() : w.pageXOffset)
		} else {
			fold = options._$container.offset().left + options._$container.width()
		}
		return fold <= $element.offset().left - options.threshold
	}
	function abovethetop($element, options) {
		var fold
		if (options._$container == $window) {
			fold = $window.scrollTop()
		} else {
			fold = options._$container.offset().top
		}
		return fold >= $element.offset().top + options.threshold + $element.height()
	}
	function leftofbegin($element, options) {
		var fold
		if (options._$container == $window) {
			fold = $.fn.scrollLeft ? $window.scrollLeft() : w.pageXOffset
		} else {
			fold = options._$container.offset().left
		}
		return fold >= $element.offset().left + options.threshold + $element.width()
	}
	function checkAppear($elements, options) {
		var counter = 0 $elements.each(function(i, e) {
			var $element = $elements.eq(i) if (options.skip_invisible && !($element.width() || $element.height()) && $element.css("display") !== "none") {
				return
			}
			function appear() {
				$element.trigger('_lazyload_appear') counter = 0
			}
			if (options.vertical_only) {
				if (abovethetop($element, options)) {} else if (!belowthefold($element, options)) {
					appear()
				} else {
					if (++counter > options.failure_limit) {
						return false
					}
				}
			} else {
				if (abovethetop($element, options) || leftofbegin($element, options)) {} else if (!belowthefold($element, options) && !rightoffold($element, options)) {
					appear()
				} else {
					if (++counter > options.failure_limit) {
						return false
					}
				}
			}
		})
	}
	function getUnloadElements($elements) {
		return $elements.filter(function(i, e) {
			return !$elements.eq(i)._lazyload_loadStarted
		})
	}
	if (!$.fn.hasOwnProperty('lazyload')) {
		$.fn.lazyload = function(options) {
			var $elements = this,
				isScrollEvent, isScrollTypeEvent, scrollTimer = null,
				hasMinimumInterval
			if (!$.isPlainObject(options)) {
				options = {}
			}
			$.each(defaultOptions, function(k, v) {
				if ($.inArray(k, ['threshold', 'failure_limit', 'minimum_interval']) != -1) {
					if (type(options[k]) == 'String') {
						options[k] = parseInt(options[k], 10)
					} else {
						options[k] = v
					}
				} else if (k == 'container') {
					if (options.hasOwnProperty(k)) {
						if (options[k] == w || options[k] == document) {
							options._$container = $window
						} else {
							options._$container = $(options[k])
						}
					} else {
						options._$container = $window
					}
					delete options.container
				} else if (defaultOptions.hasOwnProperty(k) && (!options.hasOwnProperty(k) || (type(options[k]) != type(defaultOptions[k])))) {
					options[k] = v
				}
			}) isScrollEvent = options.event == 'scroll'
			isScrollTypeEvent = isScrollEvent || options.event == 'scrollstart' || options.event == 'scrollstop'
			$elements.each(function(i, e) {
				var element = this,
					$element = $elements.eq(i),
					placeholderSrc = $element.attr('src'),
					originalSrcInAttr = $element.attr('data-' + options.data_attribute),
					originalSrc = options.url_rewriter_fn == emptyFn ? originalSrcInAttr : options.url_rewriter_fn.call(element, $element, originalSrcInAttr),
					originalSrcset = $element.attr('data-' + options.data_srcset_attribute),
					isImg = $element.is('img') if ($element._lazyload_loadStarted == true || placeholderSrc == originalSrc) {
						$element._lazyload_loadStarted = true $elements = getUnloadElements($elements) return
					}
				$element._lazyload_loadStarted = false
				if (isImg && !placeholderSrc) {
					$element.one('error', function() {
						$element.attr('src', options.placeholder_real_img)
					}).attr('src', options.placeholder_data_img)
				}
				$element.one('_lazyload_appear', function() {
					var effectParamsIsArray = $.isArray(options.effect_params),
						effectIsNotImmediacyShow
					function loadFunc() {
						if (effectIsNotImmediacyShow) {
							$element.hide()
						}
						if (isImg) {
							if (originalSrcset) {
								$element.attr('srcset', originalSrcset)
							}
							if (originalSrc) {
								$element.attr('src', originalSrc)
							}
						} else {
							$element.css('background-image', 'url("' + originalSrc + '")')
						}
						if (effectIsNotImmediacyShow) {
							$element[options.effect].apply($element, effectParamsIsArray ? options.effect_params : [])
						}
						$elements = getUnloadElements($elements)
					}
					if (!$element._lazyload_loadStarted) {
						effectIsNotImmediacyShow = (options.effect != 'show' && $.fn[options.effect] && (!options.effect_params || (effectParamsIsArray && options.effect_params.length == 0))) if (options.appear != emptyFn) {
							options.appear.call(element, $elements.length, options)
						}
						$element._lazyload_loadStarted = true
						if (options.no_fake_img_loader || originalSrcset) {
							if (options.load != emptyFn) {
								$element.one('load', function() {
									options.load.call(element, $elements.length, options)
								})
							}
							loadFunc()
						} else {
							$('<img />').one('load', function() {
								loadFunc() if (options.load != emptyFn) {
									options.load.call(element, $elements.length, options)
								}
							}).attr('src', originalSrc)
						}
					}
				}) if (!isScrollTypeEvent) {
					$element.on(options.event, function() {
						if (!$element._lazyload_loadStarted) {
							$element.trigger('_lazyload_appear')
						}
					})
				}
			}) if (isScrollTypeEvent) {
				hasMinimumInterval = options.minimum_interval != 0 options._$container.on(options.event, function() {
					if (isScrollEvent && hasMinimumInterval && (!isIOS || options.use_minimum_interval_in_ios)) {
						if (!scrollTimer) {
							scrollTimer = setTimeout(function() {
								checkAppear($elements, options) scrollTimer = null
							}, options.minimum_interval)
						}
					} else {
						return checkAppear($elements, options)
					}
				})
			}
			$window.on('resize load', function() {
				checkAppear($elements, options)
			}) if (isIOS5) {
				$window.on('pageshow', function(e) {
					if (e.originalEvent && e.originalEvent.persisted) {
						$elements.trigger('_lazyload_appear')
					}
				})
			}
			$(function() {
				checkAppear($elements, options)
			}) return this
		}
	}
});
var homeList = {
	position: 'home_top,home_middle,home_floor,activity,community',
	cityId: Cookie.read('cake_city_id') ? Cookie.read('cake_city_id') : '1',
	channel: 'pc',
	homeListId: 1,
	homeMould: {},
	init: function() {
		var position = Global.hasOwnProperty('homeAdModule') ? JSON.parse(Global.homeAdModule) : '';
		if (!position) {
			return false
		}
		var positionArr = [];
		for (var i in position) {
			if (!position.hasOwnProperty(i)) {
				continue
			}
			positionArr.push(position[i])
		}
		var form = {};
		form.cityId = this.cityId;
		form.position = positionArr.join(',');
		form.channel = this.channel;
		api.getJsonp('Advertisement.showV2', '1.0', form, function(res) {
			if (res.status = 'ok') {
				$.each(res.data, function(index, content) {
					var template = content.template;
					if (template == "classification") {
						homeList.hasMenu = true
					}
					if (content.hasOwnProperty('title') && content['title']) {
						var title = content['title'].split("·");
						content.mainTitle = title[0] ? title[0] : '';
						content.subTitle = title[1] ? title[1] : ''
					}
					homeList.initHtml(template, content)
				});
				homeList.displayEffect()
			}
		})
	},
	initHtml: function(template, content) {
		var this_ = this;
		switch (template) {
		case 'images':
			this_.sceneHtml(content.data[0]);
			break;
		case 'community':
			this_.communityHtml(content);
			break;
		case 'magazine':
			this_.communityHtml(content);
			break;
		case 'floor':
			this_.colorfulHtml(content);
			break;
		case 'activity':
			this_.activityHtml(content);
			break
		}
	},
	displayEffect: function() {
		$('.anchor').each(function() {
			$(this).attr('id', homeList.homeListId);
			homeList.homeListId++
		}) $('.color-product-list').each(function() {
			$(this).leftRifhtSwitch()
		});
		$('.home-activity-content').activityFade();
		$(".lazy").lazyload({
			effect: "fadeIn"
		})
	},
	sceneHtml: function(data) {
		var sceneHtmlTemplate = new Template(' <div class="home-scene"><a href="{href}" name="single_image" target="_blank"><img class="lazy" data-original="{staticDomain}{img_url}" src="../img/bj.png" alt="{title}"></a></div>');
		data.staticDomain = Global.staticDomain;
		$('.content-box').append(sceneHtmlTemplate.format(data))
	},
	slidersHtml: function(data) {
		var sliderHeight = $(window).height() - 80 - 140;
		if (sliderHeight <= 480) {
			sliderHeight = 480
		}
		$('#slider').fade({
			url: data,
			boxHei: sliderHeight,
			scale: 1
		});
		$("a.lazy").lazyload({
			effect: "fadeIn"
		})
	},
	colorfulHtml: function(data) {
		var colorTemplate = new Template('<div class="home-module home-colorful  "></div>');
		var colorfulListTemplate = new Template('<div class="home-module home-colorful anchor" >             <h4 class="home-module-title">{title}<span>/</span><span>{subTitle}</span></h4>            <div class="colorful-top-banner">            <a href="{href}" target="_blank" name="floor_banner_{sort}"><img  class="lazy" data-original="' + Global.staticDomain + '{banner}" src="../img/bj.png"></a>            </div>            <div class="color-product-list">            <div class="list-box">            <ul></ul>            </div>            <div class="home-left-button home-button" name="floor_left_button_{sort}"></div>            <div class="home-right-button home-button" name="floor_right_button_{sort}"></div>            </div>            </div>');
		var colorfulTemplate = new Template('<li>            <a href="{href}" name="floor_goods_img_{sort}_{id}" target="_blank"><img class="lazy" data-original="' + Global.staticDomain + '{imageUrl}" src="/themes/site/img/bj.png"></a>            <a href="{href}" name="floor_goods_name_{sort}_{id}" target="_blank"><h6>{name}</h6></a>            <a href="{href}" name="floor_goods_description_{sort}_{id}" target="_blank"><p>{description}</p></a>            <div class="tag-list">            </div>            </li>');
		var cartInfoTpl = new Template('            <div class="cart-info">                <span class="spec">¥{price}/{spec}</span>                <a href="javascript:void(0);" class="add-cart" name="add_cart_{sort}_{id}" data-id="{id}">加入购物车</a>            </div>            <div class="spec-detail">                <div class="spec-title">￥36.0/份</div>                <div class="spec-info">                </div>                <div class="buttons">                    <div class="button left buy-now" data-id="{id}" name="buy_now_{sort}_{id}">立即购买</div>                    <div class="button coffee right add-to-cart" data-id="{id}" name="add_to_cart_{sort}_{id}">加入购物车</div>                </div>            </div>            <div class="addcart-success">                <div>                    <p><i></i>成功添加购物车</p>                    <a href="/cart.do" class="button" target="_blank" name="go_to_cart_{sort}_{id}">查看购物车</a>                </div>            </div>        ');
		$.each(data.data, function(i, v) {
			$('.content-box').append(colorfulListTemplate.format(v));
			$('.colorful-top-banner').eq(1).addClass('anchor');
			$.each(v.contents, function(index, content) {
				content.sort = v.sort;
				$('.list-box').eq(i).find('ul').append(colorfulTemplate.format(content));
				var tagLength = 0;
				$.each(content.tags, function(ind, tags) {
					tagLength += tags.content.length;
					if (tagLength > 8 || ind > 3) {
						return false
					}
					$('.list-box').eq(i).find('ul li').eq(index).find('.tag-list').append('<a href="/gallery/tag/' + tags.id + '.html"  target="_blank" name="goods_tag_' + content.sort + '_' + tags.id + '">' + tags.content + ' ></a>')
				}) if (content.hasOwnProperty('default') && !! content.
			default) {
					var obj = {
						id: content.id,
						price: content.
					default.price,
						spec:
						content.
					default.spec,
						sort:
						v.sort
					};
					$('.list-box').eq(i).find('ul li').eq(index).append(cartInfoTpl.format(obj))
				}
			})
		});
		var cityId = this.cityId;
		var specInfoTpl = new Template('<a href="javascript:void(0);" data-product="{id}" data-price="{price}" data-spec="{spec}">{spec}<i></i></a>');
		var specInfoDefaultTpl = new Template('<a href="javascript:void(0);" class="active" data-product="{id}" data-price="{price}" data-spec="{spec}">{spec}<i></i></a>');
		$('.add-cart').click(function() {
			var form = {};
			form.cityId = cityId;
			form.channel = 'pc';
			form.goodsId = $(this).data('id');
			var self = $(this);
			var analysisForm = {};
			analysisForm.name = $(this).attr('name');
			analysisForm.tag = '-';
			analysisForm.divName = $(this).attr('name');
			analysisForm.url = $(this).attr('href');
			analysis.action('clickbond', analysisForm);
			api.getJsonp('Goods.goodsDetail', '1.0', form, function(res) {
				if (res.status !== 'ok') {
					popUpWindow({
						title: res.message,
						popType: 2
					});
					return false
				}
				productsArr = res.data.productsArr;
				if (res.data.type == 'multiply') {
					productsArr = res.data.productsArr.shift();
					productsArr = productsArr.productsArr
				}
				var keys = Object.getOwnPropertyNames(productsArr);
				if (productsArr !== undefined && keys.length === 1) {}
				var specDetail = self.parents('li').find('.spec-detail');
				var specInfo = specDetail.find('.spec-info');
				specInfo.html('');
				for (var i in productsArr) {
					if (!productsArr.hasOwnProperty(i)) {
						continue
					}
					var prodcutDetail = productsArr[i];
					if (prodcutDetail.pound == 'more') {
						continue
					}
					var html = '';
					if (prodcutDetail.is_default == 'true') {
						html = specInfoDefaultTpl.format(prodcutDetail);
						specDetail.find('.spec-title').html('￥' + prodcutDetail.price + '/' + prodcutDetail.spec)
					} else {
						html = specInfoTpl.format(prodcutDetail)
					}
					specDetail.find('.spec-info').append(html)
				}
				self.parents('li').find('.spec-detail').slideDown();
				$('.layer-shade').show()
			}, 'json')
		});
		$('.spec-info').on('click', 'a', function() {
			var specInfo = $(this).parent('.spec-info');
			var specTitle = specInfo.siblings('.spec-title');
			specInfo.find('a').removeClass('active');
			$(this).addClass('active');
			specTitle.html('￥' + $(this).data('price') + '/' + $(this).data('spec'))
		});
		$('.layer-shade').click(function() {
			$('.spec-detail').slideUp();
			$('.layer-shade').hide()
		});
		$('.buy-now').click(function() {
			var specDetail = $(this).parents('.spec-detail');
			var spec = specDetail.find('.spec-info a.active');
			var successMsg = specDetail.siblings('.addcart-success');
			try {
				if (!spec) {
					throw '请选择商品规格';
				}
				var form = {};
				form.productId = spec.data('product');
				form.quantity = 1;
				if (!form.productId) {
					throw '请选择商品规格';
				}
				var analysisForm = {};
				analysisForm.name = $(this).attr('name');
				analysisForm.tag = '-';
				analysisForm.divName = $(this).attr('name');
				analysisForm.url = $(this).attr('href');
				analysis.action('clickbond', analysisForm);
				$.post('/cart-add-goods.do', form, function(res) {
					specDetail.slideUp();
					successMsg.slideDown();
					$('.layer-shade').hide();
					window.location.href = '/cart.do'
				}, 'json')
			} catch (e) {
				popUpWindow({
					title: e,
					popType: 2
				})
			}
		});
		$('.add-to-cart').click(function() {
			var specDetail = $(this).parents('.spec-detail');
			var spec = specDetail.find('.spec-info a.active');
			var successMsg = specDetail.siblings('.addcart-success');
			try {
				if (!spec) {
					throw '请选择商品规格';
				}
				var form = {};
				form.productId = spec.data('product');
				form.quantity = 1;
				if (!form.productId) {
					throw '请选择商品规格';
				}
				var analysisForm = {};
				analysisForm.name = $(this).attr('name');
				analysisForm.tag = '-';
				analysisForm.divName = $(this).attr('name');
				analysisForm.url = $(this).attr('href');
				analysis.action('clickbond', analysisForm);
				$.post('/cart-add-goods.do', form, function(res) {
					specDetail.slideUp();
					successMsg.slideDown();
					setTimeout(function() {
						successMsg.slideUp()
					}, 3000);
					$('.layer-shade').hide();
					window.cartAmount()
				}, 'json')
			} catch (e) {
				popUpWindow({
					title: e,
					popType: 2
				})
			}
		})
	},
	communityHtml: function(data) {
		var magazineHtmlTemplate = new Template(' <div class="home-module home-magazine anchor">                                                <h4 class="home-module-title">{mainTitle}<span>/</span><span>{subTitle}</span><a href="/magazine.html" target="_blank">查看更多&nbsp;&gt;</a></h4>                                            <ul class="home-magazine-content"></ul></div>');
		var magazineListTemplate = new Template('<li>                                    <a href="{href}" target="_blank" name="community_{id}">                                    <img  class="lazy" data-original="' + Global.staticDomain + '{banner}" src="../img/bj.png" alt="{name}">                                    <h4>{name}</h4>                                    <p><span>{description}</span><span>阅读全文 >></span></p>                                    </a>                                    </li>');
		$('.content-box').append(magazineHtmlTemplate.format(data));
		$.each(data.data, function(i, v) {
			if (i <= 1) {
				$('.home-magazine-content').append(magazineListTemplate.format(v))
			}
		})
	},
	activityHtml: function(data) {
		var activityTpl = new Template(' <div class="home-module home-s_activity anchor">                                                <h4 class="home-module-title">{mainTitle}<span>/</span><span>{subTitle}</span></h4>                                            <ul class="home-s_activity-content"></ul></div>');
		var activityListTpl = new Template('<li>                                    <a href="{href}" target="_blank" name="activity_{ident}">                                        <img  class="lazy" data-original="' + Global.staticDomain + '{img_url}" src="../img/bj.png" alt="{name}">                                    </a>                                    </li>');
		$('.content-box').append(activityTpl.format(data));
		$.each(data.data, function(i, v) {
			if (i >= 2) {
				return false
			}
			v.ident = i;
			$('.home-s_activity-content').append(activityListTpl.format(v))
		})
	},
	activityWithDescriptionHtml: function(data) {
		var activityHtmlTemplate = new Template('<div class="home-module home-activity anchor">            <h4 class="home-module-title">{mainTitle}<span>/</span><span>{subTitle}</span></h4>            <div class="home-activity-content"></div></div>');
		var activityListTemplate = new Template(' <div class="activity-list">                                            <a href="{href}" target="_blank" name="activity_with_description_{ident}">                                            <div class="left-text">                                            <h4>{name}</h4>                                            <p>{description}</p>                                            <span>{remain}</span>                                            </div>                                            <img class="lazy" data-original="' + Global.staticDomain + '{img_url}" src="../img/bj.png" alt="{name}">                                            </a>                                            </div>')
		$('.content-box').append(activityHtmlTemplate.format(data));
		$.each(data.data, function(i, v) {
			v.ident = i;
			$('.home-activity-content').append(activityListTemplate.format(v))
		})
	},
	menuHtml: function(data) {
		var menuHtmlTemplate = new Template('<a href="{href}" name="menu_{sort}"><img class="lazy" data-original="{staticDomain}{img_url}" src="/themes/site/img/bj.png" alt="{name}"/></a>');
		$('.home-menu').html('');
		$.each(data, function(i, v) {
			v.staticDomain = Global.staticDomain;
			$('.home-menu').append(menuHtmlTemplate.format(v))
		})
	}
};
homeList.init();