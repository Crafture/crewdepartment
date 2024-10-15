'use strict'
$(document).ready(function () {
    $('select').niceSelect();

    AOS.init();
    window.addEventListener('load', AOS.refresh);

    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $(".sticky-header").addClass("scrolling");
        } else {
            $(".sticky-header").removeClass("scrolling");
        }
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $(".brand-logo").removeClass("resize-logo");
        } else {
            $(".brand-logo").addClass("resize-logo");
        }
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            $(".sticky-header.scrolling").addClass("reveal-header");
        } else {
            $(".sticky-header.scrolling").removeClass("reveal-header");
        }
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 100) {
            $(".btn-header").addClass("givecolor");
            $(".thenav").addClass("bg-white");
            
        } else {
            $(".btn-header").removeClass("givecolor");
            $(".thenav").removeClass("bg-white");
        }
    }

    const cookieBox = document.querySelector(".cookiewrapper")
    const acceptBtn = cookieBox.querySelector(".cookie-accept-button");

    acceptBtn.onclick = () => {
        //setting cookie for 1 month, after one month it'll be expired automatically
        document.cookie = "CookieBy=Livecrowd; max-age=" + 60 * 60 * 24 * 30;
        if (document.cookie) { //if cookie is set
            cookieBox.classList.add("hide"); //hide cookie box
        } 
    }
    let checkCookie = document.cookie.indexOf("CookieBy=Livecrowd"); //checking our cookie
    //if cookie is set then hide the cookie box else show it
    checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide");


})

$(window).load(function () {
    setTimeout(function () {
        $('#loading').fadeOut(500);
    }, 600);
    setTimeout(function () {
        $('#loading').remove();
    }, 1600);
})

$(document).ready(function () {
    // Add smooth scrolling to all links
    $(".goto").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 2000, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});
