$(document).ready(function(){
  console.log('123123');


  var $body = $('body');
  var $header = $('.header');
  var $navBtn = $('#navBtn');
  var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
  var isChrome = /Chrome/i.test(navigator.userAgent);
  var mq = $(window).width() < 1023;
  var $main = $('.main');

  $navBtn.click(function(){
    $header.toggleClass('is-open');
    $body.toggleClass('fixed');
  });

  function detectBrowser(){
    if (isSafari) {
      $body.addClass('isIos');
    } else if ((isChrome) && (mq)) {
      $body.addClass('isChrome');
    }
  }
  detectBrowser();

  function fullHeightBanner() {
    if ($body.hasClass('isChrome')) {
      $main.css({ height: window.innerHeight });
    }
  }
  fullHeightBanner();

});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});
