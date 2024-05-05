const Sequelize = require('sequelize');

const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async getMatriculaByStudent(req, res) {
    const { student_id } = req.params;

    try {
      const listMatriculaByStudent = await matriculaServices.getAndCountRegisters(
        {
          where : {
            estudante_id : Number(student_id),
            status: 'matriculado'
          },
          limit: 2,
          order: [['id', 'DESC']]
        }
      );
      return res.status(200).json(listMatriculaByStudent.count);
    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }

  async getFullCourses (req, res) {
    const maxStudent = 2;
    try {
      const fullCourses = await matriculaServices.getAndCountRegisters(
        {
          where: {
            status : 'matriculado'
          },
          attributes : ['curso_id'],
          group: ['curso_id'],
          having: Sequelize.literal(`count(curso_id) >= ${maxStudent}`)
        }
      );
      return res.status(200).json(fullCourses.count);
    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }
}

module.exports = MatriculaController;