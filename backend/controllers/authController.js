const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../logs/logger");
const db = require("../config/db");

const authController = {
  register: (req, res) => {
    const { username, email, password } = req.body;
    let { role } = req.body;

    if (!role) {
      role = 'paciente';
    }
    
    logger.log("Datos recibidos para registro: ", { username, email, role });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        logger.error("Error en el hash de la contraseña: " + err.message);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      const query =
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [username, email, hash, role], (err, result) => {
        if (err) {
          logger.error(
            "Error al crear el usuario en la base de datos: " + err.message
          );
          return res.status(500).json({ error: "Error en el servidor" });
        }
        logger.log("Usuario creado con éxito: ", { id: result.insertId });
        res
          .status(201)
          .json({ success: true, message: "Usuario creado con éxito!" });
      });
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;

    logger.log("Datos recibidos para login: ", { username });

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        logger.error("Error en la búsqueda del usuario: " + err.message);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      if (results.length === 0) {
        logger.log("Usuario no encontrado: " + username);
        return res.status(401).json({ message: "Usuario inexistente" });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          logger.error("Error al comparar contraseñas: " + err.message);
          return res.status(500).json({ error: "Error en el servidor" });
        }
        if (!isMatch) {
          logger.log("Contraseña incorrecta para usuario: " + username);
          return res.status(401).json({ message: "Fallo de autenticación" });
        }

        const token = jwt.sign(
          { userId: user.user_id, username: user.username, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        let redirectUrl = "/dashboard-usuario";
        if (user.role === "medico") redirectUrl = "/dashboard";
        else if (user.role === "admin") redirectUrl = "/dashboard-admin";

        logger.log("Usuario autenticado con éxito: ", { username });

        res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

        return res.json({ token, redirect: redirectUrl });
      });
    });
  },
  logout: (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0),
    });
    return res.status(200).redirect("/login");
  },
};

module.exports = authController;
