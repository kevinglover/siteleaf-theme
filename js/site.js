(function(){

  $(function(){
    var $body = $("body"),
        $post = $("#post-content"),
        $content = $("#post-content .content");
        $items = $(".posts .post a");
    
    $items
    .addClass('withripple')
    .on('click.colorize',function(evt){
      evt.preventDefault();
      var $this = $(this),
          $ripples = $this.find(".ripple"),
          $parent = $(this).closest('.diamond-box-wrap'),
          background = $this.closest(".post").css('background-color'),
          text = $this.attr('data-content');
      if (background =='rgba(0, 0, 0, 0)' || background == 'transparent'){
        background = $this.css('color');
      }
      $ripples.css({'background-color':background});
      $ripples.not(":first").remove();
      if(!$parent.hasClass('active')){
        $body.addClass('scroll-lock');
        $parent.addClass('active');
        $post.animate({"opacity":1}, 500, function(){
          $content.html(text);
          $(this).fadeIn(500);
        });
      }
    });
    // Init Material 
    $.material.init();
    
    $("#post-content .close").on("click",function(){
      var $parent = $(this).closest('.diamond-box-wrap');
      $(".active").find(".ripple").first()
      .css({'opacity':0})
      .animate({'top':0},300,
          function(){$(this).remove();
      });
      $body.removeClass('scroll-lock');
      $post.hide(500,function(){
        $(".diamond-box-wrap").removeClass('active');
      });
      $content.html("");
    });
    
    $(".diamondswrap > .post").addClass('item');
    
    $(".diamondswrap").diamonds({
        size: 240, // Size of the squares
        gap: 0, // Pixels between squares
        minDiamondsPerRow: 1
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
