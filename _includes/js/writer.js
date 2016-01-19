$(function() {
  var saveButton = $('#saveButton'),
      moviePosterPreview = $('#moviePosterPreview'),
      movieIdInput = $('#movieId'),
      movieDetails = $('#movieDetails'),
      markDownContent, baseUrl, posterPath, movieOverview, movieName, releaseDate;

  function successCB(data) { console.log("Success callback: " + data); };
  function errorCB(data) { console.log("Error callback: " + data); };

  theMovieDb.configurations.getConfiguration(buildUrl, errorCB)

  function buildUrl(data) {
    baseUrl = $.parseJSON(data).images.base_url;
    getPosterPreview(data);
  }

  function getPosterPreview(data) {
    posterSize = $.parseJSON(data).images.poster_sizes.length-1,
    posterUrl = $.parseJSON(data).images.base_url,
    posterUrlBase = posterUrl + $.parseJSON(data).images.poster_sizes[posterSize];
  }

  function buildPosterUrl(data) {
    posterPath = $.parseJSON(data).poster_path,
    movieOverview = $.parseJSON(data).overview,
    movieName = $.parseJSON(data).original_title,
    releaseDate = $.parseJSON(data).release_date;

    finalDate = $.format.date(releaseDate + "00:00:00.000", "MMM D, yyyy")

    console.log(finalDate);

    moviePosterPreview.html('<img src="' + posterUrlBase + posterPath + '"/>');
    movieDetails.html('<h2>' + movieName + '</h2><h3>' + finalDate + '</h3><p>' + movieOverview + '</p>');
  }

  $(movieIdInput).focus(function() {
    // console.log('in');

  }).blur(function() {
    theMovieDb.movies.getById({"id": movieIdInput.val() }, buildPosterUrl, errorCB)
  });

  tinymce.init({
    selector: 'textarea',
    height: 500,
    menubar: false,
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    content_css: [
      '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
      '//www.tinymce.com/css/codepen.min.css'
    ]
  });

  saveButton.click(function() {
    markDownContent = tinyMCE.get('writerTextArea').getContent(),
    markDownContent = toMarkdown(markDownContent),

    markDownContent = '---\ntitle: "' + movieName + '"\nmovie_id: ' + movieIdInput.val() + '\n---\n' + markDownContent

    console.log(markDownContent);

    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:attachment/text,' + encodeURI(markDownContent);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'boo.txt';
    // hiddenElement.click();
  });
});
