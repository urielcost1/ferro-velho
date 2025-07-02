const express = require('express');
const {
  obterMateriais,
  cadastrarMaterial,
  editarPrecoMaterial,
  excluirMaterial
} = require('../controllers/materialController');

const router = express.Router();

router.get('/', obterMateriais);
router.post('/', cadastrarMaterial);
router.put('/:nome', editarPrecoMaterial);
router.delete('/:nome', excluirMaterial);

module.exports = router;
