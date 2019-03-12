let user = localStorage.getItem("username");

$(document).ready(function() {
  console.log(user);
  if (user === null) {
    $(location).attr('href', '/')
  } else {
    loadMessages()
  }
  $('#submit').click(function(event) {
    event.preventDefault();
    let content = $('#postContent').val().replace(/(['])/g,'\\').split('\n');
    getUser(content);
  })
})

const getUser = async (content) => {
    await $.ajax({
     url: "/post/create?userid=" + user + "&content=" + encodeURIComponent(content),
     success: () => {
     },
     complete: () => {
       loadMessages()
     }
   })
 }

const loadMessages = async () => {
  const response = await fetch ('/post')
  const jresponse = await response.json()
  formatMessages(jresponse)
}

const formatMessages = (jresponse) => {
  $('#postContainer').empty();
  jresponse.forEach((element) => {
    $('#postContainer').append(`<div id=${element.id}> ${element.message.replace(/([\\])/g,"'").replace(/,/g,"<br/>")} -- ${element.user} -- ${element.date}<br><br><div>`)
  })
}
