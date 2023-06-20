const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(result => {
        if (result.status === 200) {
            console.log(document.cookie); // httpOnly sirve para no poder usar esto solo peticion http
            window.location.replace('/views/profile');
        }
    })
});


