const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');
const { Op } = require('sequelize');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async getCursos (req, res) {
    const {data_inicial, data_final} = req.query;
    const where = {};

    // const where = {
    //   data_inicial: {
    //     [Op.gte]: data,
    //     [Op.lte]: data
    //   },
    // }

    //se existerem os param, cria um propriedade {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    //se existir data inicial, adicionamos a prop gte com valor
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    //se existir data final, adicionamos a prop gte com valor
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listCourses = await cursoServices.getAllRegisters(where);
      return res.status(200).json(listCourses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = CursoController;