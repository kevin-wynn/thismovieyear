$(document).ready(function(){
  var toggle = $('.dropdown-toggle'),
      state = toggle.attr('data-toggle'),
      menu = $('.dropdown-menu');
  
  // set initial state of menu with data-toggle
  if (state == 'closed') {
    menu.hide();
  } else {
    menu.show();
  }
  
  // interaction model to control toggling
  toggle.click(function(){    
    if($(this).attr('data-toggle') == 'closed'){
      toggle.attr('data-toggle', 'expanded');
      $(this).siblings(menu).slideDown("slow");

      if ($(this).find('.fa').attr('class').indexOf('down') > -1) {
        $(this).find('.fa').removeClass('fa-angle-down');
        $(this).find('.fa').addClass('fa-angle-up');
      }
    } else {
      toggle.attr('data-toggle', 'closed');
      $(this).siblings(menu).slideUp("slow");
      
      if ($(this).find('.fa').attr('class').indexOf('up') > -1) {
        $(this).find('.fa').removeClass('fa-angle-up');
        $(this).find('.fa').addClass('fa-angle-down');
      }
    }
  });
});