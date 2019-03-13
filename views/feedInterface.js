let user = localStorage.getItem("username");

$(document).ready(function() {
    if (user === null) {
        $(location).attr('href', '/')
    } else {
        loadMessages()
    }

    $('#submit').click(function (event) {
        event.preventDefault();
        let content = $('#postContent').val().replace(/(['])/g, '\\').split('\n');
        getUser(content);
        $('#postContent').val("");

    })
});

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

const sendLike = async (postID) => {
  await $.ajax({
    url: "/likes/create?postid=" + postID,
    success: () => {
    },
    complete: () => {
      // getLikes()
    }
  })
}

const getLikes = async (postID) => {
  await $.ajax({
    url: "/likes?postid=" + postID,
    success: () => {
    },
    complete: () => {
      // dealWithLike()
    }
  })
}

// const dealWithLike = async () => {
//   const response = await fetch ('/likes');
//   const jresponse = await response.json();
// }


const loadMessages = async () => {
    const formatUserInput = (element) => {
        return `${element.message.replace(/([\\])/g,"'").replace(/,/g,"<br/>")}`
    };

    const makeLikeButton = (element) => {
        return `<button id=like-button-${element.id} type="button"></button>`;
    };

    const makePostDiv = (element) => {
        return `<div id=${element.id}>`+formatUserInput(element)+`-- ${element.user} -- ${element.date}`+makeLikeButton(element)+ makeCommentBox(element) + getLikes(element.id) +`<div>`
    };

    const makeCommentBox = (element) => {
      return `<form name="addComment">
       <textarea id="commentContent" type="text" name="comment" placeholder="comment" rows ='1' cols = '60'></textarea>
       <input id="comment-${element.id}" type="submit" name="comment" value="comment">
       </form>`
    }

    const addLikeEventListener = (element) => {
        let id = `like-button-${element.id}`;
        $(`#${id}`).click(() => {
            sendLike(element.id);
        })
    };

      const addCommentEventListener = (element) => {
        let id = `comment-${element.id}`;
        $(`#${id}`).click(() => {
        })
    };

    const formatMessages = (jresponse) => {
        $('#postContainer').empty();
        jresponse.forEach((element) => {
            $('#postContainer').append(makePostDiv(element));
            addLikeEventListener(element);
            addCommentEventListener(element);
        })
    };

    const response = await fetch ('/post');
    const jresponse = await response.json();
    formatMessages(jresponse);

};
