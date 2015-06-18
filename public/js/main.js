var dp = jQuery;
dp.noConflict();

dp(document).ready(function() {
    var mainSlides = {
        '1': '/public/images/main-slide-images/development.jpg',
        '2': '/public/images/main-slide-images/consulting.jpg',
        '3': '/public/images/main-slide-images/mongo-db.jpg',
        '4': '/public/images/main-slide-images/managed-services.jpg',
        '5': '/public/images/main-slide-images/corporate-training.jpg',
        '6': '/public/images/main-slide-images/dedicated-team.jpg',
        '7': '/public/images/main-slide-images/cto-as-a-service.jpg'
    }

    var showcasesSlides = {
        '1': '/public/images/quant5.jpg'
    }
    //SET ACTIVE MENU ITEM
    dp('.navbar-nav li a').each(function(index, item){
           item = dp(item);
            var itemText = item.text().toLowerCase();
        if (
            (window.location.pathname.indexOf(itemText) != -1
            //&&
            //(itemText == 'home' || itemText == 'services')
            ) ||
            (window.location.pathname == '/' && item.text().toLowerCase() == 'home'))
           {
               item.parent().addClass('active');
           }
           else {
               item.parent().removeClass('active');
           }
        });

    dp('#copyright-year').html(new Date().getFullYear());

    //SMOOTH SCROLL 
    dp('.sscroll').bind('click.smoothscroll', function(e) {
        e.preventDefault();
        dp('html,body').animate({
            scrollTop: dp(this.hash).offset().top
        }, 1200);
    });
    //BIG SLIDE
    dp('#home-slide').superslides({
        animation: 'fade', // You can choose either fade or slide
        play: 6000,
        pagination: false
    });

    //dp('.slider').unslider({dots: true, speed: 1000, delay: 3000});

    dp(window).load(function() {
        dp('#slides').responsiveSlides({
            auto: true,
            pager: true,
            nav: true,
            timeout: 8000,
            speed: 500,
            namespace: "transparent-btns",
            before: function(e){
                if (e != 0)
                {
                    dp('#slides img:eq('+e+')').attr('src',mainSlides[e]);
                }
            }
        });

        dp('#showcases-slides').responsiveSlides({
            auto: false,
            pager: true,
            nav: true,
            timeout: 8000,
            speed: 500,
            prevText: '',
            nextText: '',
            namespace: "transparent-btns",
            before: function(e){
                if (e != 0)
                {
                    dp('#showcases-slides img:eq('+e+')').attr('src',showcasesSlides[e]);
                }
            }
        });
    });

    //FIT VIDS
    if (dp.fn.fitVids) {
        dp(".fitvids").fitVids();
    }
    //SERVICES SLIDER
    dp("#slider-services").sudoSlider({
        speed: 650,
        auto: true,
        pause: 3000,
        prevNext: false,
        responsive: true,
        useCSS: true,
        continuous: true,
        effect: "slide",
        updateBefore: true
    });
    //PORTFOLIO
    dp('.portfolioContainer').mixitup({
        filterSelector: '.portfolioFilter a',
        targetSelector: '.portfolio-item',
        effects: ['fade', 'scale']
    });
    //QUOTE SLIDE
    dp("#quote-slider").sudoSlider({
        customLink: 'a.quoteLink',
        speed: 425,
        prevNext: true,
        responsive: true,
        prevHtml: '<a href="#" class="quote-left-indicator"><i class="fa fa-angle-left"></i></a>',
        nextHtml: '<a href="#" class="quote-right-indicator"><i class="fa fa-angle-right"></i></a>',
        useCSS: true,
        continuous: true,
        effect: "fadeOutIn",
        updateBefore: true
    });
    // TOOTLTIP
    dp("[data-toggle='tooltip']").tooltip();
    //  Responsive layout, resizing the items   
    if (dp('.client-slider').length > 0) {
        dp('.client-slider').carouFredSel({
            responsive: true,
            width: '100%',
            scroll: 1,
            items: {
                width: 330,
                height: '100%',  //  optionally resize item-height
                visible: {
                    min: 1,
                    max: 3
                }
            }
        });
    }

    //BACK TO TOP
    dp("#backtotop").backToTop();
    //CALL TO ACTION
    /*
    var bg_img = dp(".call-ta").attr('data-background');
    dp(".call-ta").backstretch(bg_img);
    */
    //JQUERY Mobile Devices Responsive
    dp('body').mobileResponsive();

    //Bootstrap Tooltip
    dp('a[data-toggle="tooltip"]').tooltip();
});


dp(window).load(function() {
    dp('#loader').fadeOut(1000, "linear");
});
