const express = require("express")
const { v4: uuid } = require("uuid")

const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/public'));

/*

base do payload de cadastrado:

produto = {
	"titulo": "Notebook Lenovo Ideapad ",
	"descrição": "Notebook Lenovo Ideapad S145 81V70008BR - AMD Ryzen 5-3500U 8GB 256GB SSD 15,6” Windows 10",
	"valor": 3419,
	"marca": "Lenovo",
	"modelo": "Ideapad",
	"promocao": true,
	"estoque": 30
}

*/

// Variavel referente aos produtos
const produtos = []

// Envia os dados dos produtos cadastrados
app.get('/produtos', (req, res) => {
  return res.json(produtos)
})

app.post('/produtos/cadastrar', (req, res) => {
  const dados = req.body

  produtos.push({
    id: uuid(),
    ...dados,
  })

  return res.json({ mensagem: "Produto cadastrado com sucesso!" })
})

app.put('/produtos/modificar/:id', (req, res) => {
  const idProdutos = req.params.id
  const dados = req.body

  const produtosIndex = produtos.findIndex((produtos) => {
    return produtos.id === idProdutos
  })

  if (produtosIndex === -1) {
    return res.json({ mensagem: "Produto não encontrado..." })
  }

  produtos[produtosIndex] = {
    id: idProdutos,
    ...dados,
  }

  return res.json({ mensagem: "Produto atualizado com sucesso!" })
})

app.delete('/produtos/deletar/:id', (req, res) => {
  const idProdutos = req.params.id

  const produtosIndex = produtos.findIndex((produtos) => {
    return produtos.id === idProdutos
  })

  if (produtosIndex === -1) {
    return res.json({ mensagem: 'Produto não encontrado...' })
  }

  produtos.splice(produtosIndex, 1)

  return res.json({ mensagem: 'Produto apagado com sucesso!' })
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Seja bem vindo, usuário!")
  console.log("O servidor está rodando na porta 3000 🚀")
})

