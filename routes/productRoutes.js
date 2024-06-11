const router = require('express').Router()
const Product = require('../models/Product')
//CADASTRANDO
router.post('/', async (req, res) => {
    const {
        name,
        barCode,
        price,
        category,
        composition,
        quantityInStock,
        weight,
        heightDimension,
        widthDimension,
        lengthDimension
    } = req.body
    if (
        !name || 
        !barCode || 
        !price || 
        !category || 
        !composition || 
        !quantityInStock || 
        !weight || 
        !heightDimension || 
        !widthDimension || 
        !lengthDimension
    ){
        res.status(400).json({error: 'INFORMAÇÃO: Todos os campos devem ser preenchidos!'})
        return
    }
    const product = {
        name,
        barCode,
        price,
        category,
        composition,
        quantityInStock,
        weight,
        heightDimension,
        widthDimension,
        lengthDimension,
    }
    try {
      await Product.create(product)
      res.status(201).json({message: 'INFORMAÇÃO: Produto inserido no sistema!'})
    } catch (error) {
      res.status(500).json({error: error})
    }
})
//LENDO TODOS REGISTROS
router.get('/', async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({error: error})
    }
})
//LENDO POR REGISTRO (ID)
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const product = await Product.findOne({ _id: id })
        if(!product){
            res.status(404).json({message: 'ATENÇÃO: Produto não encontrado no sistema!'})
            return
        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({error: error})
    }
})
//ATUALIZACAO
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {
        name, 
        barCode, 
        price, 
        category, 
        composition, 
        quantityInStock, 
        weight, 
        heightDimension, 
        widthDimension, 
        lengthDimension,
    } = req.body
    const product = {
        name,
        barCode,
        price,
        category,
        composition,
        quantityInStock,
        weight,
        heightDimension,
        widthDimension,
        lengthDimension,
    }
    try{
        const updatedProduct = await Product.updateOne({_id:id}, product)
        if(updatedProduct.matchedCount === 0){
            res.status(404).json({message: 'ATENÇÃO: Produto não encontrado no sistema!'})
            return
        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({error: error})
    }
})
//DELETANDO
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const product = await Product.findOne({_id:id})
    if(!product){
        res.status(404).json({message: 'ATENÇÃO: Produto não encontrado no sistema!'})
        return
    }
    try{
        await Product.deleteOne({_id:id})
        res.status(200).json({message: 'INFORMAÇÃO: Produto deletado do sistema!'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router