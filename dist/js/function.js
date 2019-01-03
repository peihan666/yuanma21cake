<script type="text/javascript">
    var cache = {
        saleCity: {},
        hasLogin: false,
        currentCityJson: null,
        currentCityId: null,
        currentCityStr: '上海市',
        init: function(){
            var saleCity = Cookie.read('sale_city');
            cache.currentCityJson = saleCity === null ? null : JSON.parse(decodeURIComponent(saleCity));
            var cityId = Cookie.read('cake_city_id');
            cache.currentCityId = cityId !== null && cache.currentCityJson !== null && cache.currentCityJson.hasOwnProperty('id') ? cache.currentCityJson.id : null;
            this.setSaleCity();
        },
        setSaleCity: function(){
            
            cache.saleCity = JSON.parse('[{"id":"1","name":"\u4e0a\u6d77","region_id":"22"},{"id":"2","name":"\u5317\u4eac","region_id":"2"},{"id":"3","name":"\u5929\u6d25","region_id":"43"},{"id":"4","name":"\u676d\u5dde","region_id":"3134"},{"id":"5","name":"\u65e0\u9521","region_id":"1717"},{"id":"6","name":"\u82cf\u5dde","region_id":"1692"},{"id":"7","name":"\u5e7f\u5dde","region_id":"424"},{"id":"8","name":"\u6df1\u5733","region_id":"524"}]');
            
        },
        getSaleCity: function(){
            return cache.saleCity;
        },
        setCurrentCityStr: function(str){
            cache.currentCityStr = str;
        },
        getCurrentCity: function(){
            return cache.currentCityJson;
        },
        getSaleCityHtml: function(){
            var html = '';
            html += '<div class="city-outer" style="width: 100%;height: 100%;position: fixed;z-index: 999;top: 0;left: 0;"></div>';
            html += '<div class="select-city-dialog">';
            html += '<h4>欢迎来到21cake官网商城</h4>';
            html += '<div class="city-dialog-box">';
            html += '<img src="' + Global.staticDomain + '/themes/site/img/logo-di.png" alt="">';
            html += '<div class="city-box">';
            // 获取城市信息
            html += '<p>请选择您的配送城市：<span>' + cache.currentCityStr + '</span></p>';
            html += '<ul id="allCity">';
            for (var i in cache.saleCity) {
                if (!cache.saleCity.hasOwnProperty(i)) {
                    continue;
                }
                var city = cache.saleCity[i];
                if (cache.currentCityStr == city.name + '市') {
                    html += '<li><a href="javascript:void(0);" class="city-id-' + city.id + ' active" data-json=\'' + JSON.stringify(city).toString() + '\'>' + city.name + '</a></li>';
                } else {
                    html += '<li><a href="javascript:void(0);" class="city-id-' + city.id + '" data-json=\'' + JSON.stringify(city).toString() + '\'>' + city.name + '</a></li>';
                }
            }
            html += '</ul>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            return html;
        }
    };
    cache.init();

    (function () {
        var trackId = 'home';
        var params = {
            key: trackId,
            action: 'view'
        };
        try {
            orderTrack('pc', params);
        } catch(e) {
            console.log(e);
        }
        var addCartTrack = function (productId) {
            try {
                params.action = 'add_cart';
                orderTrack('pc', params);
            } catch(e) {
                console.log(e);
            }
        };
        window.addCartTrack = addCartTrack;
    })();

    function checkCurrentCity() {
        var currentCity = cache.getCurrentCity();
        var currentCityId = 1;
        if (currentCity === null || !currentCity.hasOwnProperty('id') || !currentCity.hasOwnProperty('name') || !currentCity.hasOwnProperty('region_id') || !currentCity.hasOwnProperty('first')) {
            getCurrentPosition();
            // $('body').append(cache.getSaleCityHtml());
            currentCityId = 1;
        } else {
           if(window.location.pathname ==='/' || window.location.pathname ===''){
                homeRmind();
            }

            changeSaleCity(cache.getCurrentCity());
            currentCityId = currentCity.id;
        }
        if (cache.currentCityId === null || cache.currentCityId === undefined || cache.currentCityId != currentCityId) {
            cache.currentCityId = currentCityId;
            Cookie.write('cake_city_id', cache.currentCityId, {
                duration : 365,
                domain : '.21cake.com'
            });
        }
    }
    checkCurrentCity();
    var notLogin = $('.not-login');
    var headerUser = $('.header-user');
    $.get('/passport-check-login-status.do', {}, function(res) {
        if (res.status === 'ok' && res.data.status === true) {
            cache.hasLogin = true;
            notLogin.hide();
            messageRed()
            ;(function () {
                var couponTipShow = Cookie.read('couponTipShow');
                var couponCodeShow = Cookie.read('couponCodeShow');
                var couponTipsHide = Cookie.read('couponTipsHide');
                var memberCenter = $('#member-center');
                var html = '';
                var str = '';
                if (!couponTipsHide && couponCodeShow) {
                    Cookie.write('couponTipsHide', 'true', {
                        duration : 720,
                        domain : '.21cake.com'
                    });
                    html = '<span id="coupon-tip" class="site-coupon-tip">';
                    html += '<i></i>';
                    str = '您有优惠券可赠送';
                    html += '<span>' + str + '</span>';
                    html += '</span>';
                }
                if (couponTipShow) {
                    Cookie.write('couponTipShow', '', {
                        duration : -720,
                        domain : '.21cake.com'
                    });
                    html = '<span id="coupon-tip" class="site-coupon-tip">';
                    html += '<i></i>';
                    // str = '恭喜您，获得一张' + decodeURI(couponTipShowName);
                    str = '恭喜您，获得一张优惠券';
                    html += '<span>' + str + '</span>';
                    html += '</span>';
                }
                if (couponCodeShow || couponTipShow) {

//                加上消息中心后这里的红点去掉
//                    headerUser.append('<i class="icon-dot"></i>');
                    $('.header-user-list').find('li>a').eq(1).append('<i class="icon-dot"></i>');
                }
                if (html) {
                    var rightCityUser = $('.right-city-user');
                    rightCityUser.append(html);

                    var couponTip = rightCityUser.find('#coupon-tip');
                    var width = 64 - (parseInt(couponTip.css('font-size')) * str.length / 2);
                    couponTip.css('right', width + 'px');
                    setTimeout('$(".right-city-user").find("#coupon-tip").remove()', 5000);
                }
            })($);
            headerUser.show();
            $('#messageList').css('right','80px');
            typeof loginCallback === 'function' && loginCallback();
        } else {
            Cookie.write('couponCodeShow', '', {
                duration : -365,
                domain : '.21cake.com'
            });
            cache.hasLogin = false;
            notLogin.show();
            headerUser.remove();
        }
    }, 'json');
    function writeSaleCityCookie(saleCity, reload) {
        // 为兼容之前版本的cookie，添加first
        var cityJson = JSON.parse(saleCity);
        cityJson.first = 'ok';
        // 设置cookie
        Cookie.write('sale_city', JSON.stringify(cityJson), {
            duration: 365,
            domain: '.21cake.com'
        });
        Cookie.write('cake_city_id', cityJson.id, {
            duration: 365,
            domain: '.21cake.com'
        });
        Cookie.write('address_info', '', {
            duration: -365,
            domain: '.21cake.com'
        });
        $.post('/cart-convert.do', {}, function (res) {
            $('.current-city-list li>a').show();
            reload && window.location.reload(true);
        }, 'json');
    }
    function changeSaleCity(currentCity) {
        var _city = $('.current-city-list li>a.city-id-' + currentCity.id);
        _city.hide();
        $('.current-city').html(_city.html() + '<i></i>');
    }
    function getCurrentPosition() {
        $('body').append(cache.getSaleCityHtml());
    }
    $('body').delegate('.city-outer', 'click', function () {
        writeSaleCityCookie($('#allCity a.active').attr('data-json'), true);
    }).delegate('#allCity a', 'click', function () {
        writeSaleCityCookie($(this).attr('data-json'), true);
    });
    $('.current-city-list li>a').click(function () {
        var _this = $(this);

        Cookie.delete('sale_city');
        writeSaleCityCookie(_this.attr('data-json'), true);
        popUpWindow({
            title: '正在切换城市，请稍后.....',
            popType: 2
        });
    });
    function cartAmount() {
        CAKE.cart.ajax.amount(function (response) {
            if (CAKE.responseSuccess(response) && response['data']['amount'] > 0) {
                $('#cart-count-icon').html('<i></i><span>' + response['data']['amount'] + '</span>');
            }
        });
    }
    cartAmount();
    window.cartAmount = cartAmount;
    if (Cookie.read('L[member]')) {
        window._ozuid = Cookie.read('L[member]');
    }
    function homeRmind(){
        var form2 = {};
        form2.type = 'layer,notice';
        form2.position = 'home';
        form2.channel = 'pc';
        api.getJsonp('Notice.show', '1.0', form2, function (res) {
            if(res.status == 'ok'){
                var data = res.data;
                if(data.hasOwnProperty('layer')  && data['layer'].length>0){
                    var layer = data.layer[0];
                    $.post('/tips/has-read/layer.do',{'ident':layer.ident},function(){

                    });
                    var analysisForm = {};
                    analysisForm.name = 'home-layer-' + layer.ident;
                    analysisForm.tag = '-';
                    analysisForm.divName = 'activity';
                    var btnLeftTxt='关闭',btnRightTxt='确定',scheme='/';
                    $.each(layer.buttons,function(index,val){
                        if(val.type==1){
                            btnLeftTxt = val.title
                        }
                        if(val.type==2){
                            btnRightTxt = val.title;
                            scheme = val.scheme
                        }
                    });
                    popUpWindow({
                        title:layer.title,
                        popWidth:'420px',
                        Img:Global.staticDomain+layer.image,
                        content:layer.subTitle,
                        popType: 8,
                        btnLeftTxt: btnLeftTxt,
                        btnRightTxt:btnRightTxt,
                        buttonWidth:'190px',
                        cancel:function(){
                            analysisForm.url = window.location.href;
                            analysis.action('homeLayerCancelClick', analysisForm);
                        },
                        callback: function () {
                            analysisForm.url = scheme;
                            analysis.action('homeLayerClick', analysisForm);
                            location.href=scheme;
                        }
                    })
                }
                if(data.hasOwnProperty('notice') && data['notice'].length>0){
                    var html = '';
                    $.each(data.notice,function(index,val){
                        if(this.image!==''){
                            html+='<li><p><img src="'+this.image+'" /><span>'+this.title+'</span>'
                        }else{
                            html+='<li><p><img src="/themes/site/img/notic.png"/><span>'+this.title+'</span>'
                        }
                        if(this.link=='' || this.subTitle ==''){
                            html+='</p></li>'
                        }else{
                            html+='<a href="'+this.link+'">'+this.subTitle+'>></a></p></li>'
                        }
                        $('#cart-events-box').html(html);
                        cartEvent();
                    })
                }
//               if(data.hasOwnProperty('redPoint')){
//                   if(data.redPoint){
//                       $('.header-user').append('<i class="icon-dot"></i>');
//                       $('.header-user-list').find('li>a').eq(1).append('<i class="icon-dot"></i>');
//                   }
//
//               }

            }
        })
    }
    //消息红点
    function messageRed(){
        $.get('/message/has-not-message.do',function(res){
            if(res.status == 'ok'){
                var status = res.data.status;
                if(status){
                    $('.right-city-user .header-message').append('<i class="icon-dot"></i>');
                }
            }
        })
    }
    // 促销规则切换
    function cartEvent(){
        var cartEventSize = $("#cart-events-box li").size();
        if ($("#cart-events-box li").size() == 0) {
            $(".cart-sales").hide();
        } else if ($("#cart-events-box li").size() >= 2) {
            $(".cart-sales").show();
            var firstP = $("#cart-events-box li").first().clone();
            $("#cart-events-box").append(firstP);
            var i = 1;
            setInterval(function () {
                if (i > cartEventSize) {
                    i = 1;
                    $("#cart-events-box").css('top', 0)
                }
                $("#cart-events-box").animate({top: -i *40 + "px"}, 400);
                i++;
            }, 6000);
            var cartEvent = $("#cart-events-box li");
            $.each(cartEvent, function (index, val) {
                var pHeight = $(this).find('p').height();
                $(this).find('p').css("margin-top", -pHeight / 2);
            });
        } else {
            $(".cart-sales").show();
            var pHeight = $("#cart-events-box li p").height();
            $("#cart-events-box li p").css("margin-top", -pHeight / 2);
        }
    }
</script>
