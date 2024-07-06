(() => {
    'use strict'

    // Expresión regular más estricta para validar correos electrónicos y contraseñas
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?!.*(.)\1{2,}).{8,20}$/

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

                if (input.id === 'validationCustom03') {
                    // Asegurar que el input solo contiene dígitos y tiene exactamente 10 caracteres
                    if (!/^\d{0,10}$/.test(input.value)) {
                        input.value = input.value.slice(0, -1) // Eliminar el último carácter si no coincide
                    }

                    // Establecer mensaje de validez personalizado
                    if (input.value.length !== 10) {
                        input.setCustomValidity('Please provide a valid phone number with exactly 10 digits.')
                        isValid = false
                    } else {
                        input.setCustomValidity('')
                    }
                } else if (input.id === 'validationCustomEmail') {
                    // Validar email usando una expresión regular más estricta
                    if (!emailRegex.test(input.value)) {
                        input.setCustomValidity('Please provide a valid email address.')
                        isValid = false
                    } else {
                        input.setCustomValidity('')
                    }
                } else if (input.id === 'registerPassword') {
                    // Validar contraseña usando una expresión regular más estricta
                    if (!passwordRegex.test(input.value)) {
                        input.setCustomValidity('Password must be 8-20 characters long, contain at least one special character, and not have consecutive identical characters.')
                        isValid = false
                    } else {
                        input.setCustomValidity('')
                    }
                } else if (input.id === 'confirmPassword') {
                    const password = document.getElementById('registerPassword').value
                    if (input.value !== password) {
                        input.setCustomValidity('Passwords do not match.')
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

    // Manejar el envío del formulario de registro
    document.querySelector('form.needs-validation').addEventListener('submit', function(event) {
        event.preventDefault()
        if (this.checkValidity()) {
            const email = document.getElementById('validationCustomEmail').value
            const password = document.getElementById('registerPassword').value
            const confirmPassword = document.getElementById('confirmPassword').value
            if (password === confirmPassword) {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                alert('Registro exitoso!')
                this.reset()
                this.classList.remove('was-validated')
                Array.from(this.querySelectorAll('.form-control')).forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid')
                })
            } else {
                alert('Las contraseñas no coinciden.')
            }
        } else {
            this.classList.add('was-validated')
        }
    })

    // Validar que las contraseñas coincidan en tiempo real
    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('registerPassword').value
        if (this.value === password) {
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
        } else {
            this.classList.remove('is-valid')
            this.classList.add('is-invalid')
        }
    })
})()
