$(document).ready(function () {
    // Cities data
    const cities = {
      Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
      Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
      Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota"]
    };
  
    // Local image paths (stored in img/ folder)
    const cityBackgrounds = {
      Ahmedabad: "img/ahmedabad.avif",
      Surat: "img/surat.jpg",
      Vadodara: "img/vadodara.jpg",
      Rajkot: "img/rajkot.jpg",
      Mumbai: "img/mumbai.jpg",
      Pune: "img/pune.webp",
      Nagpur: "img/nagpur.webp",
      Nashik: "img/nashik.jpg",
      Jaipur: "img/jaipur.jpg",
      Udaipur: "img/udaipur.jpg",
      Jodhpur: "img/jodhpur.jpg",
      Kota: "img/kota.jpg"
    };
  
    // State selection
    $("#state").change(function () {
      let state = $(this).val();
      let cityDropdown = $("#city");
  
      cityDropdown.empty().append('<option value="">-- Select City --</option>');
  
      if (state && cities[state]) {
        cityDropdown.prop("disabled", false);
        $.each(cities[state], function (index, city) {
          cityDropdown.append(`<option value="${city}">${city}</option>`);
        });
      } else {
        cityDropdown.prop("disabled", true);
      }
  
      $("#showSelection").prop("disabled", true);
      $("#message").hide();
    });
  
    // Enable confirm button when city selected
    $("#city").change(function () {
      if ($(this).val()) {
        $("#showSelection").prop("disabled", false);
      } else {
        $("#showSelection").prop("disabled", true);
      }
    });
  
    // Show confirmation + change background
    $("#showSelection").click(function () {
      let state = $("#state").val();
      let city = $("#city").val();
  
      if (state && city) {
        $("#message")
          .text(`✅ You selected: ${city}, ${state}`)
          .fadeIn()
          .css("color", "#28a745");
  
        // Change background from local folder
        if (cityBackgrounds[city]) {
          $("body").css({
            "background-image": `url(${cityBackgrounds[city]})`,
            "background-size": "cover",
            "background-position": "center"
          });
          $(".overlay").fadeIn();
        }
      }
    });
  });
  