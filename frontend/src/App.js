import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
const [alimentos, setAlimentos] = useState([]);
const [nome, setNome] = useState('');
const [codigo, setCodigo] = useState('');
const [quantidade, setQuantidade] = useState('');

const fetchAlimentos = async () => {
try {
const res = await
axios.get('http://localhost:5000/api/alimentos');
setAlimentos(res.data);
} catch (err) {
console.error("Erro ao buscar dados", err);
}
};
useEffect(() => {
fetchAlimentos();
}, []);
const handleSubmit = async (e) => {
e.preventDefault();

const novo = { nome, codigo, quantidade: Number(quantidade)
};
try {
await axios.post('http://localhost:5000/api/alimentos',
novo);
setAlimentos([...alimentos, novo]);
// Limpar campos
setNome(''); setCodigo(''); setQuantidade('');
} catch (err) {
alert("Erro ao cadastrar alimento");
}
};
return (

<div className="min-h-screen bg-gray-50 p-4 md:p-8 font-
sans">

<div className="max-w-4xl mx-auto">
{/* Header */}
<header className="mb-8 text-center">
<h1 className="text-3xl font-bold text-slate-800">🍎
Conferência de Alimentos</h1>
<p className="text-gray-500">Gerencie seu estoque de
forma simples e rápida</p>
</header>
<div className="grid md:grid-cols-2 gap-8">
{/* Formulário de Cadastro */}
<section className="bg-white p-6 rounded-xl shadow-sm
border border-gray-100">

<h2 className="text-xl font-semibold mb-4 text-
gray-700">Novo Cadastro</h2>

<form onSubmit={handleSubmit} className="space-y-
4">

<div>
<label className="block text-sm font-medium
text-gray-600 mb-1">Nome do Produto</label>
<input
value={nome}
className="w-full p-2 border border-gray-300
rounded-lg focus:ring-2 focus:ring-blue-400 outline-none
transition"
placeholder="Ex: Arroz Integral"

onChange={e => setNome(e.target.value)}
required
/>
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<label className="block text-sm font-medium
text-gray-600 mb-1">Código</label>
<input
value={codigo}

className="w-full p-2 border border-gray-
300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none

transition"
placeholder="001"
onChange={e => setCodigo(e.target.value)}
required
/>
</div>
<div>
<label className="block text-sm font-medium
text-gray-600 mb-1">Quantidade</label>
<input
type="number"
value={quantidade}

className="w-full p-2 border border-gray-
300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none

transition"
placeholder="10"
onChange={e =>
setQuantidade(e.target.value)}
required
/>
</div>
</div>
<button
type="submit"
className="w-full bg-blue-600 hover:bg-blue-700
text-white font-bold py-2 rounded-lg transition duration-200
shadow-md transform active:scale-95"
>
Cadastrar Alimento
</button>

</form>
</section>
{/* Lista de Consulta */}
<section className="bg-white p-6 rounded-xl shadow-sm
border border-gray-100">
<div className="flex justify-between items-center
mb-4">

<h2 className="text-xl font-semibold text-gray-
700">Itens em Estoque</h2>

<button
onClick={fetchAlimentos}
className="text-sm text-blue-600
hover:underline font-medium"
>
Atualizar Lista
</button>
</div>

<div className="space-y-3 max-h-[400px] overflow-y-
auto pr-2">

{alimentos.length === 0 ? (
<p className="text-gray-400 text-center py-10
italic">Nenhum item cadastrado.</p>
) : (
alimentos.map((a, index) => (

<div key={index} className="flex justify-
between items-center p-3 bg-gray-50 rounded-lg border border-
gray-200 hover:border-blue-200 transition">

<div>

<p className="font-bold text-gray-
800">{a.nome}</p>

<p className="text-xs text-gray-500
uppercase tracking-wider">SKU: {a.codigo}</p>
</div>
<span className="bg-blue-100 text-blue-800
text-sm font-bold px-3 py-1 rounded-full">
{a.quantidade} un
</span>
</div>
))
)}

</div>
</section>
</div>
</div>
</div>
);
}
export default App;