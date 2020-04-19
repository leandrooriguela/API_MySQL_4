const express = require('express');
const router = express.Router();
const QueryController = require('../controllers/query.controller');

//passa uma consulta para o banco
router.post('^/:database/query', jsonParser , QueryController.postQuery);

//Lista todas as tabelas do banco
router.get('^/:database', QueryController.postShowTables);