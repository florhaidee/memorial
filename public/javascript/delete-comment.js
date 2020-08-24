let form = document.getElementById("edit-comment-form")

async function deleteFormHandler(event, id) {
    event.preventDefault();
    
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    });   

    if (response.ok) {
        console.log(event)
        document.location.reload();
    } else {
        alert(response.statusText);
        console.log("error deleting", response)
    };

};
