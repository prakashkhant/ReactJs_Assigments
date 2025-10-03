$(document).ready(function () {
    // Initially hide the div
    $("#myDiv").hide();
  
    // Toggle on button click
    $("#toggleBtn").click(function () {
      $("#myDiv").slideToggle("slow"); // smooth animation
    });
  });
  