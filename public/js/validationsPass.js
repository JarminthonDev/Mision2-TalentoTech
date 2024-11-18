// function sendData(url, data) {
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => response.json()) 
//     .catch(error => {
//         console.error('Error en la solicitud:', error);
//         throw error;
//     });
// }


// document.getElementById('password-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     let correo = localStorage.getItem('correo');  
//     let password = document.getElementById('password').value; 

//     console.log('Correo:', correo);
//     console.log('Contraseña:', password);

//     if (correo && password) {
//         sendData('/submit-password', { email: correo, password: password })
//             .then(data => {
//                 console.log('Respuesta del servidor:', data);
//                 if (data.success) {
//                     window.location.href = '/welcome-app'; 
//                 } else {
                    
//                     alert('Contraseña incorrecta. Intenta de nuevo.');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error al enviar la contraseña:', error);
//                 alert('Hubo un problema con la validación de la contraseña.');
//             });
//     } else {
//         alert("Por favor, ingresa tu contraseña.");
//     }
// });








