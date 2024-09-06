const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');

// Configuração módulo dotenv
require("dotenv").config();

const perguntasModel = require('./model/perguntas');
const { list, getResolucao, updateResolvido, updateQtdResolucao } = require('./model/resolucao');
const { updatePontuacao, getUsuario } = require('./model/usuarios');

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
    const resolucoes = await list({ usuarioId: 1 });
    const usuario = await getUsuario('1');

    // Renderiza o template Mustache e passa os dados das perguntas
    res.render('index', { perguntas: perguntas, resolucoes: resolucoes, usuario: usuario });
  } catch (error) {
    console.error('Erro ao recuperar perguntas:', error);
    res.status(500).send('Erro ao carregar perguntas');
  }
});


//Rota para as perguntas
app.get('/pergunta/:id', async (req, res) => {
  try {
    const pergunta = await perguntasModel.getPergunta(req.params.id);
    const resolucao = await getResolucao(req.params.id);
    res.render('pergunta', { pergunta: pergunta, resolucao: resolucao });
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


// Rota para atualizar quando uma questão é resolvida
app.post('/question/update-resolvido/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(typeof('1'));
  try {
    const autalizaPontuacao = await updatePontuacao('1', id);
    const updateQuestion = await updateResolvido(id);
    const atualizaQtd = await updateQtdResolucao(id);
    const autalizaLibera = await perguntasModel.liberaPergunta(id);
    const atualizaResolvido = await perguntasModel.atualizaNivel(id);
    
    if (updateQuestion) {
      res.json({ status: "sucess", message: "Pergunta resolvida atualizada com sucesso" });
    } else {
      res.status(404).json({ status: "error", message: "Pergunta nao encontrada" });
    }
  } catch (error) {
    console.error("Error ao atualizar pergunta resolvida: ", error);
    res.status(500).json({ status: "error", message: "Error ao atualizar pergunta resolvida" });
  }

});
