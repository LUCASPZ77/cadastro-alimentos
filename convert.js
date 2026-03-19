const XLSX = require('xlsx');
const mongoose = require('mongoose');
require('dotenv').config();

// 1. Ler o Excel
const workbook = XLSX.readFile('alimentos.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

// 2. Conectar ao MongoDB e Salvar
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Conectado ao banco! Iniciando importação...");

    const Alimento = mongoose.model('Alimento', {
        nome: String,
        codigo: String,
        quantidade: Number
    });

    // Limpa o banco antes de importar (opcional, para não duplicar)
    await Alimento.deleteMany({});

    // Salva os itens do Excel
    await Alimento.insertMany(data);

    console.log("Sucesso! 20 itens importados.");
    process.exit();
  })
  .catch(err => {
    console.error("Erro na conexão:", err);
    process.exit(1);
  });