const getUser = async (content) => {
   let user = await localStorage.getItem("username");
    await $.ajax({
     url: "/post/create?userid=" + user + "&content=" + encodeURIComponent(content),
     success: () => {
     },
     complete: () => {
       loadMessages()
     }
   })
 }

$(document).ready(function() {
  $('#submit').click(function(event) {
    event.preventDefault();
    let content = $('#postContent').val().replace(/(['])/g,'\\').split('\n');
    getUser(content);
    $('#postContent').val("");
  })
})

const loadMessages = async () => {
  const response = await fetch ('/post')
  const jresponse = await response.json()
  formatMessages(jresponse)
}

const formatMessages = (jresponse) => {
  $('#postContainer').empty();
  jresponse.forEach((element) => {
    $('#postContainer').append(`<div id=${element.id}> ${element.message.replace(/([\\])/g,"'").replace(/,/g,"<br/>")} -- ${element.user} -- ${element.date}<div>`)
  })
}

loadMessages()
