$(document).ready(function(){
//   var movieId ="{% for post in site.posts %}{% if post.movie_id != nil %}{{ post.movie_id }},{% endif %}{% endfor %}",
//       movieIds = movieId.split(','),
//       movieIds = movieIds.filter(Boolean),
//       movieIds = movieIds.splice(0,8),
//       score ="{% for post in site.posts %}{% if post.score != nil %}{{ post.score }},{% endif %}{% endfor %}",
//       scores = score.split(','),
//       scores = scores.filter(Boolean),
//       scores = scores.splice(0,8),
//       link ="{% for post in site.categories.movie %}{{ post.url | prepend: site.baseurl }},{% endfor %}",
//       links = link.split(','),
//       links = links.splice(0,8),
//       movieContainer = $("#movieContainer"),
//       posterContainer = $("#posterContainer"),
//       movieRelease = $("#movieRelease"),
//       movieTitle = $("#movieTitle"),
//       interiorBackdrop = $('#interiorBackdrop'),
//       activePanel = $("#activePanel"),
//       baseUrl, releaseDate, title, wave, rating, baseUrlBackdrop, backdropPath, clickedId, posterItemCount,
//       movies = [],
//       functionCalls = 0;
//
//   function errorCB(data) { console.log("Error callback: " + data); };
//
//   theMovieDb.configurations.getConfiguration(buildPosterBaseUrl, errorCB);
//
//   function buildPosterBaseUrl(data) {
//     baseUrl = $.parseJSON(data).images.base_url;
//     baseUrlPoster = baseUrl + 'w300';
//     baseUrlBackdrop = baseUrl + 'w500';
//     buildMovies();
//   }
//
//   function buildMovies(data) {
//     for (i = 0; i < movieIds.length; ++i) {
//       theMovieDb.movies.getById({"id":movieIds[i] }, function(data){
//         wave = functionCalls++
//         title = [$.parseJSON(data).original_title];
//         overview = [$.parseJSON(data).overview];
//         posterPath = baseUrlPoster + [$.parseJSON(data).poster_path];
//         backdropPath = baseUrlBackdrop + [$.parseJSON(data).poster_path];
//         releaseDate = [$.parseJSON(data).release_date];
//         releaseDate = $.format.date( releaseDate + "10:00:00.00", "MMMM D, yyyy");
//         movieLink = title[0].replace(/ /g,'');
//
//         interiorBackdrop.append('<li><img src="' + backdropPath + '"></li>');
//
//         movieContainer.append('<div id="' + movieIds[wave] + '" class="posterItem col-md-3 poster-container"><div class="poster">' +
//         '<img src=' + posterPath + '/>' + '</div>' +
//         '<h2 class="title">' + title + '</h2>' +
//         '<div>' + releaseDate + '</div>' + '<p class="score">' +
//         '</p>' + '</div>');
//       }, errorCB);
//
//     }
//
//     function setActiveItemDefault(data) {
//       activePanel.append('<div class="col-md-6 nopadding"><img src="' + backdropPath + '"></div>' +
//         '<div class="col-md-6"><h2>' + title + '</h2><p class="release-date">' + releaseDate + '</p>' +
//         '<h3>' + overview + '</h3></div>'
//       );
//     }
//   }
});
