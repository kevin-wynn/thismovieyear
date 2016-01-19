// $(window).load(function() {
//     var movieId ="{% for post in site.categories[page.category] %}{% if forloop.last == true %}{{ post.movie_id }}{% else %}{{ post.movie_id }},{% endif %}{% endfor %}",
//         movieIds = movieId.split(','),
//         movieIds = movieIds.filter(Boolean),
//         idLength = movieIds.length,
//         posterContainer = $("div[id^='posterContainer']"),
//         interiorBackdrop = $('#interiorBackdrop'),
//         movieRelease = $("div[id^='movieRelease']"),
//         baseUrl, posterSize, posterSizeOriginal,
//         posterUrls = '',
//         posterPath = '',
//         releaseDate = '',
//         finalPosterUrl = '',
//         backdropPath = '',
//         backdropUrl = '',
//         buildImageStringforHeader = '',
//         finalPosterUrlforHeader = '',
//         posterSizeFinal, posterUrlBeginning, posterPath, finalPosterUrl, i,
//         functionCalls = 0;
//
//     function successCB(data) { console.log("Success callback: " + data); };
//     function errorCB(data) { console.log("Error callback: " + data); };
//
//     theMovieDb.configurations.getConfiguration(getConfig, errorCB)
//
//     function getConfig(data) {
//       posterSize = $.parseJSON(data).images.poster_sizes.length-1,
//       posterSize = $.parseJSON(data).images.poster_sizes[posterSize];
//       baseUrl = $.parseJSON(data).images.base_url;
//       buildImageString = baseUrl + 'w300';
//       buildImageStringforHeader = baseUrl + 'original';
//
//       getMovie(data);
//     }
//
//     function getMovie(data){
//       for (i = 0; i < movieIds.length; ++i) {
//         theMovieDb.movies.getById({"id":movieIds[i] }, buildMovieData, errorCB);
//       }
//     }
//
//     function buildMovieData(data){
//       wave = functionCalls++;
//
//       if (wave+1 == movieIds.length) {
//         posterPath += [$.parseJSON(data).poster_path];
//         releaseDate += [$.parseJSON(data).release_date];
//         backdropPath += [$.parseJSON(data).backdrop_path];
//       } else {
//         posterPath += [$.parseJSON(data).poster_path] + ',';
//         releaseDate += [$.parseJSON(data).release_date] + ',';
//         backdropPath += [$.parseJSON(data).backdrop_path] + ',';
//       }
//
//       posterPath = posterPath.split(',');
//       releaseDate = releaseDate.split(',');
//       backdropPath = backdropPath.split(',');
//
//       if (functionCalls == movieIds.length) {
//
//         for (i = 0; i < posterPath.length; ++i ) {
//           if (i+1 == posterPath.length) {
//             finalPosterUrl += buildImageString + posterPath[i];
//             backdropUrl += buildImageStringforHeader + backdropPath[i];
//           } else {
//             finalPosterUrl += buildImageString + posterPath[i] + ',';
//             backdropUrl += buildImageStringforHeader + backdropPath[i] + ',';
//           }
//         }
//
//         finalPosterUrl = finalPosterUrl.split(',');
//         backdropUrl = backdropUrl.split(',');
//
//         interiorBackdrop.css({'background-image':'url(' + backdropUrl[0] + ')'});
//         $('.loading').remove();
//
//         for (i = 0; i < posterContainer.length; ++i) {
//           releaseDate[i] = $.format.date( releaseDate[i] + "10:00:00.00", "MMMM D, yyyy");
//           posterContainer[i].innerHTML = '<img src=' + finalPosterUrl[i] + '/>'
//           movieRelease[i].innerHTML = releaseDate[i];
//         }
//
//       }
//     }
//   });
