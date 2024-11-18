
// let consultas = require("../db/queries")


// consultas.userName();


class NavbarWebUser extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        
        fetch('/get-email')
        .then(response => response.json())
        .then(data => {
            // Si se obtiene el email correctamente, actualizar el contenido
            if (data.email) {
                this.updateEmail(data.email);
            }
        })
        .catch(error => {
            console.error('Error obteniendo el email:', error);
        });


        this.innerHTML = `
        <header class="bg-white">
            <nav class="w-full bg-white border-b border-gray-300">
                <div class="container mx-auto px-6 flex justify-between items-center py-4">
                    <div class="flex items-center space-x-3">
                        <img src="/uses/nike.svg" alt="Nike Logo" class="w-12 h-12">
                        <span class="text-xl font-bold text-gray-800">Nike</span>
                    </div>

                    <button id="menu-button" class="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    <div id="nav-links" class="hidden md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-16 left-0 right-0 bg-white shadow-lg md:shadow-none z-50">
                        <a href="#" class="text-gray-700 hover:text-gray-900 transition font-medium px-4 py-2">Home</a>
                        <a href="#" class="text-gray-700 hover:text-gray-900 transition font-medium px-4 py-2">Calzado</a>
                        <a href="#" class="text-gray-700 hover:text-gray-900 transition font-medium px-4 py-2">Contacto</a>
                    </div>

                    <!-- Nombre de usuario y su imagen -->
                    <div class="flex items-center space-x-4">
                        <img src="/uses/nike.svg" alt="Imagen de usuario" class="w-8 h-8 rounded-full border-2 border-gray-300">
                        <span class="text-gray-700 font-medium" id="user-email">{#email}</span>
                    </div>
                </div>
            </nav>
        </header>
        `;

        const menuButton = this.querySelector('#menu-button');
        const navLinks = this.querySelector('#nav-links');

        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
        });   
    }

    updateEmail(email) {
        // Actualiza el contenido del span con el email
        const emailSpan = this.querySelector('#user-email');
        if (emailSpan) {
            emailSpan.textContent = email;
        }}
}


window.customElements.define('mi-navbaruser', NavbarWebUser);
