const express = require('express');
const router = express.Router();
//var jsonParser = bodyParser.json();
const QueryController = require('../controllers/querys.controller');
var fs = require('fs');

router.get('/health', QueryController.getHealth);

//passa uma consulta para o banco
router.post('^/:database/query', QueryController.postQuery);

//Lista todas as tabelas do banco
router.get('^/:database', QueryController.postShowTables);

//Lista dados de uma tabela
router.get('^/:database/:table', QueryController.getTable);