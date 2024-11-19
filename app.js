const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const queries = require('./public/db/queries');
const connection = require('./public/db/db');
const { log, Console } = require('console');
const { body, validationResult } = require('express-validator')

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'));  // Configura la carpeta de vistas
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "123",
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/check-login', (req, res) => {
    res.render('login')
});

app.post('/submit-email', [
    body('username', 'Ingrese un correo')
        .exists().withMessage('El campo correo es obligatorio')
        .isEmail().withMessage('El campo correo es obligatorio y debe ser un correo válido'),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Renderizar errores en la respuesta o redirigir con errores
        // return res.status(400).json({success: false,errors: errors.array(),});
        // console.log(errors);
        const valores = req.body;
        const validaciones = errors.array();
        console.log(validaciones);
        
        res.render('login',{validaciones:validaciones,valores:valores})
    }else{
        var { username } = req.body;
        let email = req.body.username
        let country = req.body.country
    
    
        if (email) {
            console.log('Correo recibido:', email);
            console.log('pais:', country);
    
            queries.checkEmailExists(email, (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Error en la base de datos' });
                }
                if (results.length > 0) {
                    req.session.email = email
                    req.session.country = country
                    res.redirect('/password');
                    return
                } else {
                    console.log('Correo recibido correctamente');
                    req.session.email = email
                    req.session.country = country
                    res.redirect('/register');
                }
            });
        } else {
            console.log('Correo no proporcionado');
            return res.status(400).json({ message: 'Correo no proporcionado' });
        }
    }
    
});

app.get('/password', (req, res) => {
    res.render('loginPassword');
});


app.post('/validacion', (req, res) => {
    let { password } = req.body

    // Realiza una consulta SELECT a la base de datos
    connection.query(`SELECT contrasena FROM usuarios WHERE correo = "${req.session.email}"`, (err, results) => {
        console.log(req.session.email);

        if (err) {
            console.error('Error en la consulta: ', err);
            return res.status(500).json({ message: 'Error al obtener los usuarios' });
        } else {
            results.forEach((e) => {
                if (password == e.contrasena) {
                    console.log(e.contrasena);
                    console.log(password);
                    res.redirect('/welcome');
                } else {
                    console.log('La contraseña es incorrecta');

                }
            })
        }

    });
});

app.get('/welcome', (req, res) => {
    res.render('welcome')
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/get-email', (req, res) => {
    if (req.session.email) {
        return res.json({ email: req.session.email });
    }
    return res.status(404).json({ message: 'No email found in session' });
});

// Ruta para insertar un nuevo usuario
app.post('/submit-registrar', (req, res) => {
    if (!req.session.email) {
        console.log('No hay sesión activa, redirigiendo...');
        return res.redirect('/');
    }

    const bornDate = req.body.fecha_año + '-' + req.body.fecha_mes + '-' + req.body.fecha_dia
    const pais = req.session.country;
    const correo = req.session.email;

    console.log(req.body);


    const { code, username, last_name, password, preferencia } = req.body;

    const query = `
        INSERT INTO usuarios (correo, codigo, nombre, apellido, contrasena, preferencia, fecha_nacimiento, pais)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [correo, code, username, last_name, password, preferencia, bornDate, pais], (err, results) => {
        // if (err) {
        //     console.error('Error al insertar usuario: ', err);
        //     return res.status(500).json({ message: 'Error al insertar el usuario' });
        // }    
        res.status(201).json({
            message: 'Usuario creado',
            id: results.insertId  // Devuelve el ID del nuevo usuario            
        });
        res.redirect('/welcome');
    });
});


// app.post('/submit-registrar', (req, res) => {
//     if (!req.session.email) {
//         console.log('No hay sesión activa, redirigiendo...');
//         return res.redirect('/');
//     }


//     const bornDate = req.body.fecha_año + '-' + req.body.fecha_mes + '-' + req.body.fecha_dia
//     const pais = "Colombia"
//     const correo = req.session.email;

//     const { code, username, last_name, password, preferencia } = req.body;


//     const query = `INSERT INTO users (correo, code, username, last_name, password, preferencia, bornDate, pais) 
//                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

//     if (queries.insertUser(correo, code, username, last_name, password, preferencia, bornDate, pais)) {
//         console.error('Error al insertar datos:', error);
//         return res.status(500).send('Error al registrar los datos');
//     } else {
//         res.redirect('/welcome');
//     }
// });




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
