const router = require('express').Router()
const Person = require('../models/Person')
//CADASTRANDO
router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body
    if (!name || !salary || !approved){
        res.status(422).json({error: 'Todos os campos devem ser preenchidos!'})
        return
    }
    const person = {
      name,
      salary,
      approved
    }
    try {
      await Person.create(person)
      res.status(201).json({message: 'Pessoa inserida no sistema!'})
    } catch (error) {
      res.status(500).json({error: error})
    }
})
//LENDO TODOS REGISTROS
router.get('/', async (req, res) => {
    try{
        const people = await Person.find()
        res.status(200).json(people)
    }catch(error){
        res.status(500).json({error: error})
    }
})
//LENDO POR REGISTRO (ID)
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const person = await Person.findOne({ _id: id })
        if(!person){
            res.status(422).json({message: 'O usuario nao foi encontrado!'})
            return
        }
        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})
//ATUALIZACAO
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved
    }
    try{
        const updatedPerson = await Person.updateOne({_id:id}, person)
        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'O usuario nao foi encontrado!'})
            return
        }
        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})
//DELETANDO
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.updateOne({_id:id})
    if(!person){
        res.status(422).json({message: 'O usuario nao foi encontrado!'})
        return
    }
    try{
        await Person.deleteOne({_id:id})
        res.status(200).json({message: 'Usuario deletado!'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router