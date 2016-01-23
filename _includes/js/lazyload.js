$(function() {
  var posts = $('[id=postImage]'),
      postContainer = $('#postContainer'),
      showMore = $('#showMore'),
      loadAmount = posts.length/8,
      loadAmount = Math.round(loadAmount),
      clicks = 1;

  // set up initial view of 8
  if (posts.length > 8 ) {
    posts.slice(0,8).addClass('visible');
    posts.slice(8).addClass('hidden');
  }

  // show 8 more posters on click
  showMore.on('click', function(){
    sliceStart = clicks*8;
    sliceEnd = sliceStart+8;
    posts.slice(sliceStart,sliceEnd).removeClass('hidden');
    posts.slice(sliceStart,sliceEnd).addClass('visible');
    clicks++

    console.log('clicks: ', clicks)
    console.log('loadAmount: ', loadAmount)

    // hide show more button if at the end
    if (clicks > loadAmount) {
      showMore.addClass('hidden');
    }
  })
});
