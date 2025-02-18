const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { pool } = require('./db');

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode}`);
  next();
});

// Middleware para parsing de JSON no corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importação das rotas
const routes = require('./routes/routes');

// Uso das rotas com o prefixo '/'
app.use('/', routes);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Teste básico do servidor
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('OK');
  } catch (error) {
    console.log(error)
    res.status(500).send('Erro ao conectar ao banco de dados');
  }
});