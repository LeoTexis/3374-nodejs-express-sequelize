const dataSource = require ('../database/models');
const Services = require ('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services ('Matricula');
  }

  async getMatriculasByStudent(id) {
    const student = await super.getRegisterById(id);
    const matriculasList = await student.getRegisteredCourse();
    return matriculasList;
  }

  async getCoursesByStudent(id) {
    const student = await super.getRegisterById(id);
    const matriculasList = await student.getAllCourses();
    return matriculasList;
  }

  async getPeopleByScope () {
    const peopleList = await super.getRegisterByScope('allRegisters');
    return peopleList;
  }

  async cancelStudentAndMatricula(studentId) {
    return dataSource.sequelize.transaction( async  (transacao)=>{
      await super.updateRegister({ ativo: false}, {id: studentId}, transacao);
      await this.matriculaServices.updateRegister({status: 'cancelado'}, {estudante_id: studentId}, transacao);
    });
  }
}

module.exports = PessoaServices;