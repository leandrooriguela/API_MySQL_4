const mysql = require('../mysql').pool;
var fs = require('fs');

exports.getHealth = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('select version()', process.env.MYSQL_DATABASE, 
        (error, result, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
        });
    
        var moment = require('moment');
        agora = moment()
        // console.log('Agora:'+ agora.format('YYYY-MM-DD HH:mm:ss'));
        mysql.query("update health set datahora = '"+agora.format('YYYY-MM-DD HH:mm:ss')+"';", 'apimysql4',function(err, result2) {
            mysql.query("show databases", process.env.MYSQL_DATABASE,function(err, result_database) {
                if(err) {
                    res.status(500).send({
                        msg: err,
                    });
                }
                res.status(200).send({
                    status: 'UP',
                    mysql: result[0]['version()'],
                    databases: result_database,
                });
            });
        });
    });
};

//passa uma consulta para o banco
//router.post('^/:database/query', jsonParser, QueryController.postQuery);
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

//Lista dados de uma tabela
exports.getTable = (req, res, next) => {
    mysql.query('select * from '+req.params.table, req.params.database, function (error, result) {
        if(error){
            res.status(401).send({
                   msg: error.sqlMessage
            });
            return;
        }
        res.status(200).send({
               result: result
        });

    });
};