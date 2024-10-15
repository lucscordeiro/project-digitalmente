const express = require('express');
const cors = require('cors'); 
const app = express();
// const teste = require('./config/database');
const sequelize = require('../digitalmente-backend/config/database'); // Arquivo de conexão com o DB
const userRoutes = require('../digitalmente-backend/routes/users'); // Importa as rotas de usuários
const courseRoutes = require('../digitalmente-backend/routes/courses'); // Importa as rotas de cursos

app.use(cors()); // Habilitando o CORS
app.use(express.json()); // Middleware para parsear JSON

// Define as rotas da API
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 3000; // Define a porta do servidor

// Conecta ao banco de dados e inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.'); // Mensagem de sucesso na conexão
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // Mensagem informando que o servidor está rodando
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err)); // Mensagem de erro se a conexão falhar
