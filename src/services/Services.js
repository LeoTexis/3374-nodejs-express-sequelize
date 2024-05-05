const dataSource = require('../database/models');


class Services {
  constructor(modelName) {
    this.model = modelName;
  }

  async getAllRegisters(where = {}) {
    return dataSource[this.model].findAll({where: {...where}});
  }

  async getRegisterByScope (scope) {
    return dataSource[this.model].scope(scope).findAll();
  }

  async getRegisterById(id) {
    return dataSource[this.model].findByPk(id);
  }

  async getOneRegister(data) {
    return dataSource[this.model].findOne({where: {...data}});
  }

  async getAndCountRegisters(options) {
    return dataSource[this.model].findAndCountAll({...options});
  }

  async createRegister(dataToCreate) {
    return dataSource[this.model].create(dataToCreate);
  }

  async deleteRegister(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }

  async updateRegister(updatedData, where, transacao = {}) {
    const listOfUpdatedData = await dataSource[this.model].update(updatedData, {
      where: {...where},
      transaction: transacao
    });

    return true;
  }
}

module.exports = Services;