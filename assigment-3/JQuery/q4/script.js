$(document).ready(function () {
    let currentIndex = 0;
    let images = $(".slider img");
    let total = images.length;
  
    // show only the first image at start
    images.hide();
    images.eq(currentIndex).show();
  
    // Next button
    $("#next").click(function () {
      images.eq(currentIndex).fadeOut(500);
      currentIndex = (currentIndex + 1) % total;
      images.eq(currentIndex).fadeIn(500);
    });
  
    // Previous button
    $("#prev").click(function () {
      images.eq(currentIndex).fadeOut(500);
      currentIndex = (currentIndex - 1 + total) % total;
      images.eq(currentIndex).fadeIn(500);
    });
  });
  