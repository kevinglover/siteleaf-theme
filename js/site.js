(function(){

  function colorToHex(color) {
      if (color.substr(0, 1) === '#') {
          return color;
      }
      var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

      var red = parseInt(digits[2]);
      var green = parseInt(digits[3]);
      var blue = parseInt(digits[4]);
      var rgb = blue | (green << 8) | (red << 16);
      rgb = rgb.toString(16);
      if (rgb.length<6){
        return digits[1] + '#00' + rgb;
      }
      return digits[1] + '#' + rgb;
  }
  
  // Init Selectize 
  $(function() {
    var options = {
      onDropdownOpen: function () {
          $(".selectize-dropdown").hide().slideToggle(250,'easeOutQuad');
      },
      onDropdownClose: function () {
          $(".selectize-dropdown").show().slideToggle(250,'easeInQuad');
      }
    };
    
    $('select').selectize(options);
  });
  
  // Init Peakaboo 
  $(function() {
    
    var $peakaboo = $("header.peakaboo"),
        offset = $peakaboo.offset().top,
        $mini = $peakaboo.clone().addClass('mini');
        
        var $h1 = $mini.find('h1');
        $h1.after($("<span/>").attr({'class':$h1.attr('class')}).html($h1.html()));
        $h1.remove();
        
        $mini.insertAfter($peakaboo);
    
    var scrollTimer = null;
    $(window).scroll(function () {
        handleScroll();
    });

   function handleScroll(){
      var scrollBP = offset + $peakaboo.height()*0.75;
      var scrollTop = $(this).scrollTop();
      if (scrollTop > scrollBP){
        $mini.css({'display':'block'});
        $peakaboo.addClass('p-hidden');
      }
      else{
        $mini.css({'display':'none'});
        $peakaboo.removeClass('p-hidden');
      }
      
      if (scrollTop > (scrollBP + $peakaboo.height()) ){
        $mini.addClass('shadow');
      }
      else{
        $mini.removeClass('shadow');
      }
    }
  });
  
  $(function(){
    $(document).ready(function(){
      var url = window.location.pathname,
          $logo = $("a.logo");
      if($logo.attr('href') == url){
        $logo.on('click',function(evt){
          evt.preventDefault();
          $("html, body").animate({scrollTop:0},500, 'easeInQuad');
        });
      }
    });
  });
  
  //Init expandable content
  (function() {	
    var docElem = window.document.documentElement, didScroll, scrollPosition;

    // trick to prevent scrolling when opening/closing button
    function noScrollFn() {
      window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
    }

    function noScroll() {
      window.removeEventListener( 'scroll', scrollHandler );
      window.addEventListener( 'scroll', noScrollFn );
    }

    function scrollFn() {
      window.addEventListener( 'scroll', scrollHandler );
    }

    function canScroll() {
      window.removeEventListener( 'scroll', noScrollFn );
      scrollFn();
    }

    function scrollHandler() {
      if( !didScroll ) {
        didScroll = true;
        setTimeout( function() { scrollPage(); }, 60 );
      }
    };

    function scrollPage() {
      scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
      didScroll = false;
    };

    scrollFn();
    
    var $buttons = $( '.morph-button' );
    
    $buttons.each(function(){
      var el = this;

      new UIMorphingButton( el, {
        closeEl : '.icon-close',
        onBeforeOpen : function() {
          // don't allow to scroll
          noScroll();
          var $header = $("header.peakaboo.mini");
          if($(el).offset().top <= ($header.offset().top+$header.height())){
            $header.animate({"top":"-100px"},150,'easeInQuad');
          }
        },
        onAfterOpen : function() {
          // can scroll again
          canScroll();
          // add class "noscroll" to body
          classie.addClass( document.body, 'noscroll' );
          // add scroll class to main el
          classie.addClass( el, 'scroll' );
          var id = $(el).attr('data-id');
          if(id){
            window.location.hash = id;
          }
        },
        onBeforeClose : function() {
          // remove class "noscroll" to body
          classie.removeClass( document.body, 'noscroll' );
          // remove scroll class from main el
          classie.removeClass( el, 'scroll' );
          // don't allow to scroll
          noScroll();
        },
        onAfterClose : function() {
          // can scroll again
          canScroll();
          $("header.peakaboo.mini").animate({"top":"0"},150,'easeOutQuad');
          window.location.hash = '';
        }
      });
    });
    
    $(document).ready(function(){
      var hash = window.location.hash;
      hash = hash.replace('#','');
      if(hash!==''){
        $selected = $(".morph-button[data-id="+hash+"] button");
        $selected.click();
      }
      else{
        window.location.hash = '';
      }
    });
  })();
  
})(this);
