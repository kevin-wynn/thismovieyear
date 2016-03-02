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
      menu.slideDown("slow");
      
      console.log($(this).find('.fa').attr('class').indexOf('down'));
      
      if ($(this).find('.fa').attr('class').indexOf('down') > -1) {
        console.log('hi');
        $(this).find('.fa').removeClass('fa-angle-down');
        $(this).find('.fa').addClass('fa-angle-up');
        console.log($(this).find('.fa').attr('class'));
      }
    } else {
      toggle.attr('data-toggle', 'closed');
      menu.slideUp("slow");
      
      if ($(this).find('.fa').attr('class').indexOf('up') > -1) {
        console.log('hello');
        $(this).find('.fa').removeClass('fa-angle-up');
        $(this).find('.fa').addClass('fa-angle-down');
        console.log($(this).find('.fa').attr('class'));
      }
    }
  });
});