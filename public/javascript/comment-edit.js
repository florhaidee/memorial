// function displaySave() {
//     const saveButton = document.querySelector('.comment-save');
//     const editable = document.getElementById('editabkle-comment');

//     if (editable === 'active') {
//         saveButton.getElementsByClassName.display = 'block';
//     } else {
//         saveButton.getElementsByClassName.display = 'none'
//     }
// };

async function editCommentHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const comment = document.getElementById('#editable-comment').value;
    
    const response = await fetch(`/api/comments:${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment       
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/post/');
    } else {
        alert(response.statusText);
    };
}


document.getElementById('editable-comment').addEventListener('submit', editCommentHandler);