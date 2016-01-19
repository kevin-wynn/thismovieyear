$(window).load(function() {
  var interiorBackdrop = $('#interiorBackdrop'),
      articlePoster = "{{page.article_poster}}";

      interiorBackdrop.css({'background-image':'url(' + articlePoster + ')'});
});
