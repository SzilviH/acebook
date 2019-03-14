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
//   console.log(jresponse)
// }


const loadMessages = async () => {
    const formatMessages = (posts, comments) => {
        const makePostDiv = (element) => {
            const makeLikeButton = (element) => {
                return `<button id=like-${element.id} type="button"></button>`;
            };

            const makeCommentBox = (element) => {
                return `<form name="addComment">
                <textarea id="commentContent-${element.id}" type="text" name="comment" placeholder="comment" rows ='1' cols = '60'></textarea>
                <input id="comment-${element.id}" type="submit" name="comment" value="comment">
                </form>`
            };

            const formatUserInput = (element) => {
                return `${element.message.replace(/([\\])/g,"'").replace(/,/g,"<br/>")}`
            };

            // const addLikeEventListener = (element) => {
            //     let id = `like-button-${element.id}`;
            //     $(`#${id}`).click(() => {
            //         sendLike(element.id);
            //     })
            // };

            const relevantComments = (postid) => {
                return comments.filter((comment) => { return comment.postId === postid })
            }

            const makeCommentDiv = (element) => {
                // return `<!--<div>Something ${comments[0].content}</div>-->`;
                let postComments = relevantComments(element.id);
                let masterDiv = "";
                 postComments.forEach((comment) => {
                     masterDiv += (`<div>Comment: ${comment.content} User: ${comment.user}</div><br> <br>`);
                    // return `<div>Comment: ${comment.content} <br> User: ${comment.user}</div>`
                })
                return masterDiv
            }

            return `<div id=${element.id}>`+formatUserInput(element)+`-- ${element.user} -- ${element.date}`+makeLikeButton(element) + makeCommentDiv(element) + makeCommentBox(element) + getLikes(element.id) + `<div>`
        };

        const addEventListener = (element, action) => {
            let id = `${action}-${element.id}`;
                $(`#${id}`).click((event, action) => {
                    event.preventDefault();
                    if(action === 'like') {
                        sendLike(element.id);
                    }
                    else {
                        let commentContent = $(`#commentContent-${element.id}`).val();
                        $.post("/comments/create", {content: commentContent, postId: element.id, author: user });
                    }


                })

        };

        $('#postContainer').empty();
        posts.forEach((element) => {
            $('#postContainer').append(makePostDiv(element));
            addEventListener(element, "like");
            addEventListener(element, "comment");
        })
    };

    const postsresponse = await fetch ('/post');
    const posts = await postsresponse.json();
    const commentsresponse = await fetch ('/comments');
    const comments = await commentsresponse.json();


    formatMessages(posts, comments);
};
