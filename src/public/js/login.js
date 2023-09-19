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
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(result => {
        
        if (result.status === 200) {
            console.log(document.cookie);
    
                alert('Welcome, you will be automatically redirected shortly.');
                setTimeout(() => window.location.href = "profile", 500);
              } else {
                alert(result.status);
              
        }
    })
});


