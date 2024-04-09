const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');

// Configuração módulo dotenv
require("dotenv").config();

const perguntasModel = require('./model/perguntas');


const app = express();

// Configuração do Mustache como mecanismo de visualização
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));



// Configuração do Body Parser para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar o diretório de arquivos estáticos
app.use(express.static('public'));

// Rota principal
app.get('/', async (req, res) => {
  try {
    let filtro = {};
    if (req.query.nivel) {
      filtro.nivel = req.query.nivel;
    }
    // Recupera todas as perguntas do banco de dados
    const perguntas = await perguntasModel.list(filtro);
    // Renderiza o template Mustache e passa os dados das perguntas
    res.render('index', { perguntas: perguntas });
  } catch (error) {
    console.error('Erro ao recuperar perguntas:', error);
    res.status(500).send('Erro ao carregar perguntas');
  }
});


//Rota para as perguntas
app.get('/pergunta/:id', async (req, res) => {
  try {
    const pergunta = await perguntasModel.getPergunta(req.params.id);
    res.render('pergunta', { pergunta: pergunta });
  } catch (error) {
    console.error('Erro ao recuperar pergunta:', error);
    res.status(500).send('Erro ao carregar pergunta');
  }
});

// Rota login
app.get('/login', (req, res) => {
  res.render('login');
});

// Rota para popular tabela
app.use("/install", require('./control/installAPI'))

// Configuração da porta do servidor
app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
});
