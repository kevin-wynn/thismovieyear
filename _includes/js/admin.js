/*  ERROR REPORTING
 *
 *  esc key will only clear and go back to the original results on the first item in the group
 *
 */

$(function() {

  // set default focus on search input
  $("input:text:visible:first").focus();

  // define global page variables
  var submitButton = $('#searchButton'),
      resultsContainer = $('#resultsContainer'),
      searchBox = $('#searchBox'),
      url = 'http://api.themoviedb.org/3/',
      movie = 'search/movie?query=',
      key = '&api_key=ff47119f9629ccfa68c832ccc6b470ef',
      actorsAll = '',
      actorImageAll = '',
      categoryNames = '',
      functionCalls = 0,
      categoryWave = 0,
      woop = 0,
      movieName, baseUrl, posterUrl, posterSize, length, movieData, posterPath, overview, releaseDate, cast, firstThree, id, errorCB,
      individualActorName, actorContainer, posterWidth, posterHeight, img, actorImage, scoreNumber, article, saveData, categories,
      posterUrlContainer, posterBackdrop, posterBackdropUrl, backdropContainer, releaseDateFinal, movieNameContainer, genres, movieNameforPost;

  // define success and error callback functions
  function successCB(data) { console.log("Success callback: " + data); };
  function errorCB(data) { console.log("Error callback: " + data); };

  // get config from tMDB
  theMovieDb.configurations.getConfiguration(getConfig, errorCB)
  function getConfig(data) {
    posterSize = $.parseJSON(data).images.poster_sizes;
    baseUrl = $.parseJSON(data).images.base_url.slice(0,-1);
  }

  // set enter key to search button
  $(document).keypress(function(e) {
    if(e.which == 13) {
      resultsContainer.html('');
      getResults();
    }
  });

  submitButton.click(function() {
    resultsContainer.html('');
    getResults();
  });

  $(document).keydown(function(e) {
    if (e.which == 27) {
      if ($('#actorContainer:visible').length) {
        var searchValue = searchBox.val();
        searchBox.val(searchValue);
        resultsContainer.html('');
        actorContainer.html('');
        posterContainer.html('');
        getResults();
        $("input:text:visible:first").focus();
      } else {
        resultsContainer.html('');
        $("input:text:visible:first").focus();
      }
    }
  });

  // get results and build out all posters
  function getResults() {
    var searchResult = searchBox.val();

    theMovieDb.search.getMovie({"query":searchResult}, function(data){
      length = $.parseJSON(data).total_results;
      // FOR NOW TEMPORARY FIX JUST LIMIT TO ONE PAGE
      if (length > 20) {
        length = 20
      }
      // TODO: need to make this paginate or infinite scroll multiple pages
      //       20 results per page
      //       console.log(data);
      //       console.log(length);
      for(i=0; i < length; ++i) {
        categories = $.parseJSON(data).results[i].genre_ids,
        movieData = $.parseJSON(data).results[i],
        movieId = $.parseJSON(data).results[i].id,
        movieName = $.parseJSON(data).results[i].original_title,
        posterPath = $.parseJSON(data).results[i].poster_path,
        posterUrl = baseUrl + '/w500' + posterPath,
        overview = $.parseJSON(data).results[i].overview,
        releaseDate = $.parseJSON(data).results[i].release_date,
        posterBackdrop = $.parseJSON(data).results[i].backdrop_path,
        posterBackdropUrl = baseUrl + '/original' + posterBackdrop;

        if (posterPath != null && categories != '') {
          resultsContainer.append('<div id="posterContainer" class="' + movieId + '"><div class="col-md-3 poster-item">' +
          '<img id="posterUrlContainer" src=' + posterUrl + '/></div>' +
          '<div class="poster-text col-md-9"><h2 data-title="' + movieName + '">' + movieName + '<div class="rating"></div></h2><p data-release-date="' + releaseDate + '">' + releaseDate + ' - ' + movieId + '</p>' +
          '<p data-categories="' + categories + '">' + categories + '</p><p id="overview" data-overview="' + overview + '">' + overview + '</p>' +
          '<div id="actorContainer"></div>' + '<div id="saveContainer"></div>' +
          '<div class="undo">Undo</div></div><div id="backdropContainer" data-backdrop="' + posterBackdropUrl + '"></div></div>');
        } else {
          resultsContainer.append('<div id="posterContainer"><div class="col-md-3 poster-item"><div class="no-image-found">No Image Found</div></div></div>');
        }

        if (i+1 == length) {
          onClickClass(data);
        }

      }
    }, errorCB)
  }

  // set up interactions with clicking on a movie poster
  function onClickClass(data) {
    var actorContainer = $('[id=actorContainer]'),
        posterContainer = $("[id=posterContainer]"),
        saveContainer = $('[id=saveContainer]'),
        backdropContainer = '#backdropContainer';

    // set up click interaction function
    $("[id=posterContainer]").on('click', function(){
      theMovieDb.genres.getList({}, buildCategories, errorCB);

      backdropData = $(this).find(backdropContainer).data('backdrop');

      id = $(this).attr('class');

      // clear old values if clicking multiple posters
      actorContainer.html('');
      categoryNames = '';
      $(this).find(backdropContainer).css('background-image', '');

      $("[id=posterContainer]").removeClass('selected');
      $(this).addClass('selected');
      $("[id=posterContainer]").not(this).addClass('hidden');

      // set poster container to have backdrop image included
      // then use vague.js to blur it
      $(this).find(backdropContainer).css('background-image', 'url(' + backdropData + ')').Vague({
          intensity: 1,
          forceSVGUrl: false
      }).blur()

      var selected = $(this).find('.poster-text');
      selected.show();

      $('.undo').click(function() {
        var searchValue = searchBox.val();
        searchBox.val(searchValue);
        resultsContainer.html('');
        actorContainer.html('');
        $("[id=posterContainer]").removeClass('selected', 'hidden');
        getResults();
      })

      theMovieDb.movies.getCredits({"id": id }, function(data){
        cast = $.parseJSON(data).cast,
        firstThree = cast.splice(0,3);

        for(i = 0; i < firstThree.length; ++i) {
          if(firstThree[i].profile_path != null){
            individualActorName = firstThree[i].name,
            actorImage = baseUrl + '/w300' + firstThree[i].profile_path;
            actorContainer.append('<div class="col-md-2 actor-block"><div class="actor-image"><img src="' + actorImage + '"/></div><div class="actor-name">' + individualActorName + '</div></div>');
          } else {
            individualActorName = firstThree[i].name;
            actorContainer.append('<div class="col-md-2 actor-block"><div class="actor-image"><img class="no-actor" src="/assets/images/no-actor.jpg"/></div><div class="actor-name">' + individualActorName + '</div></div>');
          }
        }
      }, errorCB)
    });

    $('.rating').raty({
      number: 5,
      hints: ['','','','',''],
    });

    $('.fa').on('click', function(){
      getScore();
    })

    function getScore(){
      scoreNumber = $('.selected .poster-text .rating input').val()
      saveContainer.html('<div class="save-button">Save</div>');
    }

    function buildCategories(data){
      data = $.parseJSON(data).genres,
      categories = $('.selected').find('[data-categories]').data('categories'),
      categories = categories.toString(),
      categories = categories.split(',');
      for (i = 0; i < categories.length; ++i) {
        wave = functionCalls++;
        genres = data.filter(function (name) { return name.id == categories[i] });
        if (wave + 1 == categories.length) {
          categoryNames += '- ' + genres[0].name;
            saveContainer.click(function(){
              setTimeout(function(){
                id = id.replace( /[^\d.]/g, '' );
                theMovieDb.movies.getCredits({"id": id }, buildSaveData, errorCB);
              }, 10);
            });
        } else {
          categoryNames += '- ' + genres[0].name + '\n';
        }
      }

      function buildSaveData(data){
        wave = 0,
        functionCalls = 0,
        actorsAll = '',
        actorImageAll = '',
        releaseDateFinal = '',
        cast = $.parseJSON(data).cast,
        firstThree = cast.splice(0,3);

        for(i = 0; i < firstThree.length; ++i) {
          wave = functionCalls++;
          actorImage = baseUrl + '/w300' + firstThree[i].profile_path;
          individualActorName = firstThree[i].name;
          if (wave+1 == firstThree.length ) {
            actorsAll += '- ' + individualActorName;
            actorImageAll += '- ' + actorImage;
            saveStuff();
          } else {
            actorsAll += '- ' + individualActorName + '\n';
            actorImageAll += '- ' + actorImage + '\n';
          }
        };

        function saveStuff(){
            article = $('.selected').find('[data-overview]').html();
            article = article.replace(":", ",");
            posterUrlContainer = $('.selected').find('#posterUrlContainer').attr('src');
            backdropData = $('.selected').find('#backdropContainer').data('backdrop');
            releaseDateFinal = $('.selected').find('[data-release-date]').data('release-date');
            releaseDateFinalPretty = $.format.date( releaseDateFinal + "10:00:00.00", "MMMM D, yyyy");
            movieNameContainer = $('.selected').find('[data-title]').data('title'),
            movieNameforPost = movieNameContainer.replace(/\s+/g, '-').toLowerCase();

            saveData = '---' + '\n' +
            'layout: post' + '\n' +
            'title: "' + movieNameContainer + '"' + '\n' +
            'id: ' + movieId + '\n' +
            'date: ' + releaseDateFinalPretty + '\n' +
            'score: ' + scoreNumber + '\n' +
            'category: ' + '\n' +
            '- movie' + '\n' +
            categoryNames +
            'actors: \n' + actorsAll + '\n' +
            'actorsImages: \n' + actorImageAll + '\n' +
            'overview: ' + article + '\n' +
            'poster: ' + posterUrlContainer + '\n' +
            'backdrop: ' + backdropData + '\n' +
            '---';

            console.log(saveData);
          
            var d = new Date();

            var month = d.getMonth()+1;
            var day = d.getDate();

            var todaysDate = d.getFullYear() + '-' +
                (month<10 ? '0' : '') + month + '-' +
                (day<10 ? '0' : '') + day;

            // save file locally
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:attachment/text,' + encodeURI(saveData);
            hiddenElement.target = '_blank';
            hiddenElement.download = todaysDate + '-' + movieNameforPost + '.markdown';
            hiddenElement.click();
        }
      }

    }
  }
});
