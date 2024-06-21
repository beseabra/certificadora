const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/postgres");
const { PerguntaModel } = require("./perguntaModel");

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
  }
}, {
  timestamps: false // Desabilita os campos de timestamps
});

// Define as associações entre os modelos
UsuarioModel.hasMany(PerguntaModel, {
  foreignKey: 'usuario_id'
});
PerguntaModel.belongsTo(UsuarioModel, {
  foreignKey: 'usuario_id'
});

// Sincroniza com o BD
UsuarioModel.sync({ alter: true }); // Atualiza o BD
console.log("A tabela de Usuários foi atualizada!");

module.exports = {
const list = async function () {
  const usuarios = await UsuarioModel.findAll();
  return usuarios;
},

const save = async function (nome) {
  const usuario = await UsuarioModel.create({
    nome: nome
  });
  return usuario;
},

const getUsuario = async function(id) {
  const usuario = await UsuarioModel.findByPk(id);
  return usuario;
},

// Exporta o Model
  Model: UsuarioModel
};
