const mongoose = require('mongoose');

/*----------------------------------------------Estructura de la base de datos-------------------------------*/
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    cedula: { type: String, required: true },
    ciudad: { type: String, required: true },
    numeroCelular: { type: String, required: true },
    role: { type: String, default: 'user' }
  });

  const User = mongoose.model('User', userSchema,'usuarios');
/*----------------------------------------LOGIN---------------------------------------------------------------*/

const loginUser= async (req, res) => {
    const { username, password } = req.body;
    const role = 'user';

    try {
        const validateUser = await User.findOne({ username, password });
        if (validateUser) {
            console.log("Login exitoso para:", username);
            return res.json({ success: true, message: 'Login Success' });
        } else {
            res.status(400).json({ success: false, message: 'El usuario o contraseña no son correctas' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

/////////////////////////////////////////////Create User/////////////////////////////////////////////////////////////////////

const createUser = async (req, res) => {
  const { username, password, nombre, fechaNacimiento, cedula, ciudad, numeroCelular } = req.body;
  const role = 'user';

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Usuario ya existe' });
    }

    const newUser = new User({
      username,
      password,
      nombre,
      fechaNacimiento,
      cedula,
      ciudad,
      numeroCelular,
      role
    });

    await newUser.save();
    res.json({ success: true, message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

module.exports = {
    loginUser,
    createUser
}