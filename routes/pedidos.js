const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidos.controller');

//Retorna todos os Pedidos
router.get('/', PedidosController.getPedidos);

//Insere um Pedido
router.post('/', PedidosController.postPedidos);

//Retorna os dados de um Pedido
router.get('/:id_pedido', PedidosController.getUmPedido);

//Altera um pedido
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de pedidos'
    });
});

//Exclui um pedido
router.delete('/', PedidosController.deletePedido);

module.exports = router;