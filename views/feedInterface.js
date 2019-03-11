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
    let content = $('#postContent').val().replace(/(['])/g,'\\');
    getUser(content);
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
    console.log(element);
    $('#postContainer').append(`<div id=${element.id}> ${element.message.replace(/([\\])/g,"'")} -- ${element.user}<div>`)
  })
}


// function escapeSpecial(unsafe) {
//     return unsafe.replace(/&/g, "&amp;")
//          .replace(/</g, "&lt;")
//          .replace(/>/g, "&gt;")
//          .replace(/"/g, "&quot;")
//          .replace(/'/g, "&#039;");
// }

loadMessages()
