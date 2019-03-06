$(document).ready(function(){
   $('#sign-out').click(function () {
    $('#feed').hide();
    $('#sign-out').hide();
    $('#good-bye-message').text("See ya!");
    $('#home-login').text("Log in");
  });
});
