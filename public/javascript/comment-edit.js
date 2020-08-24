async function editCommentHandler(event, id) {
    event.preventDefault();

    const comment = document.querySelector(`#editable-comment${id}`).innerText;
   
    
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_text: comment,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('editing comment:',response)
        //document.location.replace(`/post/${post_id}`);
        document.location.reload();
    } else {
        console.log("error editing", response)
        alert(response.statusText);
    };
}
