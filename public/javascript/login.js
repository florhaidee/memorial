async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('The Email or password you have provided does not exist. Please try again or visit the Sign-Up page to get started.');
        }
    } else {
        alert('Please enter an Email and Password.')
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);