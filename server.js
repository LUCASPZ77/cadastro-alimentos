const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
// Conectar ao Banco de Dados (ex: MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI);
// Modelo de Alimento
const Alimento = mongoose.model('Alimento', {
nome: String,
codigo: String,
quantidade: Number
});
// Rota para cadastrar/conferir
app.post('/api/alimentos', async (req, res) => {
const novoAlimento = new Alimento(req.body);
await novoAlimento.save();
res.status(201).send(novoAlimento);
});
app.get('/api/alimentos', async (req, res) => {
const alimentos = await Alimento.find();
res.send(alimentos);
});
app.listen(5000, () => console.log('Servidor rodando na porta 5000'));