(function(){
  
  
  $(function(){
    var $body = $("body"),
        $content = $("#post-content");
        
        
    $(".posts li a")
    .addClass('withripple')
    .on('click.colorize',function(evt){
      evt.preventDefault();
      var $this = $(this),
          $ripples = $this.find(".ripple"),
          $parent = $(this).closest('.diamond-box-wrap'),
          background = $this.css('background-color'),
          text = $this.html();
      
      console.log($parent);
      if (background =='rgba(0, 0, 0, 0)' || background == 'transparent'){
        background = $this.css('color');
      }
      
      $ripples.css({'background-color':background});
      $ripples.not(":first").remove();
      if($parent.hasClass('active')){
        $this.find(".ripple").first().fadeOut(300,
            function(){$(this).remove();});
        $body.removeClass('scroll-lock');
        $parent.removeClass('active');
        $content.fadeOut(400).html("");
      }
      else{
        $body.addClass('scroll-lock');
        $parent.addClass('active');
        $content.animate({"opacity":1}, 500, function(){
          $(this).fadeIn(400).html(text);
        });
      }
    });
    // Init Material 
    $.material.init();
    
    $(".diamondswrap > li").addClass('item');
    
    $(".diamondswrap").diamonds({
        size: 300, // Size of the squares
        gap: 5 // Pixels between squares
    });
    
  });
  
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
  
})(this);
