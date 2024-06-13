const fs = require("fs");
const path = require("path");
const Prescripcion = require("../models/Prescripcion");
const MedicamentosPrescripcion = require("../models/MedicamentosPrescripcion");
const PrestacionesPrescripcion = require("../models/PrestacionesPrescripcion");
const upload = require("../middlewares/multerMiddleware");

exports.getAllPrescripciones = (req, res) => {
  Prescripcion.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getPrescripcionById = (req, res) => {
  const id = req.params.id;
  Prescripcion.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createPrescripcion = (req, res) => {
  const data = req.body;
  Prescripcion.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const prescripcionId = result.insertId;

    const medicamentos = data.medicamentos;
    const prestaciones = data.prestaciones;

    if (medicamentos && medicamentos.length > 0) {
      medicamentos.forEach((med) => {
        med.prescripcion_id = prescripcionId;
        MedicamentosPrescripcion.create(med, (err) => {
          if (err) return res.status(500).json({ error: err.message });
        });
      });
    }

    if (prestaciones && prestaciones.length > 0) {
      prestaciones.forEach((pres) => {
        pres.prescripcion_id = prescripcionId;
        PrestacionesPrescripcion.create(pres, (err) => {
          if (err) return res.status(500).json({ error: err.message });
        });
      });
    }

    // Crear entrada en HistorialRecetas
    const historialData = {
      profesional_id: data.profesional_id,
      paciente_id: data.paciente_id,
      fecha: data.fechaPrescripcion,
      medicamentos: JSON.stringify(medicamentos),
      acciones: "Creación de prescripción",
    };

    HistorialRecetas.create(historialData, (err) => {
      if (err) return res.status(500).json({ error: err.message });
    });

    res
      .status(201)
      .json({ message: "Prescripción creada con éxito", id: prescripcionId });
  });
};

exports.updatePrescripcion = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Prescripcion.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Crear entrada en HistorialRecetas
    const historialData = {
      profesional_id: data.profesional_id,
      paciente_id: data.paciente_id,
      fecha: new Date(), // Puedes ajustar la fecha según sea necesario
      medicamentos: JSON.stringify(data.medicamentos),
      acciones: "Actualización de prescripción",
    };

    HistorialRecetas.create(historialData, (err) => {
      if (err) return res.status(500).json({ error: err.message });
    });

    res.json({ message: "Prescripción actualizada con éxito" });
  });
};

exports.deletePrescripcion = (req, res) => {
  const id = req.params.id;
  Prescripcion.getById(id, (err, prescripcion) => {
    if (err) return res.status(500).json({ error: err.message });

    Prescripcion.delete(id, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Crear entrada en HistorialRecetas
      const historialData = {
        profesional_id: prescripcion.profesional_id,
        paciente_id: prescripcion.paciente_id,
        fecha: new Date(), // Puedes ajustar la fecha según sea necesario
        medicamentos: JSON.stringify(prescripcion.medicamentos),
        acciones: "Eliminación de prescripción",
      };

      HistorialRecetas.create(historialData, (err) => {
        if (err) return res.status(500).json({ error: err.message });
      });

      res.json({ message: "Prescripción eliminada con éxito" });
    });
  });
};

// Función para subir una prescripción con archivo adjunto
exports.uploadPrescripcion = async (req, res) => {
  try {
    // Procesar la subida de archivo usando multer
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error("Error al subir el archivo:", err);
        return res.status(500).json({ error: "Error al subir el archivo" });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No se encontró el archivo para subir" });
      }

      const { profesional_id, paciente_id, fechaPrescripcion } = req.body;

      const nuevaPrescripcion = {
        profesional_id,
        paciente_id,
        fecha: fechaPrescripcion,
        archivo: `/uploads/${req.file.filename}`, // Ruta del archivo guardado
      };

      Prescripcion.create(nuevaPrescripcion, async (err, result) => {
        if (err) {
          console.error("Error al crear la prescripción:", err);
          return res
            .status(500)
            .json({ error: "Error al crear la prescripción" });
        }

        const prescripcionId = result.insertId;

        const historialData = {
          profesional_id,
          paciente_id,
          fecha: fechaPrescripcion,
          medicamentos: JSON.stringify(req.body.medicamentos),
          acciones: "Creación de prescripción",
        };

        HistorialRecetas.create(historialData, (err) => {
          if (err) {
            console.error("Error al crear el historial de recetas:", err);
            return res
              .status(500)
              .json({ error: "Error al crear el historial de recetas" });
          }
        });

        res.json({
          mensaje: "Archivo subido con éxito",
          prescripcion: nuevaPrescripcion,
        });
      });
    });
  } catch (error) {
    console.error("Error al subir la prescripción:", error);
    res.status(500).json({ error: "Error al subir la prescripción" });
  }
};
