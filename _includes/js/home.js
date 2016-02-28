$(document).ready(function(){
  var detailsContainer = $('#detailsContainer'),
      titleContainer = $('#titleContainer'),
      allMovieIds = $("a[id^='movieId']"),
      actorContainer = $('#actorContainer'),
      loaderHtml = '<div class="close"><i class="fa fa-times"></i></div>',
      movieId, posterSize, baseUrl, buildBackdropUrlBase, backDrop, close, title, description,
      individualActorName, actorImage, firstThree, cast, movieUrl, release, tagline, averageVote, wholeNumber;
  
  function errorCB(){
    console.log('there was an error: ', data);
  }
  
  theMovieDb.configurations.getConfiguration(getConfig, errorCB)
  
  function getConfig(data) {
    posterSize = $.parseJSON(data).images.poster_sizes.length-1,
    posterSize = $.parseJSON(data).images.poster_sizes[posterSize];
    baseUrl = $.parseJSON(data).images.base_url;
    buildBackdropUrlBase = baseUrl + 'w780';
  }
  
  allMovieIds.click(function(){
    movieId = $(this).attr("href"),
    movieId = movieId.substring(1);
    
    movieUrl = $(this).data("url");
      
    getMovie();
  });
  
  detailsContainer.hide();
    
  function getMovie(data){
      theMovieDb.movies.getById({"id":movieId}, buildMovieData, errorCB);
  }
  
  function buildMovieData(data){
//    console.log(data);
    
    backDrop = $.parseJSON(data).backdrop_path;
    backDrop = buildBackdropUrlBase + backDrop;

    title = $.parseJSON(data).title;
    release = $.parseJSON(data).release_date;
    tagline = $.parseJSON(data).tagline;
    description = $.parseJSON(data).overview;
    
    averageVote = $.parseJSON(data).vote_average;
    
    detailsContainer.html('<div class="loader"><i class="fa fa-circle-o-notch fa-spin"></i></div>');
    detailsContainer.html( loaderHtml + 
                          '<div class="overlay"></div>' +
                          '<div id="movieDetails" class="selected-content">' +
                          '<div class="selected-title">' + title + '</div>' +
                          '<div class="selected-tagline"><h2>' + tagline + '</h2></div>' +
                          '<div class="selected-info">Release Date: <span class="release">' + release + '</span></div>' + 
                          '<div id="popularVote" class="popular-vote">Popular Vote: </div>' +
                          '<div class="selected-description">' + description + '</div>' +
                          '</div>' +
                          '<img id="backDropImage" src=' + backDrop + '/>' +
                          '<p class="see-more"><a href="' + movieUrl + '">See Review <i class="fa fa-angle-double-right"></i></a></p>');
    
    $('#backDropImage').Vague({
        intensity: 5,
        forceSVGUrl: false
    }).blur()
    
    addCast();
    addPopularVote();
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
  
  function addPopularVote(){
    // average voting stars
    averageVote = Math.round(averageVote*2)/2;
    
    if(averageVote % 1 != 0){
      wholeNumber = Math.floor(averageVote);
      for (i = 0; i < wholeNumber/2; ++i) {
        $('#popularVote').append('<i class="fa fa-star"></i> ');
      }
      $('#popularVote').append('<i class="fa fa-star-half-o"></i>');
      
    } else {
      wholeNumber = Math.floor(averageVote);
      for (i = 0; i < wholeNumber/2; ++i) {
        $('#popularVote').append('<i class="fa fa-star"></i> ');
      }
    }
  }
  
  function enableClose(){
    $('.close').click(function(){
      detailsContainer.html('');
      detailsContainer.hide();
    }); 
  }
    
});

$(window).load(function(){
  var allMovieIds = $("a[id^='movieId']");
  function setDefaultFirst(){
    allMovieIds.first().trigger('click');
  };
  setDefaultFirst();
});