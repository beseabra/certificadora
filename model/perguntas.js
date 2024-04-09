const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/postgres");

// Cria a tabela 'Perguntas' com o Model
const PerguntaModel = sequelize.define('pergunta', {
  pergunta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pontos: {
    type: DataTypes.INTEGER
  },
  nivel: {
    type: DataTypes.INTEGER
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
  save: async function (pergunta, pontos, nivel) {
    console.log("...");
    console.log("Dados recebidos:", pergunta, pontos, nivel);
    const pergIns = await PerguntaModel.create({
      pergunta: pergunta,
      pontos: pontos,
      nivel: nivel
    });
    return pergIns;
  },

  // SELECT da pergunta pelo id
  getPergunta: async function(id) {
    const pergunta = await PerguntaModel.findByPk(id);
    return pergunta;
  },
  // Exporta o Model
  Model: PerguntaModel
};
