$(document).ready(function(){
  var categoryList = $("#categoryList li:contains('movie')"),
      titleText = $("#titleText");

  if(categoryList.length > 0){
    categoryList.remove();
  }

  $(function() {
    $( document ).tooltip({
      tooltipClass: "tmy-tooltip",
    });
  });
});
