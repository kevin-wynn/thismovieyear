$(document).ready(function(){
  var categoryList = $("#categoryList li:contains('movie')"),
      titleText = $("#titleText"),
      posterContainer = $(".posters"),
      resultsContainer = $("#results-container"),
      searchInput = $("#search-input"),
      searchResults = $('.search-results');

  if(categoryList.length > 0){
    categoryList.remove();
  }

  searchResults.hide();

  searchInput.keyup(function(){
    if(searchInput.val().length === 0) {
      searchResults.hide();
    } else {
      searchResults.show();
    }
  })
});
