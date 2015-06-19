var dp = jQuery;
dp.noConflict();

dp(document).ready(function() {
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

    dp('.sscroll').bind('click.smoothscroll', function(e) {
        e.preventDefault();
        dp('html,body').animate({
            scrollTop: dp(this.hash).offset().top
        }, 1200);
    });

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

    dp('.portfolioContainer').mixitup({
        filterSelector: '.portfolioFilter a',
        targetSelector: '.portfolio-item',
        effects: ['fade', 'scale']
    });

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

    dp("[data-toggle='tooltip']").tooltip();

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

    dp("#backtotop").backToTop();

    dp('body').mobileResponsive();

    dp('a[data-toggle="tooltip"]').tooltip();
});


dp(window).load(function() {
    dp('#loader').fadeOut(500, "linear");

    dp('#slides').responsiveSlides({
        auto: true,
        pager: true,
        nav: true,
        timeout: 8000,
        speed: 500,
        namespace: "transparent-btns",
        before: function(i){

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
        namespace: "transparent-btns"
    });


    var slides = {
        '#software-dev': '/public/images/main-slide-images/development.jpg',
        '#it-consult': '/public/images/main-slide-images/consulting.jpg',
        '#mongodb': '/public/images/main-slide-images/mongo-db.jpg',
        '#managed-services': '/public/images/main-slide-images/managed-services.jpg',
        '#it-trainings': '/public/images/main-slide-images/corporate-training.jpg',
        '#dedicated-team': '/public/images/main-slide-images/dedicated-team.jpg',
        '#cto': '/public/images/main-slide-images/cto-as-a-service.jpg',
        '#ahr': '/public/images/ahr2.jpg',
        '#quantfolio': '/public/images/quant5.jpg'
    }

    function loadSlides (){
        for (var imgSelector in slides){
            dp(imgSelector).attr('src',slides[imgSelector]);
        }
    }

    loadSlides();
});


