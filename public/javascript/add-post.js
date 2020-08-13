async function newFormHandler(event) {
    event.preventDefault();

    const avatar = document.querySelector('input[name="avatar"]').value;
    const title = document.querySelector('input[name="post-title"]').value;
    const birthDate = document.querySelector('input[name="birth-date"]').value;
    const passingDate = document.querySelector('input[name="passing-date"]').value;
    const content = document.querySelector('textarea[name="post-body"]').value;

    const response = await fetch(`/api/posts`, 
        {
        method: 'POST',
        body: JSON.stringify({
            avatar,
            title,
            birthDate,
            passingDate,
            content
        }),
        file: event.target.file,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log()
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);