function init() {
    var hie;
    var height ={
        'left' : $('.left-header-content-col').find('.block').height(),
        'center' : $('.center-header-content-col').find('.block').height(),
        'right' : $('.right-header-content-col').find('.block').height(),
        'current': $('.left-header-content-col').find('.block').height()
    };

    if (height.current < height.center ) {
        height.curent = height.center;
        hie = height.curent;
    };
    if (height.current < height.right) {
        height.curent = height.right;
        hie = height.curent;
    };
    $('.header-content-cols').find('.block').height(height.current);
    $('.header-content-cols').find('.block').height(hie);
}

window.onload = init;

$(function(){
    var menu_special;

    var height ={
        'left' : $('.left-header-content-col').find('.block').height(),
        'center' : $('.center-header-content-col').find('.block').height(),
        'right' : $('.right-header-content-col').find('.block').height(),
        'current': $('.left-header-content-col').find('.block').height()
    };

    if (height.current < height.center ) {
        height.curent = height.center;
    };
    if (height.current < height.right) {
        height.curent = height.right;
    };

    $('.header-content-cols').find('.block').height(height.current);

    $('.item-menu-special').click(function() {
        if (!$(this).hasClass('item-menu-special-on')) {
            $(this).addClass('item-menu-special-on');
        } else {
            console.log($(this));
            $(this).removeClass('item-menu-special-on');
        }
    });

    $('.item-big-news').click( function() {
        var parent = $('.big-news');
        if (!$(this).hasClass('item-big-news-on')) {
            parent.find('.item-big-news-on').removeClass('item-big-news-on').addClass('item-big-news-off');
            $(this).removeClass('item-big-news-off').addClass('item-big-news-on');
        } else {
	    location.href = $(this).find('a').attr('href');
	}
    });

    $('.top-subjects').click
    (
        function()
        {
            $('.top-subjects').removeClass('top-subjects-on').addClass('top-subjects-off');
            $(this).removeClass('top-subjects-off').addClass('top-subjects-on');
        }
    );

    var fader = $('#fader'),
        body = $('BODY');

    function showFader() {
        var documentHeight = $(document).height();
        fader.height(documentHeight);
        body.addClass('fader-visible');
        fader.removeClass('hidden');
        fader.bind('click', function() {
            hideFader()
        });
    }

    function hideFader() {
        if (body.hasClass('fader-visible')) {
            body.removeClass('fader-visible');
            fader.addClass('hidden');
        }
        fader.unbind('click');
        gal.hide_popup();
    }

    var parent_gal = $('.gal-entry'),
        foto = $('.hide-foto-container').find('img'),
        foto_wrapper = $('.hide-foto-container'),
        popup = $('#popup'),
        img = {};

    var gal = {
        show_popup : function(cur_el, pos) {
            popup.show();
            popup.html('');
            var ofset_h = $('.content').offset();
            $('<div class="popup-inner">'+
                    '<div class="next-foto"></div>'+
                    '<div class="prev-foto"></div>'+
                    '<img src="'+ img[cur_el].src + '" class="img-gallery"/>'+
                    '<p class="popup-position">'+img[cur_el].position+'</p>'+
                    ( img[cur_el].description.length > 0 || img[cur_el].copyright.length > 0 ? '<p class="popup-description">'  + (img[cur_el].description.length > 0 ? img[cur_el].description + ' <br/>' : '') + '<a href="' + img[cur_el].cpurl + '">'+ img[cur_el].copyright +'</a></p>' : '') +
               '</div>').appendTo(popup);

               var next_foto = $('.next-foto'),
                   prev_foto = $('.prev-foto');

            if(img[ 'img'+ (pos + 1)]){
                next_foto.show();
                next_foto.click(function() {
                    gal.next('img'+ (pos + 1),pos+1);
                });
            }
            if(img[ 'img'+ (pos - 1)]){
                prev_foto.show();
                prev_foto.click(function() {
                    gal.prev('img'+(pos - 1), pos-1);
                });
            }

            var popup_width = popup.width();
            popup.css({'margin-left': '-' + popup_width/2 + 'px', 'top': ofset_h.top+20+'px'})
        },
        next: function(el, pos) {
            gal.show_popup(el, pos);
        },
        prev: function(el,pos) {
            gal.show_popup(el, pos);
            console.log('prev');
        },
        hide_popup :function() {
            popup.html('');
            popup.hide();
        },
        init: function(el) {
            foto_wrapper.show();
            var foto_count = foto.length,
                curent_foto = $(el).find('IMG'),
                curent_foto_data = curent_foto.data('img'),
                cur_pos = curent_foto.data('position');
            $('.img-gal-href').children('img').each(function(index) {
                img[$(this).attr('data-img')] = {
                    'src':$(this).attr('src'),
                    'width': $(this).width(),
                    'height': $(this).height(),
                    'copyright': ($(this).attr('alt').length ? $(this).attr('alt') : '') ,
                    'cpurl': ($(this).attr('cpurl').length ? $(this).attr('cpurl') : ''),
                    'position': 'Изображение '+ (index + 1) +' из ' + foto_count,
	                'description' : ($(this).attr('data-description').length > 0 ? $(this).attr('data-description') : '')
                }
            });
            foto_wrapper.hide();
            gal.show_popup(curent_foto_data, cur_pos);
        }
    };

    /*parent_gal.delegate( '.img-gal-href' , 'click', function() {
        showFader();
        gal.init(this);
        return false;
    });*/
    $('.img-gal-href').click(function() {
        showFader();
        gal.init(this);
        return false;
    });
});


