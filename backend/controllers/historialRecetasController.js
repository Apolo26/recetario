const HistorialRecetas = require("../models/HistorialRecetas");

exports.crearHistorialReceta = async (req, res) => {
  try {
    const { profesional_id, paciente_id, fecha, medicamentos, acciones } = req.body;
    const nuevaReceta = await new Promise((resolve, reject) => {
      HistorialRecetas.create(
        { profesional_id, paciente_id, fecha, medicamentos, acciones },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    res.status(201).json(nuevaReceta);
  } catch (error) {
    console.error("Error al crear historial de receta:", error);
    res.status(500).json({ error: "Error al crear historial de receta" });
  }
};

exports.obtenerHistorialRecetas = async (req, res) => {
  try {
    const profesionalId = req.user.id; // Suponiendo que el ID del profesional está en req.user
    HistorialRecetas.getByProfesionalId(profesionalId, (err, results) => {
      if (err) {
        console.error("Error al obtener historial de recetas:", err);
        return res.status(500).json({ error: err.message });
      }
      res.render('dash-profesional/historial-recetas', { recetas: results });
    });
  } catch (error) {
    console.error("Error al obtener historial de recetas:", error);
    res.status(500).json({ error: "Error al obtener historial de recetas" });
  }
};

