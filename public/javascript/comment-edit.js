async function editCommentHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const id = document.querySelector('#comment-id').value;

    const comment = document.querySelector('#editable-comment').innerText;
    
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_text: comment,
            post_id: parseInt(post_id),
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/post/${post_id}`);
        //document.location.reload();
    } else {
        alert(response.statusText);
    };
}


document.querySelector('#edit-comment-form').addEventListener('submit', editCommentHandler);