const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const router = express.Router();

// Listar todos os cursos
router.get('/', async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
});

// Listar cursos criados por um professor específico
router.get('/my-courses', async (req, res) => {
  const { teacherId } = req.query;
  const courses = await Course.findAll({ where: { teacher_id: teacherId } });
  res.json(courses);
});

// Criar novo curso
router.post('/', async (req, res) => {
  const { title, description, teacher_id } = req.body;
  const course = await Course.create({ title, description, teacher_id });
  res.json(course);
});

module.exports = router;
