const express = require("express");
const router = express.Router();
const sequelize = require("../helpers/postgres");

const PerguntaModel = require('../model/perguntas');
const UsuarioModel = require('../model/usuarios');
const { ResolucaoModel, save } = require('../model/resolucao');

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true });

    let usuario1 = await UsuarioModel.save('Fulano', 0);
    let nivel01_01 = await PerguntaModel.save('No Sistema Internacional de Unidades (SI), há sete grandezas de base, dentre elas comprimento, L, massa, M, e tempo, T. As grandezas físicas foram organizadas em um sistema de dimensões, decidido por convenção, e cada uma das sete grandezas de base do SI é considerada como tendo uma dimensão própria, sendo as demais definidas em função das grandezas de base. Por exemplo, a dimensão da grandeza força no SI é M · L · T– 2. Em um sistema de unidades hipotético, no qual as grandezas de base sejam massa, M, velocidade, V, e tempo, T, a dimensão da grandeza força seria', 100, 1,'M · V · T–1','M · V–1 · T','M · V · T–3','M2 · V2 · T–1', true);
    let nivel01_02 = await PerguntaModel.save('Uma sonda metálica maciça e homogênea, com densidade de 8,0 g/cm3, quando totalmente submersa na água tem peso aparente 10 N menor do que seu peso real. Considere: g = 10m/s2 e a densidade da água 1,0 g/cm3. Assinale a alternativa que expressa o peso real da sonda metálica.3', 100, 1,'80 N','57 N','90 N','114 N', true);
    let nivel01_03 = await PerguntaModel.save('“A Matadeira” era o apelido dado, pelos sertanejos conselheiristas, ao canhão modelo Withworth 32 de fabricação inglesa e pertencente à Marinha do Brasil. Com cerca de 1,8 tonelada, era considerado impróprio para transporte em terrenos acidentados, como o local da batalha de Canudos, mas, mesmo com todas as dificuldades, foi utilizado pelo Exército Brasileiro à época. Seu tiro alcançava cerca de 3 800 m em aproximadamente 10 s, na posição de alcance máximo. Nas mesmas condições de alcance máximo, suponha que a bala do canhão responsável pela queda do Forte de Antônio Conselheiro atingiu seu alvo em 0,5 s após o disparo. Desprezando quaisquer forças dissipativas, podemos afirmar corretamente que, em relação ao Forte, “a Matadeira” estava posicionada a aproximadamente', 100, 1,'190 m.','380 m.','760 m.','1.6 m.', true);
    let nivel01_04 = await PerguntaModel.save('A expressão “anos-luz” é utilizada em muitas representações artísticas, de tirinhas a quadros, de músicas a poemas entre outras. Entretanto, qual é, realmente, o valor aproximado de 1 ano-luz? Adote: velocidade da luz c = 3,0x108 m/s e 1 ano = 3,2 x107s. Podemos afirmar que a resposta correta a essa pergunta é, aproximadamente,', 100, 1,'9,6×1015 m.','1,0 × 109 m/s.','1,1×1011 s.','2,6×1012 s.', true);
    let nivel01_05 = await PerguntaModel.save('Em determinadas condições, nanopartículas podem ser impulsionadas como um foguete pela simples interação com o meio. Admita que, em um dado instante, uma dessas partículas, com massa de 9,0 × 10−26 kg, adquire velocidade de 2,0 × 102 m/s. Com base nessas informações, a ordem de grandeza da quantidade de movimento dessa partícula', 100, 1,'10−23','10−20','10−21','10−22', true);

    let nivel02_01 = await PerguntaModel.save('Nas transmissões de corridas automobilísticas, é perceptível que a frequência do som emitido pelo motor de um automóvel, captado por um microfone estático quando o automóvel dele se aproxima, é diferente da frequência quando ele se afasta. A frequência do som captado quando o automóvel se aproxima e a frequência do som captado quando se afasta, em relação à frequência do som emitido pelo motor, são, respectivamente,', 100, 2,'maior e menor.','gual e maior.','igual e menor.','menor e igual.', false);
    let nivel02_02 = await PerguntaModel.save('O menor tempo medido em laboratório ocorreu na escala de zeptossegundos e corresponde ao intervalo ∆t em que uma partícula de luz percorre a distância que separa os centros atômicos de uma única molécula de hidrogênio. Uma unidade de zeptossegundo equivale a 10–21 segundo. Admita que a velocidade da luz seja de 3 × 108 m/s e que a distância entre os centros atômicos de uma molécula de hidrogênio seja de 7,2 × 10–11 metro. Nessas condições, no referencial da partícula de luz, o valor de ∆t, em zeptossegundos, é igual a:', 250, 2,'240','120','180','320', false);
    let nivel02_03 = await PerguntaModel.save('No sistema cardiovascular de um ser humano, o coração funciona como uma bomba, com potência média de 10W, responsável pela circulação sanguínea. Se uma pessoa fizer uma dieta alimentar de 2500 kcal diárias, a porcentagem dessa energia utilizada para manter sua circulação sanguínea será, aproximadamente, igual a Note e adote 1 cal = 4J', 250, 2,'9%','1%','4%','20%', false);

    let nivel03_01 = await PerguntaModel.save('No painel dos carros a combustão interna, uma lâmpada de advertência se acende quando a temperatura do líquido de arrefecimento do motor chega a 115 ºC. Esse líquido é uma mistura que tem calor específico igual a 0,6 cal/(g × ºC) e sua densidade pode ser igualada à da água, que é de 1000 g/L. Considere um veículo que usa 10 L de líquido de arrefecimento para manter a temperatura do motor controlada. Em uma eventual falha no processo de resfriamento desse líquido, a menor quantidade de calor acumulada para que, a partir da temperatura de 15 ºC, a luz de advertência se acenda é de', 500, 3,'600 kcal.','750 kcal.','1200 kcal.','1500 kcal.', false);
    let nivel03_02 = await PerguntaModel.save('Um reservatório de água sem tampa apresentou uma trinca em seu fundo de tal forma que, para repará-lo, teve de ser esvaziado. Quando o reservatório foi novamente preenchido com água, observou-se que o tempo para o endurecimento do reparo não tinha sido suficiente, pois, assim que o nível de água atingiu 2 m em relação ao fundo, o reparo foi desfeito e a água começou a vazar. Sendo a pressão atmosférica igual a 1 × 105 Pa, a aceleração da gravidade igual a 10 m/s2 e a densidade da água igual a 1 × 103 kg/m3, a pressão a partir da qual a água começou a vazar foi de', 500, 3,'0,2 × 105 Pa.','1,0 × 105 Pa.','0,4 × 105 Pa.','1,2 × 105 Pa.', false);

    let perguntas = [nivel01_01,nivel01_02,nivel01_03,nivel01_04, nivel01_05, nivel02_01,nivel02_02,nivel02_03,nivel03_01,nivel03_02]

    let usuarios = [usuario1]

    await populaResolucao(perguntas, usuario1);

    res.json({ status: true, perguntas: perguntas, usuarios: usuarios});

});

async function populaResolucao(perguntas, usuario) {
    perguntas.forEach(async pergunta => {
        await save(pergunta.id, usuario.id)
    })
}

module.exports = router;
