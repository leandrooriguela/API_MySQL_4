const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('./middlewere/login');

const ProdutosController = require('../controllers/produtos.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,'-') +'_'+ file.originalname);//Possivel erro
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//Retorna todos os Produtos
router.get('/', ProdutosController.getProdutos);

//Insere um Produto --POST
router.post(
    '/', 
    login.obrigatorio, 
    upload.single('produto_imagem'), 
    ProdutosController.postProduto
);

//Retorna os dados de um produto
router.get('/:id_produto', ProdutosController.getUmProduto);

//Altera um produto
router.patch('/', login.obrigatorio, ProdutosController.updateProduto);

//Exclui um produto
router.delete('/', login.obrigatorio, ProdutosController.deleteProduto);

module.exports = router;