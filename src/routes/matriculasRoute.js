const { Router } = require('express');
const MatriculaController = require('../controllers/MatriculaController.js');


const matriculaController = new MatriculaController();

const router = Router();

router.get('/matriculas', (req, res)=> matriculaController.getAll(req, res));
router.get('/matriculas/:id', (req, res) => matriculaController.getById(req, res));
router.post('/matriculas', (req, res) => matriculaController.createNew(req, res));
router.put('/matriculas/:id', (req, res) => matriculaController.updateData(req, res));
router.delete('/matriculas/:id', (req, res) => matriculaController.exclui(req, res));


module.exports = router;