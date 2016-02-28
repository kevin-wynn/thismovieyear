$(document).ready(function(){
  var detailsContainer = $('#detailsContainer'),
      titleContainer = $('#titleContainer'),
      allMovieIds = $("a[id^='movieId']"),
      actorContainer = $('#actorContainer'),
      loaderHtml = '<div class="close"><i class="fa fa-times"></i></div>',
      movieId, posterSize, baseUrl, buildBackdropUrlBase, backDrop, close, title, description,
      individualActorName, actorImage, firstThree, cast;
  
  function errorCB(){
    console.log('there was an error: ', data);
  }
  
  theMovieDb.configurations.getConfiguration(getConfig, errorCB)
  
  function getConfig(data) {
//    console.log(data);
    
    posterSize = $.parseJSON(data).images.poster_sizes.length-1,
    posterSize = $.parseJSON(data).images.poster_sizes[posterSize];
    baseUrl = $.parseJSON(data).images.base_url;
    buildBackdropUrlBase = baseUrl + 'w780';
  }

  
  allMovieIds.click(function(){
    movieId = $(this).attr("href"),
    movieId = movieId.substring(1);
    getMovie();
  });
  
  detailsContainer.hide();
    
  function getMovie(data){
      theMovieDb.movies.getById({"id":movieId}, buildMovieData, errorCB);
  }
  
  function buildMovieData(data){
    console.log(data);
    
    backDrop = $.parseJSON(data).backdrop_path;
    backDrop = buildBackdropUrlBase + backDrop;

    title = $.parseJSON(data).title;
    
    description = $.parseJSON(data).overview;
    
    detailsContainer.html('<div class="loader"><i class="fa fa-circle-o-notch fa-spin"></i></div>');
    detailsContainer.html( loaderHtml + 
                          '<div class="overlay"></div>' +
                          '<div id="movieDetails" class="selected-content">' +
                          '<div class="selected-title">' + title + '</div>' +
                          '<div class="selected-description">' + description + '</div>' +
                          '</div>' +
                          '<img id="backDropImage" src=' + backDrop + '/>');
    
    $('#backDropImage').Vague({
        intensity: 5,
        forceSVGUrl: false
    }).blur()
    
    addCast();
    enableClose();
  }
  
  function addCast() {
    var movieDetails = $('#movieDetails');
    
    theMovieDb.movies.getCredits({"id": movieId }, function(data){
      cast = $.parseJSON(data).cast,
      firstThree = cast.splice(0,3);

      for(i = 0; i < firstThree.length; ++i) {
        if(firstThree[i].profile_path != null){
          individualActorName = firstThree[i].name,
          actorImage = baseUrl + '/w300' + firstThree[i].profile_path;
          
          movieDetails.append('<div class="actor-block"><div class="actor-image"><img src="' + actorImage + '"/></div><div class="actor-name">' + individualActorName + '</div></div>');
        } else {
          individualActorName = firstThree[i].name;
          movieDetails.append('<div class="actor-block"><div class="actor-image"><img class="no-actor" src="/assets/images/no-actor.jpg"/></div><div class="actor-name">' + individualActorName + '</div></div>');
        }
      }
    }, errorCB);
    
    detailsContainer.show();
  }
  
  function enableClose(){
    $('.close').click(function(){
      detailsContainer.html('');
      detailsContainer.hide();
    }); 
  }
    
});