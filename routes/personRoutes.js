const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async(req, res) => {

    //req.body
    const {name, salary, approved} = req.body

    if(!name){
        res.status(422).json({error: 'O nome e obrigatorio!'})
        return
    }

    const Person = {
        name,
        salary,
        approved
    }

    try{
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
    }catch(error){
        res.status(500).json({error: error})
    }

})

router.get('/', async (req, res) => {
    try{
        const people = await Person.find()

        res.status(200).json(people)
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const person = await Person.findOne({ _id: id })

        if(!person){
            res.status(422).json({message: 'O usuario nao foi encontrado'})
            return
        }

        res.status(200).json(people)
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body

    const Person = {
        name,
        salary,
        approved
    }

    try{
        const updatedPerson = await Person.updateOne({_id:id}, person)

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({error: 'O nome e obrigatorio!'})
            return
        }

        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }

})

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.updateOne({_id:id})
    if(!person){
        res.status(422).json({error: 'O user nao existe!'})
        return
    }

    try{
        await Person.deleteOne({_id:id})
        res.status(200).json({message: 'User deletado'})
    }catch(error){
        res.status(500).json({error: error})
    }
    
})

module.exports = router
