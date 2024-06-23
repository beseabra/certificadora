const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/postgres");


const ResolucaoModel = sequelize.define('resolucao', {
    resolucao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    resolvido: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false // Desabilita os campos de timestamps
});



ResolucaoModel.sync({ alter: true }); // Atualiza o BD
console.log("A tabela de Usuários foi atualizada!");

async function save(pergunta_id, usuario_id) {
    const resolucao = await ResolucaoModel.create({
        resolvido: false,
        quantidade: 0,
        perguntaId: pergunta_id,
        usuarioId: usuario_id
    });
    return resolucao;
}

async function list(filtro) {
    let queryOptions = {};
    if(filtro) {
        queryOptions.where = filtro;
    }
    return await ResolucaoModel.findAll(queryOptions);
}

async function updateQtdResolucao(id) {
    const resolucao = await ResolucaoModel.findByPk(id);
    await ResolucaoModel.update({quantidade: resolucao.quantidade+1}, {where:{perguntaId: id}});
}

async function updateResolvido(id) {
    await ResolucaoModel.update({resolvido: true}, {where: {perguntaId: id}})
}

async function getResolucao(id_pergunta) {
    const resolucao = await ResolucaoModel.findOne({where: {perguntaId: id_pergunta}});
    return resolucao;
}

module.exports = {ResolucaoModel, save, list, updateQtdResolucao, updateResolvido, getResolucao};
