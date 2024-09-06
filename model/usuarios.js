const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/postgres");
const { ResolucaoModel } = require('./resolucao');
const { Model: PerguntaModel } = require('./perguntas');

// Cria a tabela 'Usuários' com o Model
const UsuarioModel = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pontuacao: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  timestamps: false // Desabilita os campos de timestamps
});

UsuarioModel.hasMany(ResolucaoModel, {
  as: 'resolucoes'
});
ResolucaoModel.belongsTo(UsuarioModel, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});



// Sincroniza com o BD
UsuarioModel.sync({ alter: true }); // Atualiza o BD
console.log("A tabela de Usuários foi atualizada!");


module.exports = {
  save: async function (nome, pontuacao) {
    const usuario = await UsuarioModel.create({
      nome: nome,
      pontuacao: pontuacao,
    })
    return usuario;
  },

  updatePontuacao: async function (idUsuario, idPergunta) {

    console.log('idUsuario:', idUsuario);
    console.log('idPergunta:', idPergunta);
    console.log(PerguntaModel);

    const usuario = await UsuarioModel.findByPk(idUsuario);
    const pergunta = await PerguntaModel.findByPk(idPergunta);
    const resolucao = await ResolucaoModel.findOne({where: {perguntaId: idPergunta}});
  
  
    await UsuarioModel.update({pontuacao: (usuario.pontuacao + pergunta.pontos)}, {where:{id: idUsuario}}); // Atualiza a pontuação do usuário
    await PerguntaModel.update({pontos: Math.round(pergunta.pontos / 2)}, {where: {id: idPergunta}}); // Atualiza a pontuação fornecida pela pergunta após ser resolvida
  },

  getUsuario: async function (id) {
    const usuario = await UsuarioModel.findByPk(id);
    return usuario;
  },

  // Exporta o Model
  Model: UsuarioModel
};

