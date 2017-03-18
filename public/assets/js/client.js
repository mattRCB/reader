$(document).on("click", '#submit', function() {
  // event.preventDefault();
  var user = {};
  user.email = $("[name='email']").val().trim();
  user.password = $("[name='password']").val().trim();
  $.post("/users/login", user, function(session) {
    sessionStorage.setItem('sesh', JSON.stringify(session));
    console.log(JSON.parse(sessionStorage.sesh));

    switch (JSON.parse(sessionStorage.sesh).usertype){
      case 'R':
        window.location = "/readers";
        break;
      // case 'P':
      //   window.location = "/parents";
      //   break;
      case 'T':
        window.location = "/teachers";
        // res.redirect('/teachers');
        break;
    }
    
    // $.get('/teachers', function(data, status) {

    // });
  });
});

console.log('client.js in da hous');