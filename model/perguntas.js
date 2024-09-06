const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/postgres");
const {ResolucaoModel} = require('./resolucao');



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
  liberado: {
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: false // Desabilita os campos de timestamps
});

// Sincroniza com o BD
PerguntaModel.hasMany(ResolucaoModel, {
  as: 'resolucoes'
});
ResolucaoModel.belongsTo(PerguntaModel, {
  foreignKey: 'perguntaId',
  as: 'pergunta'
});

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
  save: async function (pergunta, pontos, nivel, opcaoCerta, opcao1, opcao2, opcao3, liberado) {
    console.log("...");
    console.log("Dados recebidos:",pergunta,pontos,nivel,opcaoCerta,opcao1,opcao2,opcao3, liberado);
    const pergIns = await PerguntaModel.create({
      pergunta: pergunta,
      pontos: pontos,
      nivel: nivel,
      opcaoCerta: opcaoCerta,
      opcao1:opcao1,
      opcao2: opcao2,
      opcao3: opcao3,
      liberado: liberado
    });
    return pergIns;
  },

  // SELECT da pergunta pelo id
  getPergunta: async function(id) {
    const pergunta = await PerguntaModel.findByPk(id);
    return pergunta;
  },


  // Atualiza resolvido para true no banco de dados
  liberaPergunta: async function(id) {

    const pergunta = await PerguntaModel.findByPk(id);
    const nivel = pergunta.nivel;
    const perguntas = await PerguntaModel.findAll({where: {nivel: nivel+1}});
    if(perguntas) {
      await PerguntaModel.update({ liberado: true}, {where: {nivel: nivel+1}});
      return perguntas;
    }
    return null;
  },

  atualizaNivel: async function(id) {
    const pergunta  = await PerguntaModel.findByPk(id);

    await pergunta.update({nivel: 0});
  },
  
  // Exporta o Model
  Model: PerguntaModel
};
