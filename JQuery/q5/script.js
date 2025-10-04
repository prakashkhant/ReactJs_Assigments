$(document).ready(function () {

    function validateField(field, errorMsg, isEmail = false) {
      let value = field.val().trim();
      let errorSpan = field.siblings(".error");
  
      if (value === "") {
        field.addClass("invalid").removeClass("valid");
        errorSpan.text(errorMsg);
        return false;
      } else if (isEmail) {
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/; // improved regex
        if (!emailPattern.test(value)) {
          field.addClass("invalid").removeClass("valid");
          errorSpan.text("⚠ Invalid email format");
          return false;
        }
      }
      field.addClass("valid").removeClass("invalid");
      errorSpan.text("");
      return true;
    }
  
    $("#myForm").submit(function (e) {
      e.preventDefault();
  
      let nameValid = validateField($("#username"), "⚠ Name is required");
      let emailValid = validateField($("#email"), "⚠ Email is required", true);
  
      if (nameValid && emailValid) {
        let username = $("#username").val().trim();
        // Redirect with username in URL
        window.location.href = "welcome.html?name=" + encodeURIComponent(username);
      }
    });
  });
  