document.addEventListener("DOMContentLoaded", function () {
    class FormValidation {
        constructor() {
            this.form = document.querySelector('.contact');
            this.nameInput = document.getElementById('name');
            this.emailInput = document.getElementById('email');
            this.messageInput = document.getElementById('message');
            
            this.form.addEventListener('submit', (e) => {
                e.preventDefault(); // Evita que el formulario recargue la página
                const isValid = this.validateInputs(); // Realiza validaciones
                
                if (isValid) {
                    this.clearForm(); // Limpia el formulario después del envío
                }
            });
        }

        setError(element, message) {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error');
            errorDisplay.innerText = message;
            element.classList.add('error-border');
            inputControl.classList.add('error');
        }

        setSuccess(element) {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error');
            errorDisplay.innerText = '';
            element.classList.remove('error-border');
            inputControl.classList.remove('error');
        }

        isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        validateInputs() {
            let isValid = true;

            const nameValue = this.nameInput.value.trim();
            const emailValue = this.emailInput.value.trim();
            const messageValue = this.messageInput.value.trim();

            if (nameValue === '') {
                this.setError(this.nameInput, 'El nombre es requerido');
                isValid = false;
            } else {
                this.setSuccess(this.nameInput);
            }

            if (emailValue === '') {
                this.setError(this.emailInput, 'El correo electrónico es requerido');
                isValid = false;
            } else if (!this.isValidEmail(emailValue)) {
                this.setError(this.emailInput, 'Proporciona una dirección de correo válida');
                isValid = false;
            } else {
                this.setSuccess(this.emailInput);
            }

            if (messageValue === '') {
                this.setError(this.messageInput, 'El mensaje es requerido');
                isValid = false;
            } else {
                this.setSuccess(this.messageInput);
            }

            return isValid;
        }

        clearForm() {
            this.form.reset(); // Limpia todos los campos del formulario
            document.querySelectorAll('.error').forEach((el) => el.innerText = ''); // Limpia mensajes de error
        }
    }

    const validacion = new FormValidation();
});
