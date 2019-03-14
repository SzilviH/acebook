let user = localStorage.getItem("username");
let first_name = localStorage.getItem("first_name");
let user_image = localStorage.getItem("image");
$(document).ready(function() {
    if (user === null) {
        $(location).attr('href', '/')
    } else {
        loadMessages();
        $("#greet_user").text(`${first_name}`);
        $("#post-form").prepend(`<img src = ${user_image}>`)
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
        url: "/post/create?userid=" + user + "&content=" + encodeURIComponent(content) + "&user_image="+user_image,
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
        }
    })

};

const loadMessages = async () => {
    const formatMessages = (posts, comments, likes) => {
        const makePostDiv = (element) => {
            const makeLikeButton = (element) => {
                return `<button id=like-${element.id} type="button">Like</button>`;
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

            const relevantComments = (postid) => {
                return comments.filter((comment) => { return comment.postId === postid })
            };

            const relevantLikes = (postid) => {
               let likesArray = likes.filter((like) => { return like.postid === postid})
               if (likesArray.length === 1) {
                 return `${likesArray.length} like`
               } else {
                 return `${likesArray.length} likes`
               }
            };

            const makeCommentDiv = (element) => {
                let postComments = relevantComments(element.id);
                let masterDiv = "";
                 postComments.forEach((comment) => {
                     masterDiv += (`<div>Comment: ${comment.content} User: ${comment.user}</div><br> <br>`);
                });
                return masterDiv
            };

            const makeCommentPlaceholder = (element) => {
                return `<div id="placeholder-${element.id}"></div><br> <br>`
            };
            return `<div id=${element.id}><img src = ${element.user_image}>`+formatUserInput(element)+`-- ${element.user} -- ${element.date}`+makeLikeButton(element) + makeCommentDiv(element) + makeCommentPlaceholder(element) + makeCommentBox(element) + `<span id="likes-count-${element.id}">` + relevantLikes(element.id) + "</span></div><br><br>"

        };
        const addEventListener = (element, action) => {
            let id = `${action}-${element.id}`;

            const addCommentToPost = (body, postId, author) => {
                let newComment = (`<div>Comment: ${body} User: ${author}</div><br> <br>`);
                $(`#placeholder-${postId}`).append(newComment)
            };

            const addCommentListener = (id) => {
              $(`#${id}`).click((event) => {
                event.preventDefault();
                let commentContent = $(`#commentContent-${element.id}`).val();
                $.post("/comments/create", {content: commentContent, postId: element.id, author: user });
                addCommentToPost(commentContent, element.id, user );
                $(`#commentContent-${element.id}`).val("");
              })
            };

            const addLikeListener = (id) => {
              $(`#${id}`).click((event) => {
                sendLike(element.id);
                let currentLikes = $(`#likes-count-${element.id}`).text().slice(0, -5);
                let likes = parseInt(currentLikes, 10);
                if (likes === 0) {
                  $(`#likes-count-${element.id}`).text(`1 like`)
                } else {
                  $(`#likes-count-${element.id}`).text(`${likes + 1} likes`)
                }

              });
            };

            action === "like" ? addLikeListener(id) : addCommentListener(id);
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
    const likesresponse = await fetch ('/likes');
    const likes = await likesresponse.json();

    formatMessages(posts, comments, likes);
};
