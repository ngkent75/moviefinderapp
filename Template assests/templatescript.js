// script goes here
$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
    e.preventDefault();
    $(this).parents('.app-dashboard').toggleClass('shrink-medium').toggleClass('shrink-large');
  });
  //More (Expand) or Less (Collapse)
$('.categories-menu.menu.nested').each(function(){
    var filterAmount = $(this).find('li').length;
    if( filterAmount > 5){    
      $('li', this).eq(4).nextAll().hide().addClass('toggleable');
      $(this).append('<li class="more">More</li>');    
    }  
  });
  
  $('.categories-menu.menu.nested').on('click','.more', function(){
    if( $(this).hasClass('less') ){    
      $(this).text('More').removeClass('less');    
    }else{
      $(this).text('Less').addClass('less'); 
    }
    $(this).siblings('li.toggleable').slideToggle(); 
  }); 
  
  
  
  