async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('input[name="post-title"]').value;
    const birthDate = document.querySelector('input[name="birth-date"]').value;
    const passingDate = document.querySelector('input[name="passing-date"]').value;
    const avatar = document.querySelector('input[name="avatar"]').value;
    const content = document.querySelector('textarea[name="post-body"]').value;
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            birthDate,
            passingDate,
            avatar,
            content        
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    };

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);