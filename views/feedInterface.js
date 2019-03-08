const getUser = async (content) => {
   let user = await localStorage.getItem("username");
   console.log(content);
   // return user;
   // await fetch ('/post/create')
    await $.ajax({
     url: "/post/test?userid=" + user + "&content=" + content,
     success: () => {
       console.log("success");
     },
     complete: () => {
       console.log("complete");
       loadMessages()
     }
   })
 }
//
$(document).ready(function() {
  $('#submit').click(function(event) {
    event.preventDefault();
  })
  $('#submit').click(function() {
    console.log('i\'m running');
    let content = $('#postContent').val()
    console.log(content);
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
  console.log(jresponse);
  jresponse.forEach( (element) => {
    $('#postContainer').append(`<div id=${element.id}> ${element.message}<div>`)
  })
}

loadMessages()
