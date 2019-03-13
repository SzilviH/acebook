let user = localStorage.getItem("username");

$(document).ready(function() {
    console.log(user);
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


const loadMessages = async () => {
    const formatMessages = (jresponse) => {
        const makePostDiv = (element) => {
            const makeLikeButton = (element) => {
                return `<button id=like-${element.id} type="button"></button>`;
            };

            const makeCommentBox = (element) => {
                return `<form name="addComment">
                <textarea id="commentContent" type="text" name="comment" placeholder="comment" rows ='1' cols = '60'></textarea>
                <input id="comment-${element.id}" type="submit" name="comment" value="comment">
                </form>`
            };

            const formatUserInput = (element) => {
                return `${element.message.replace(/([\\])/g,"'").replace(/,/g,"<br/>")}`
            };

            return `<div id=${element.id}>`+formatUserInput(element)+`-- ${element.user} -- ${element.date}`+makeLikeButton(element)+ makeCommentBox(element) + `<div>`
        };

        const addEventListener = (element, action) => {
            let id = `${action}-${element.id}`;
            $(`#${id}`).click((event) => {
                event.preventDefault();
                console.log("console hello");
                fetch('/likes')
            })
        };

        $('#postContainer').empty();
        jresponse.forEach((element) => {
            $('#postContainer').append(makePostDiv(element));
            addEventListener(element, "like");
            addEventListener(element, "comment");
        })
    };

    const response = await fetch ('/post');
    const jresponse = await response.json();
    formatMessages(jresponse);
};
