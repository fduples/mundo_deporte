document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();//PRevenimos el envio natural del formulario

    clean_localStorage()//Borramos el local storage para evitar que si ya hay datos sean tomados.
    
    const email = document.getElementById('uname').value;
    const contrasenia = document.getElementById('pass').value;

    fetch('http://127.0.0.1:5000/login', { //Le pegamos al endpoint de logueo con el metodo post y manejamos las promesas
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, contrasenia })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success === 'Inicio de sesión exitoso') {//Guardo en el localStorage que ya se encuetra logueado el ususario y sus datos si la respuesta del enpoint es positiva.
            alert('Inicio de sesión exitoso');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false');
            localStorage.setItem('nombre', data.nombre)
            window.location.href = '../index.html'; // Redirigir al inicio
        } else {
            alert('Email o contraseña incorrectos');
        }
    })
    .catch(error => {//Manejo la exception para ver por consila en caso de que falle
        console.error('Error:', error);
        alert('Hubo un error en el inicio de sesión');
    });
});

function clean_localStorage() {//Metodo para "limpiar el local storage  "
    if (localStorage.getItem('isLoggedIn')) {
        localStorage.removeItem('isLoggedIn');
    }

    if (localStorage.getItem('isAdmin')) {
        localStorage.removeItem('isAdmin');
    }

    if (localStorage.getItem('nombre')) {
        localStorage.removeItem('nombre');
    }
}
