const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor(){
    super(pessoaServices);
  }

  async getMatriculas(req, res) {
    const { student_id } = req.params;
    try {
      const matriculasList = await pessoaServices.getMatriculasByStudent(Number(student_id));
      return res.status(200).json(matriculasList);
    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }

  async getAllCourses(req, res) {
    const { student_id } = req.params;
    try {
      const matriculasList = await pessoaServices.getCoursesByStudent(Number(student_id));
      return res.status(200).json(matriculasList);
    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }

  async getAllPeople (req, res) {
    try {
      const allPeople = await pessoaServices.getPeopleByScope();
      return res.status(200).json(allPeople);
    } catch (err) {
      return res.status(500).json( {error: err.message} );
    }
  }

  async cancelStudentRegister (req, res) {
    const { student_id } = req.params;
    try {
      await pessoaServices.cancelStudentAndMatricula (Number(student_id));
      return res.status(200).json( { message: `Matriculas res. estudante ${student_id} canceladas `} );
    } catch (err) {

    }
  }
}

module.exports = PessoaController;