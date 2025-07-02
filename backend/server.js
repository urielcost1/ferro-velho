const express = require('express');
const cors = require('cors');
const entradaRoutes = require('./interfaces/routes/entradaRoutes');
const materialRoutes = require('./interfaces/routes/materialRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/entradas', entradaRoutes);
app.use('/materiais', materialRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
