function register() {
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let nombre = document.getElementById("uname");
    let email = document.getElementById("email");
    let email2 = document.getElementById("r-email");
    let contrasenia = document.getElementById("contrasenia");
    let contrasenia2 = document.getElementById("contrasenia2");

    // Validación del formulario
    if (nombre.value.length <= 0 || nombre.value == null) {
        Swal.fire({
            icon: "warning",
            title: "ERROR en el nombre de usuario",
            text: "El nombre de usuario no puede estar vacio",
            confirmButtonText: "OK"
        });
        return false;
    }
    if (nombre.value.length >= 10) {
        Swal.fire({
            icon: "warning",
            title: "ERROR en el nombre de usuario",
            text: "El nombre de usuario no puede superar los 10 caracteres",
            confirmButtonText: "OK"
        });
        return false;
    }
    if (format.test(nombre.value)) {
        Swal.fire({
            icon: "warning",
            title: "ERROR en el nombre de usuario",
            text: "El nombre de usuario no puede tener caracteres especiales",
            confirmButtonText: "OK"
        });
        return false;
    }

    if (email.value.length <= 0 || email2.value.length <= 0) {
        Swal.fire({
            icon: "warning",
            title: "ERROR en el correo",
            text: "Los correos electronicos no pueden ser vacios",
            confirmButtonText: "OK"
        });
        return false;
    }

    if (!(email.value === email2.value)) {
        Swal.fire({
            icon: "warning",
            title: "ERROR en el correo",
            text: "Los correos electronicos no son iguales",
            confirmButtonText: "OK"
        });
        return false;
    }

    if (contrasenia.value.length <= 0 || contrasenia2.value.length <= 0) {
        Swal.fire({
            icon: "warning",
            title: "ERROR en la contraseña",
            text: "La contraseña no puede estar vacia",
            confirmButtonText: "OK"
        });
        return false;
    }

    if (contrasenia.value.length <= 8 || contrasenia2.value.length <= 8) {
        Swal.fire({
            icon: "warning",
            title: "ERROR en la contraseña",
            text: "La contraseña debe tener 8 o mas caracteres",
            confirmButtonText: "OK"
        });
        return false;
    }

    if (!(contrasenia.value === contrasenia2.value)) {
        Swal.fire({
            icon: "warning",
            title: "ERROR en la contraseña",
            text: "Las contraseñas no pueden ser distintas",
            confirmButtonText: "OK"
        });
        return false;
    }

    // Se incorpora al código original la funcionalidad para enviar el request a la api flask y recibir la respuesta
    let userData = { //Almacenamos lo recibido desde el fomurario en un diccionario que es lo que espera la API
        nombre: nombre.value,
        email: email.value,
        contrasenia: contrasenia.value
    };

    fetch('https://fduples.pythonanywhere.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })//Enviamos la consutla al endpoint y procesamos la respuesta segun el valor recibido
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({ //Mantanemos la utilización de SweetFire para las alertas
                icon: "success",
                title: "Registro exitoso",
                text: "Usuario registrado correctamente",
                confirmButtonText: "OK"
            }).then(() => {
                window.location.href = '/mundo_deporte/index.html'; // Redirigir al índice
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error en el registro",
                text: data.error,
                confirmButtonText: "OK"
            });
        }
    })
    .catch(error => {//Aprovechamos el SweetFire para manejar las excepciones tambien
        Swal.fire({
            icon: "error",
            title: "Error en el servidor",
            text: "Ocurrió un error en el servidor, por favor inténtelo más tarde.",
            confirmButtonText: "OK"
        });
    });

    return false;  // Con esto evitamos el envio del formulario.
}
