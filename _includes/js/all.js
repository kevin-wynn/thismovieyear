// $(document).ready(function(){
//   var movieId ="{% for post in site.posts %}{% if post.movie_id != nil %}{{ post.movie_id }},{% endif %}{% endfor %}",
//       movieIds = movieId.split(','),
//       movieIds = movieIds.filter(Boolean),
//       score ="{% for post in site.posts %}{% if post.score != nil %}{{ post.score }},{% endif %}{% endfor %}",
//       scores = score.split(','),
//       scores = scores.filter(Boolean),
//       link ="{% for post in site.categories.movie %}{{ post.url | prepend: site.baseurl }},{% endfor %}",
//       links = link.split(','),
//       movieContainer = $("#movieContainer"),
//       posterContainer = $("#posterContainer"),
//       movieRelease = $("#movieRelease"),
//       movieTitle = $("#movieTitle"),
//       interiorBackdrop = $('#interiorBackdrop'),
//       baseUrl, releaseDate, title, wave, rating, baseUrlBackdrop, backdropPath,
//       functionCalls = 0;
//
//   function successCB(data) { console.log("Success callback: " + data); };
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
//         posterPath = baseUrlPoster + [$.parseJSON(data).poster_path];
//         backdropPath = baseUrlBackdrop + [$.parseJSON(data).poster_path];
//         releaseDate = [$.parseJSON(data).release_date];
//         releaseDate = $.format.date( releaseDate + "10:00:00.00", "MMMM D, yyyy");
//
//         if (scores[wave] == 1) {
//           rating = '<span title="One star rating, not a fan, in my opinion... Don\'t get too worked up on seeing this one." class="one"><i class="fa fa-star"></i></span>'
//         } else if (scores[wave] == 2) {
//           rating = '<span title="Two stars? Pretty good! But don\'t rush out to see it in theaters or go pay to rent this one... It\'s probably on Netflix or Prime anyways." class="two"><i class="fa fa-star"></i> <i class="fa fa-star"></i></span>'
//         } else if (scores[wave] == 3) {
//           rating = '<span title="Three stars! Hell yeah! Bust down the doors folks, this is a must see in theaters. OR - Go buy it, go rent it, whatever you gotta do, you gotta see this one!" class="three"><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i></span>'
//         }
//
//         interiorBackdrop.append('<li><img src="' + backdropPath + '"></li>');
//
//         movieContainer.append('<a class="" href="' + links[wave] + '">' +
//         '<div class="col-md-3 poster-container"><div class="col-md-12 poster">' +
//         '<img src=' + posterPath + '/>' + '</div>' +
//         '<h2 class="title">' + title + '</h2>' +
//         '<div>' + releaseDate + '</div>' + '<p class="score">' +
//         rating + '</p>' + '</div>');
//
//       }, errorCB);
//     }
//   }
// });
