const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/postgres");
const {ResolucaoModel} = require('./resolucao');

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
  // Exporta o Model
  Model: UsuarioModel
};
