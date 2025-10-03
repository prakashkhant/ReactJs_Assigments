$(document).ready(function () {
  $("#myForm").submit(function (event) {
    event.preventDefault(); // stop form submission

    let name = $("#name").val().trim();
    let email = $("#email").val().trim();

    // validation
    if (name === "") {
      alert("Name is required!");
      return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      alert("Please enter a valid email!");
      return;
    }

    // show data
    alert("Form Data:\nName: " + name + "\nEmail: " + email);
  });
});
