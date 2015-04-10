(function(){

  
  /*    
        jQuery Setup                                                           
  ************************************************************************/ 
  jQuery.ajaxSetup({
    cache: true
  });

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
    
    //Material Ripples
    $.material.ripples();
    
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
    }

    function scrollPage() {
      scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
      didScroll = false;
    }

    scrollFn();
    
    var $buttons = $( '.morph-button' );
    
    $buttons.each(function(){
      var el = this;

      new UIMorphingButton( el, {
        closeEl : '.icon-close',
        onBeforeOpen : function() {
          // don't allow to scroll
          noScroll();
          // hide header if it's in the way
          var $header = $("header.peakaboo.mini");
          if($(el).offset().top <= ($header.offset().top+$header.height())){
            $header.animate({"top":"-100px"},150,'easeInQuad');
          }
          
          // var content = $(el).find('.current .inner>.data').data('content'),
          //     $inner = $(el).find('.current section .content>.inner');
          // $inner.html(content);

          // add color to close button
          var parent_color_class = $(el).parent('.post').attr('class').replace('post','').trim();
          $(".btn-close").addClass(parent_color_class);
          
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
            window.location.hash = '/'+id;
          }
          
          //ajax content
          $(el).find(".content-style-overlay").removeClass("loaded");
          
          var self = this;
          var id = $(el).attr('data-id');
          
          self.loadbar.go( 10 );
          
          if(!self.postCache[id]){
            $.get('/blog/'+ id, function(data){
              self.postCache[id] = data;
              
              var html = $.parseHTML(data),
              $current = $(html).find("article.current").html(),
              $next = $(html).find("article.next").html();
              
              $(".page.current").html($current);
              $(".page.next").html($next);
              $(el).find(".content-style-overlay").addClass("loaded");
              self.loadbar.go( 100 );
            });
          }
          else{
            var cached = $.parseHTML(self.postCache[id]),
                $cached_current = $(cached).find("article.current"),
                $cached_next = $(cached).find("article.next");
            $(".page.current").html($cached_current);
            $(".page.next").html($cached_next);
            self.loadbar.go( 100 );
            $(el).find(".content-style-overlay").addClass("loaded");
          }
          
          
          //show close button
          $(".btn-close").removeClass('hide');
        },
        onBeforeClose : function() {
          // remove class "noscroll" to body
          classie.removeClass( document.body, 'noscroll' );
          // remove scroll class from main el
          classie.removeClass( el, 'scroll' );
          // don't allow to scroll
          noScroll();
          
          //hide close button
          $(".btn-close").addClass('hide');
        },
        onAfterClose : function() {
          // can scroll again
          canScroll();
          $("header.peakaboo.mini").animate({"top":"0"},150,'easeOutQuad');
          window.location.hash = '/';
          
          $(".page.current").html('');
          $(".page.next").html('');
          
          //remove color class from close button
          var parent_class = $(el).parent('.post').attr('class');
          $(".btn-close").removeClass(parent_class);

        }
      });
    });
    
    $(window).on('popstate', function(e){
      
      if( !history.state || self.initialLoad ){
        self.initialLoad = false;
        return;
      }

      console.log(window.location.hash);
      
      var hash = window.location.hash;
      hash = hash.replace('#/','');
      
      if(hash!==''){
        $(".morph-button-overlay.active .icon-close").click();
      }
      
    });
    
    $(document).ready(function(){
      var hash = window.location.hash;
      hash = hash.replace('#/','');
      if(hash!==''){
        $selected = $(".morph-button[data-id="+hash+"] button");
        $selected.click();
      }
      else{
        window.location.hash = '/';
      }
      
      $(".btn-close").on('click',function(evt){
        evt.preventDefault();
        $(".morph-button-overlay.active .icon-close").click(); 
      });
      
      var options = {
        bg: '#5CE424',
        
        id: 'mynano'
      };
      
      var loadbar = new Nanobar( options );
      
      $(document).on('click','.next header',function(){
        var $this = $(this);
        var id = $this.attr('data-id');
        
        var $current = $this.parent().siblings(".current");

        loadbar.go( 10 );
        
        $current.find("header, section").css({"transform-origin":"50% 0"}).animate({"opacity": "0.2","transform":"translateY(100%) scaleX(0.5) scaleY(0.5)"},800);
        $this.css({"height":"100vh"});
        $current.slideUp(500,function(){
          var $self = $(this);
          $.get('/blog/'+ id, function(data){
            
            var html = $.parseHTML(data),
            $current = $(html).find("article.current").html(),
            $next = $(html).find("article.next").html();
            $this.css("height",'');
            $self.show();
            $(".page.current").html($current);
            $(".page.next").html($next);
            $(".content-style-overlay").addClass("loaded");
            loadbar.go( 100 );
            
            var stateObj = { post: id };
            history.pushState(stateObj, "", "#/"+id);
          });
        });
      });
      
    });
  })();
  
})(this);
