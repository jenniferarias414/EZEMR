// alert('JS loaded!')

const loginForm = document.getElementById('login-form')

function login(event) {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const validUsername = 'Jenny'
    const validPassword = 'Jenny123'

    if (username === validUsername && password === validPassword) {
        window.location.href = "./index.html"
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

loginForm.addEventListener('submit', login)

//add fade in animation
setTimeout(() => {
    document.querySelector('.login-container').style.opacity = 1;
}, 100)