// function sendData(url, data) {
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.text().then(text => {
//                 throw new Error(`Server Error: ${text}`); // Error específico del servidor
//             });
//         }
//         return response.json(); // Si la respuesta es JSON, la convierte
//     })
//     .catch(error => {
//         console.error('Error en la solicitud:', error);
//         throw error; // Lanza el error si ocurre algún problema
//     });
// }

// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevenir que el formulario se envíe de forma predeterminada
    
//     // Obtener los valores de los campos
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const lastName = document.getElementById('lastName').value;
//     const birthDate = document.getElementById('birthDate').value.split('-');  // Separa el valor de la fecha
//     const preferencia = document.getElementById('preferencia').value;
  
//     // Crear el objeto con los datos a enviar
//     const data = {
//       code: '1023', // Suponiendo que el código es constante o se obtiene de algún lugar
//       username: username,
//       last_name: lastName,
//       password: password,
//       preferencia: preferencia,
//       fecha: {
//         año: birthDate[0],  // Año
//         mes: birthDate[1],  // Mes
//         dia: birthDate[2],  // Día
//       }
//     };
  
//     // Enviar los datos al servidor
//     fetch('http://localhost:3000/submit-registrar', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Error en la solicitud: ' + response.statusText);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Registro exitoso:', data);
//     })
//     .catch(error => {
//       console.error('Error al enviar los datos:', error);
//     });
//   });
  
