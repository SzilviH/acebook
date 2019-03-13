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
 };

$(document).ready(function() {
  $('#submit').click(function(event) {
    event.preventDefault();
    let content = $('#postContent').val().replace(/(['])/g,'\\').split('\n');
    getUser(content);
    $('#postContent').val("");
  })
});

const loadMessages = async () => {
    const formatUserInput = (element) => {
        return `${element.message.replace(/([\\])/g,"'").replace(/,/g,"<br/>")}`
    };

    const makeLikeButton = (element) => {
        return `<button id=like-button-${element.id} type="button"></button>`;
    };

    const makePostDiv = (element) => {
        return `<div id=${element.id}>`+formatUserInput(element)+`-- ${element.user} -- ${element.date}`+makeLikeButton(element)+`<div>`
    };

    const addLikeEventListener = (element) => {
        let id = `like-button-${element.id}`;
        $(`#${id}`).click(() => {
            console.log("console hello");
            fetch('/likes')
        })
    };

    const formatMessages = (jresponse) => {
        $('#postContainer').empty();
        jresponse.forEach((element) => {
            $('#postContainer').append(makePostDiv(element));
            addLikeEventListener(element);
        })
    };

    const response = await fetch ('/post');
    const jresponse = await response.json();
    formatMessages(jresponse);
};


