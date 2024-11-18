// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault(); 

//     let correo = document.getElementById('username').value; 

//     if (correo) {
//         localStorage.setItem('correo', correo);
        
//         fetch('/submit-email', {  
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',  
//             },
//             body: JSON.stringify({ email: correo })  
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Respuesta del servidor:', data);
//             if (data.message === 'Correo recibido correctamente') {
                
//                 window.location.href = '/register';
//             } else {
//                 window.location.href = '/password';
//             }
//         })
//         .catch(error => {
//             console.error('Error al enviar el correo:', error);
//             alert('Hubo un problema con el envío del correo.');
//         });
//     } else {
//         alert("Por favor, ingresa un correo.");
//     }
// });



