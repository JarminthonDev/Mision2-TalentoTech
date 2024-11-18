const db = require('./db');





function checkEmailExists(email, callback) {
    db.query('SELECT * FROM usuarios WHERE correo = ?', [email], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
}

function userName(email, callback) {
    db.query('SELECT * FROM usuarios WHERE correo = ?', [email], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
}

function checkPassword(email, password) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT contrasena FROM usuarios WHERE correo = ?',
            [email],
            (err, results) => {
                if (err) {
                    return reject('Error en la consulta: ' + err);
                }

                if (results.length === 0) {
                    return resolve(false); // No se encontró el usuario
                }

                const storedPassword = results[0].contrasena;

                if (password === storedPassword) {
                    resolve(true); // Contraseña correcta
                } else {
                    resolve(false); // Contraseña incorrecta
                }
            }
        );
    });
}



// const insertUser = (correo, code, username, last_name, password, preferencia, bornDate, pais, callback) => {
//     const query = `INSERT INTO users (correo, code, username, last_name, password, preferencia, bornDate, pais) 
//                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

//     // Verifica que callback sea una función antes de continuar
//     if (typeof callback !== 'function') {
//         throw new Error('El callback debe ser una función');
//     }

//     db.query(query, [correo, code, username, last_name, password, preferencia, bornDate, pais], (err, results) => {
//         if (err) {
//             console.error('Error al insertar usuario:', err);
//             return callback(err, null);  // Llama al callback con el error
//         }
//         callback(null, results.insertId);  // Llama al callback con el ID del nuevo registro
//     });
// };

// function insertUser(correo, code, username, last_name, password, preferencia, bornDate, pais, callback) {
//     const query = `
//         INSERT INTO usuarios (correo, codigo, nombre, apellido, contrasena, preferencia, fecha_nacimiento, pais)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;
    
//     db.query(query, [correo, code, username, last_name, password, preferencia, bornDate, pais], (err, results) => {
//         if (err) {
//             console.error('Error al insertar datos:', err);
//             return callback(err, null);  // Si hay un error, lo devuelve en el callback
//         }
//         callback(null, results.insertId);  // Si la inserción es exitosa, devuelve el ID del nuevo registro
//     });
    
// }

module.exports = {
    checkEmailExists,
    checkPassword,
    userName
};
