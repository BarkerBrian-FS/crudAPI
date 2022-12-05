const express = require('express');
const router = express.Router();

const Game = require('../models/game')

//Restful Endpoints
//GET, POST, PATCH, DELETE

const getGame = async (req, res, next) => {
    let game
    try{
        game = await Game.findById(req.params.id)
        if (game === null){
            return res.status(404).json({ message: "Game not found" })
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
    res.game = game
    next();
}

//GET ALL
router.get('/', async (req, res) => {
    try{
        const games = Game.find()
        res.json(games)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

//GET ONE
router.get('/:id', getGame, async (req, res) => {
    res.json(res.game)
})

//Add New
router.post('/', async (req, res) => {
    const game = new Game({
        name: req.body.name,
        genre: req.body.genre,
        company: req.body.company
    })
    try{
        const newGame = await game.save();
        res.status(201).json(newGame)

    } catch(error) {
        res.status(400).json({ message: error.message})
    }
})

//Update
router.patch('/:id', getGame, async (req, res) => {
    if(req.body.name != null){
        res.game.name = req.body.name
    } 
    if(req.body.genre != null){
        res.game.genre = req.body.genre
    } 
    if(req.body.company != null){
        res.game.company = req.body.company
    } 
    try{
        const updatedGame = await res.game.save();
        res.json(updatedGame)
    } 
    catch(error){
        res.status(400).json({ message: error.message })
    }
})

//Delete
router.delete('/:id', getGame, async (req, res) => {
    try{
        await res.game.remove();
        res.json({ message: "Game Removed" })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
