const converterIds = require('../utils/stringConverterHelpet');

class Controller {
  constructor (entityService){
    this.entityService = entityService;
  }

  async getAll(req, res) {
    try {
      const listOfPeople = await this.entityService.getAllRegisters();
      return res.status(200).json(listOfPeople);
    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const register = await this.entityService.getRegisterById(Number(id));
      return res.status(200).json(register);
    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }

  async getOne(req, res) {
    const { ...params } = req.params;
    const data = converterIds(params);
    try {
      const oneRegister = await this.entityService.getOneRegister(data);
      return res.status(200).json(oneRegister);
    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }

  async createNew(req, res) {
    const dataToCreate = req.body;
    try {
      const newRegister = await this.entityService.createRegister(dataToCreate);
      return res.status(200).json(newRegister);
    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await this.entityService.deleteRegister(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });


    } catch (err) {
      return res.status(500).json({err: err.message});
    }
  }

  async updateData(req, res) {
    const { ...params } = req.params;
    const updatedData = req.body;

    const where = converterIds(params);
    try {
      const isUpdated = await this.entityService.updateRegister(updatedData, ...where);

      if (!isUpdated) {
        return res.status(400).json( { message: 'data was not updated'} );
      }

      return res.status(200).json( { message: `id : ${id} updated!`} );
    } catch (err) {
      return res.status(500).json({err : err.message});
    }
  }
}


module.exports = Controller;