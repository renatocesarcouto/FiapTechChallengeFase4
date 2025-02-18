const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Post = require('../models/Post');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    { expiresIn: '24h' }
  );
};

// Rota para login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let user = await Teacher.authenticate(email, password);
    if (user) {
      return res.json({ user: { ...user, role: 'teacher' }, token: generateToken(user) });
    }
    
    res.status(401).json({ error: 'Credenciais inválidas no login' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para listar professores(as)
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.getAll();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/students', async (req, res) => {
  try {
    const students = await Student.getAll();
    res.json(students);
  } catch (error) {
    console.error('Erro ao captar estudantes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para listar todos os posts para alunos
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para listar todos os posts para professores
router.get('/posts/admin', async (req, res) => {
  try {
    const allPosts = await Post.getAllForAdmin();
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar posts
router.get('/posts/search', async (req, res) => {
  try {
    const { term } = req.query;
    const posts = await Post.search(term);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter um post específico
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.getById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar um novo post
router.post('/posts', upload.none(), async (req, res) => {
  try {
    const { title, author, content, teacher_id } = req.body;
    const newPost = await Post.create(title, author, content, teacher_id);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para atualizar um post existente
router.put('/posts/:id', upload.none(), async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const updatedPost = await Post.update(req.params.id, title, author, content);
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para deletar um post
router.delete('/posts/:id', async (req, res) => {
  try {
    await Post.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Teachers routes
router.post('/teachers', upload.none(), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newTeacher = await Teacher.create(name, email, password);
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/teachers/:id', upload.none(), async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedTeacher = await Teacher.update(req.params.id, name, email);
    if (updatedTeacher) {
      res.json(updatedTeacher);
    } else {
      res.status(404).json({ error: 'Professor(a) não encontrado(a)' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/teachers/:id', async (req, res) => {
  try {
    const hasRelatedPosts = await Post.existsByTeacherId(req.params.id);
    if (hasRelatedPosts) {
      return res.status(400).json({ 
        error: 'Impossível excluir professor(a) com post publicado. Por favor apague o(s) seu(s) pot(s) primeiro.' 
      });
    }
    await Teacher.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Students routes
router.post('/students', upload.none(), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newStudent = await Student.create(name, email, password);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/students/:id', upload.none(), async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedStudent = await Student.update(req.params.id, name, email);
    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).json({ error: 'Estudante(a) não encontrado(a)' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/students/:id', async (req, res) => {
  try {
    await Student.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter um professor específico
router.get('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.getById(req.params.id);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ error: 'Professor não encontrado(a)' });
    }
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: 'Error interno do servidor' });
  }
});

// Rota para obter um estudante específico
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.getById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Estudante não encontrado(a)' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno do servidor' });
  }
});

module.exports = router;