const mysql = require('../mysql').pool;

//passa uma consulta para o banco
exports.postQuery = (req, res, next) => {
    req.body.sql
    mysql.query(req.body.sql, req.params.database, function (error, result) {
        if(error){
            res.status(401).send({
                msg: error.sqlMessage
            });
            return;
        }
        // console.log(result);
        res.status(200).send({
            results: result
        });
    });
};

//Lista todas as tabelas do banco
exports.postShowTables = (req, res, next) => {
    mysql.query('show tables', req.params.database, function (err, result) {
        res.status(200).send({
            result: result,
        });
    });
};