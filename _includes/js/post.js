// $(window).load(function() {
//   var movieId = "{{page.movie_id}}",
//       posterContainer = $('#posterContainer'),
//       releaseYearContainer = $('#releaseYearContainer'),
//       movieOverview = $('#movieOverview'),
//       actorContainer = $('#actorContainer'),
//       interiorBackdrop = $('#interiorBackdrop'),
//       tagLine = $('#tagLine'),
//       baseUrl = '',
//       posterSize, posterSizeOriginal, movieTagLine,
//       posterSizeFinal, posterUrlBeginning, posterPath, finalPosterUrl,
//       releaseDate, fullCast, firstThree, buildProfileImage;
//
//   function successCB(data) { console.log("Success callback: " + data); };
//   function errorCB(data) { console.log("Error callback: " + data); };
//
//   theMovieDb.configurations.getConfiguration(getConfig, errorCB)
//   theMovieDb.movies.getById({"id": movieId }, getInfo, errorCB)
//
//   function getConfig(data) {
//     posterSize = $.parseJSON(data).images.poster_sizes;
//     baseUrl = $.parseJSON(data).images.base_url.slice(0,-1);
//     getPoster(data);
//   }
//
//   function getPoster(data){
//     posterSize = $.parseJSON(data).images.poster_sizes;
//     posterSizeOriginal = posterSize.length-1;
//     posterSizeFinal = posterSize[posterSizeOriginal];
//     baseUrl = $.parseJSON(data).images.base_url;
//     posterUrlBeginning = baseUrl + posterSizeFinal;
//     theMovieDb.movies.getById({"id":movieId }, setPoster, errorCB);
//   }
//
//   function setPoster(data){
//     posterPath = $.parseJSON(data).poster_path;
//     movieTagLine = $.parseJSON(data).tagline;
//     finalPosterUrl = baseUrl + posterSizeFinal + posterPath,
//     backdropPath = $.parseJSON(data).backdrop_path,
//     finalBackdropPath = baseUrl + 'w1000' + backdropPath,
//     posterContainer.html('<img src=' + finalPosterUrl + '/>');
//     interiorBackdrop.css({'background-image':'url(' + finalBackdropPath + ')'});
//     tagLine.html(movieTagLine);
//   }
//
//   function getInfo(data){
//     releaseDate = $.parseJSON(data).release_date;
//     releaseYear = releaseDate.substring(0, 4);
//     releaseYearContainer.append(releaseYear);
//
//     overview = $.parseJSON(data).overview;
//     movieOverview.append(overview);
//
//     theMovieDb.movies.getCredits({"id":movieId }, getCredits, errorCB)
//   }
//
//   function getCredits(data){
//     fullCast = $.parseJSON(data).cast,
//     firstThree = $(fullCast).slice(0,3);
//
//     for (i = 0; i < firstThree.length; ++i) {
//       if(firstThree[i].profile_path != null) {
//         var buildProfileImage = baseUrl + 'w300' + firstThree[i].profile_path,
//             individualActorName = firstThree[i].name;
//
//         actorContainer.append(
//           '<div class="actor-details">' +
//           '<div class="actor-image"><img src=' + buildProfileImage + '/></div>' +
//           '<div class="actor-info">' + individualActorName + '</div>' +
//           '</div>'
//         )
//       } else {
//         var individualActorName = firstThree[i].name;
//
//         actorContainer.append(
//           '<div class="actor-details">' +
//           '<div class="actor-image"></div>' +
//           '<div class="actor-info">' + individualActorName + '</div>' +
//           '</div>'
//         )
//       }
//     }
//   }
// });
