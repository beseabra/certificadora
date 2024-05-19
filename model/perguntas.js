const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/postgres");

// Cria a tabela 'Perguntas' com o Model
const PerguntaModel = sequelize.define('pergunta', {
  pergunta: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pontos: {
    type: DataTypes.INTEGER
  },
  nivel: {
    type: DataTypes.INTEGER
  },
  opcaoCerta: {
    type: DataTypes.STRING
  },
  opcao1: {
    type: DataTypes.STRING
  },
  opcao2: {
    type: DataTypes.STRING
  },
  opcao3: {
    type: DataTypes.STRING
  },
  resolvido: {
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: false // Desabilita os campos de timestamps
});

// Sincroniza com o BD
PerguntaModel.sync({ alter: true }); // Atualiza o BD
console.log("A tabela foi atualizada!");

// Exporta as funções do Modelo
module.exports = {

  // SELECT dos dados da tabela

  list: async function (filtro) {
    let queryOptions = {};
    if (filtro) {
    queryOptions.where = filtro;
    }
    const perguntas = await PerguntaModel.findAll(queryOptions);
    return perguntas;
  },


  // INSERT de dados na tabela
  save: async function (pergunta, pontos, nivel, opcaoCerta, opcao1, opcao2, opcao3, resolvido) {
    console.log("...");
    console.log("Dados recebidos:",pergunta,pontos,nivel,opcaoCerta,opcao1,opcao2,opcao3,resolvido);
    const pergIns = await PerguntaModel.create({
      pergunta: pergunta,
      pontos: pontos,
      nivel: nivel,
      opcaoCerta: opcaoCerta,
      opcao1:opcao1,
      opcao2: opcao2,
      opcao3: opcao3,
      resolvido: resolvido
    });
    return pergIns;
  },

  // SELECT da pergunta pelo id
  getPergunta: async function(id) {
    const pergunta = await PerguntaModel.findByPk(id);
    return pergunta;
  },


  // Atualiza resolvido para true no banco de dados
  updateResolvido: async function(id) {
    const pergunta = await PerguntaModel.findByPk(id);
    if(pergunta) {
      await pergunta.update({ resolvido: true});
      return pergunta;
    }
    return null;
  },
  
  // Exporta o Model
  Model: PerguntaModel
};
