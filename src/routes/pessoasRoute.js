const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get('/pessoas', (req, res)=> pessoaController.getAll(req, res));
router.get('/pessoas/all', (req, res)=> pessoaController.getAllPeople(req, res));
router.get('/pessoas/:id', (req, res) => pessoaController.getById(req, res));
router.post('/pessoas', (req, res) => pessoaController.createNew(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.updateData(req, res));
router.put('/pessoas/:student_id/cancel', (req, res)=> pessoaController.cancelStudentRegister(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.delete(req, res));
router.get('/pessoas/:student_id/matriculas', (req, res) => pessoaController.getMatriculas(req, res));
router.get('/pessoas/:student_id/matriculas/all', (req, res) => pessoaController.getAllCourses(req, res));
router.get('/pessoas/:student_id/matriculas/confirmed', (req, res) => matriculaController.getMatriculaByStudent(req, res));
router.get('/pessoas/matriculas/full', (req, res) => matriculaController.getFullCourses(req, res));
router.get('/pessoas/:student_id/matriculas/:id', (req, res) => pessoaController.getOne(req, res));
router.post('/pessoas/:student_id/matriculas', (req, res) => matriculaController.createNew(req, res));
router.put('/pessoas/:student_id/matriculas/:id', (req, res) => matriculaController.updateData(req, res));
router.delete('/pessoas/:student_id/matriculas/:id', (req, res) => matriculaController.delete(req, res));

module.exports = router;