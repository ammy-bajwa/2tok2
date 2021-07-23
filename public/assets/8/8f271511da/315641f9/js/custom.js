/*  Theme Name: Xaino - Responsive Bootstrap 4 Landing Template
    Author: Saptavarana
    Version: 1.0.0
    Created:September 2018
    File Description:Main Css file of the template
*/

(function($) {

    'use strict';

    function initNavbarStickey() {

        function initsticky(){
            var scroll = $(window).scrollTop();
            if (scroll >= 50) {
                $(".sticky:not(.no-sticky)").addClass("stickyadd");
            } else {
                $(".sticky:not(.no-sticky)").removeClass("stickyadd");
            }
        }

        $(window).on('scroll', function() {
            initsticky();
        });
        initsticky();
    }

    function initSmoothLink() {
        $('.navbar-nav a, .scroll_down a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 75
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    }

    function initScrollspy() {
        $("#navbarCollapse").scrollspy({
            offset: 20
        });
    }

    function initTesti() {

        $("#owl-demo").owlCarousel({
            autoPlay: 3000,
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [979, 2]

        });
    }

    function initMfpvideo() {
        $('.img-zoom').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            }
        });

        $('.features_video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    function initCounter() {
        var a = 0;
        $(window).on('scroll', function() {
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter_value').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }

                    });
                });
                a = 1;
            }
        });
    }

    function init() {
        initNavbarStickey();
        initSmoothLink();
        //initScrollspy();
        initTesti();
        initMfpvideo();
        //initCounter();
    }
    init();

    $('body').on('click', '.file-caption', function () {
        $(this).next().find('.btn-file input').trigger('click');
    });
})(jQuery);