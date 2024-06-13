const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const logger = require("./logs/logger");
const authenticate = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/user-routes");
const Medicamento = require("./models/Medicamento");
const Paciente = require('./models/Paciente');
const HistorialRecetas = require('./models/HistorialRecetas');
const prescripcionesRoutes = require("./routes/prescripciones");
const multer = require("multer");

dotenv.config();

db.connect((err) => {
  if (err) {
    logger.error("Error al conectar a la base de datos: " + err.message);
    throw err;
  }
  logger.info("Conectado a la base de datos MySQL");
});

//region Inicio de la aplicacion

const app = express();
app.use(multer({ dest: path.join(__dirname, 'uploads/') }).single('file'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  logger.log(`Solicitud entrante: ${req.method} ${req.url}`);
  next();
});

//region Rutas de la API
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/prescripciones", prescripcionesRoutes);
app.use("/api/pacientes", require("./routes/pacientes"));


//region Rutas de la aplicación
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "../frontend", "views", "login"),
  path.join(__dirname, "../frontend", "views", "dash-profesional"),
  path.join(__dirname, "../frontend", "views", "dash-usuario"),
  path.join(__dirname, "../frontend", "views", "dash-admin"),
]);

//region Rutas Adicionales
app.use("/medicamentos", authenticate, require("./routes/medicamentos"));
app.use("/pacientes", authenticate, require("./routes/pacientes"));
app.use("/prescripciones", authenticate, require("./routes/prescripciones"));
app.use("/profesionales", authenticate, require("./routes/profesionales"));
app.use("/prestaciones", authenticate, require("./routes/prestaciones"));



//region ADMIN
app.get("/dashboard-admin", authenticate, (req, res) => {
  if (req.user && req.user.username) {
    const username = req.user.username;
    res.render("dashboard-admin", { username });
  }
});

app.get("/ver-perfil-admin", authenticate, (req, res) => {
  res.render("ver-perfil-admin");
});

app.get("/configuracion-admin", authenticate, (req, res) => {
  res.render("configuracion-admin");
});

app.get("/historial-recetas-admin", authenticate, (req, res) => {
  try {
    res.render("historial-recetas-admin");
  } catch (error) {
    logger.error("Error al renderizar historial-recetas-admin: " + error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get("/registro-medicamentos-admin", authenticate, (req, res) => {
  Medicamento.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.render("registro-medicamentos-admin", { medicamentos: results });
  });
});

app.get("/registro-pacientes-admin", authenticate, (req, res) => {
  res.render("registro-pacientes-admin");
});

app.get("/editar-usuarios", authenticate, (req, res) => {
  res.render("editar-usuarios");
});

app.get("/otorgar-roles", authenticate, (req, res) => {
  res.render("otorgar-roles");
});



//region MEDICOS

app.get("/dashboard", authenticate, (req, res) => {
  if (req.user && req.user.username) {
    const username = req.user.username;
    return res.render("dashboard", { username });
  } else {
    return res.status(401).redirect('/login');
  }
});

app.get("/prescripcion", authenticate, (req, res) => {
  if (req.user && req.user.username) {
    const username = req.user.username;

    Paciente.getAll((err, pacientes) => {
      if (err) {
        console.error('Error al obtener pacientes:', err);
        return res.status(500).send('Error al obtener pacientes');
      }

      Medicamento.getAll((err, medicamentos) => {
        if (err) {
          console.error('Error al obtener medicamentos:', err);
          return res.status(500).send('Error al obtener medicamentos');
        }
        return res.render("prescripcion", { username, pacientes, medicamentos });
      });
    });
  } else {
    return res.status(401).redirect('/login');
  }
});

app.get('/historial-recetas', authenticate, (req, res) => {
  const profesionalId = req.user.id;
  HistorialRecetas.getByProfesionalId(profesionalId, (err, results) => {
    if (err) {
      console.error("Error al obtener historial de recetas:", err);
      return res.status(500).json({ error: err.message });
    }
    res.render('historial-recetas', { recetas: results });
  });
});

app.get("/registro-medicamentos", authenticate, (req, res) => {
  Medicamento.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.render("registro-medicamentos", { medicamentos: results });
  });
});

app.get("/gestion-pacientes", authenticate, (req, res) => {
  res.render("gestion-pacientes");
});

app.get("/ver-perfil", authenticate, (req, res) => {
  const userId = req.user.userId;

  User.findById(userId, (err, user) => {
    if (err) {
      console.error('Error retrieving user details:', err);
      return res.status(500).json({ error: 'Error retrieving user details' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.render("ver-perfil", { user });
  });
});

app.get("/configuracion", authenticate, (req, res) => {
  res.render("configuracion");
});



//region USUARIO
app.get("/dashboard-usuario", authenticate, (req, res) => {
  if (req.user && req.user.username) {
    const username = req.user.username;
    console.log('Username:', username);
    return res.render("dashboard-usuario", { username });
  } else {
    return res.status(401).redirect('/login');
  }
});

app.get("/historial-recetas-usuario", authenticate, (req, res) => {
  const usuarioId = req.user.id;
  HistorialRecetas.getByUsuarioId(usuarioId, (err, results) => {
    if (err) {
      console.error("Error al obtener historial de recetas para usuario:", err);
      return res.status(500).json({ error: err.message });
    }
    res.render("historial-recetas-usuario", { recetas: results });
  });
});


app.get("/ver-perfil-usuario", authenticate, (req, res) => {
  res.render("ver-perfil-usuario");
});

app.get("/configuracion-usuario", authenticate, (req, res) => {
  res.render("configuracion-usuario");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use(errorHandler);

module.exports = app;

//region SERVIDOR
app.use(express.static(path.join(__dirname, "../frontend", "public")));


app.get("/", (req, res) => {
  res.render("index");
});
