(() => {
    'use strict'

    // Expresión regular más estricta para validar correos electrónicos y contraseñas
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{8,20}$/

    // Obtener todos los formularios que queremos aplicar estilos de validación personalizados de Bootstrap
    const forms = document.querySelectorAll('.needs-validation')

    // Evitar el envío del formulario y agregar la clase 'was-validated' si no es válido
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)

        // Validación personalizada adicional para los inputs
        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                let isValid = true

                if (input.id === 'loginEmail') {
                    // Validar email usando una expresión regular más estricta
                    if (!emailRegex.test(input.value)) {
                        input.setCustomValidity('Por favor, proporciona una dirección de correo electrónico válida.')
                        isValid = false
                    } else {
                        input.setCustomValidity('')
                    }
                } else if (input.id === 'loginPassword') {
                    // Validar contraseña usando una expresión regular más estricta
                    if (!passwordRegex.test(input.value)) {
                        input.setCustomValidity('La contraseña debe tener entre 8 y 20 caracteres, y contener al menos un carácter especial y un número.')
                        isValid = false
                    } else {
                        input.setCustomValidity('')
                    }
                } else {
                    input.setCustomValidity('')
                }

                // Agregar o eliminar clases de validación de Bootstrap
                if (isValid) {
                    input.classList.remove('is-invalid')
                    input.classList.add('is-valid')
                } else {
                    input.classList.remove('is-valid')
                    input.classList.add('is-invalid')
                }
            })
        })
    })

    // Manejar el envío del formulario de inicio de sesión
    document.querySelector('form.needs-validation').addEventListener('submit', function(event) {
        event.preventDefault()
        if (this.checkValidity()) {
            const email = document.getElementById('loginEmail').value
            const password = document.getElementById('loginPassword').value
            // Aquí puedes añadir tu lógica para verificar el inicio de sesión con el backend

            alert('Inicio de sesión exitoso!')
            this.reset()
            this.classList.remove('was-validated')
            Array.from(this.querySelectorAll('.form-control')).forEach(input => {
                input.classList.remove('is-valid', 'is-invalid')
            })
        } else {
            this.classList.add('was-validated')
        }
    })
})()
