let user = localStorage.getItem("username");

$(document).ready(function() {
  console.log(user);
  // if (user === null) {
  //   $(location).attr('href', '/')
  // } else {
    loadMessages()
  // }
  $('#submit').click(function(event) {
    event.preventDefault();
    let content = $('#postContent').val().replace(/(['])/g,'\\').split('\n');
    getUser(content);
  })

  function createCommentListener = function(id) {
    $(`#comment${id}`).click(function(event) {
      event.preventDefault();
      let comment = $('#commentContent').val().replace(/(['])/g,'\\').split('\n');
      // let postid =$('.divClass').attr("id")
      console.log(comment)
      // console.log(postid)
      // postComment(comment); // add postid
    })
  }

})
//
// const postComment = async (content) => {
//     await $.ajax({
//      url: "/comment/create?userid=" + user + "&content=" + encodeURIComponent(comment) //+ "&post=" + postid
//      // success: () => {
//      // },
//      // complete: () => {
//      //   // loadComments()
//      // }
//    })
//  }

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
    $('#postContainer').append(`<div id=${element.id} class="divClass"> ${element.message.replace(/([\\])/g,"'").replace(/,/g,"<br/>")} -- ${element.user} -- ${element.date}<br><br>
    <form name="addComment">
       <textarea id="commentContent" type="text" name="comment" placeholder="comment" rows ='1' cols = '60'></textarea>
       <input id="comment${element.id}" type="submit" name="comment" value="comment">
     </form>
    <div>`)
    createCommentListener(element.id);
  })
}
