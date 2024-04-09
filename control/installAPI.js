const express = require("express");
const router = express.Router();
const sequelize = require("../helpers/postgres");

const PerguntaModel = require('../model/perguntas');

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true });

    let nivel01_01 = await PerguntaModel.save('text', 100, 1);
    let nivel01_02 = await PerguntaModel.save('text', 100, 1);
    let nivel01_03 = await PerguntaModel.save('text', 100, 1);

    let nivel02_01 = await PerguntaModel.save('text', 200, 2);
    let nivel02_02 = await PerguntaModel.save('text', 200, 2);
    let nivel02_03 = await PerguntaModel.save('text', 200, 2);

    let nivel03_01 = await PerguntaModel.save('text', 300, 3);
    let nivel03_02 = await PerguntaModel.save('text', 300, 3);
    let nivel03_03 = await PerguntaModel.save('text', 300, 3);

    let perguntas = [nivel01_01, nivel02_01, nivel03_01];


    res.json({ status: true, perguntas: perguntas });
});

module.exports = router;
