const { Router } = require("express")
const showRouter = Router()
//const User = require("../models/User")
const { Show } = require("../models")
//const { body, validationResult } = require("express-validator")

function statusCheck (req, res, next){
    try {
        if (!req.body.status){
            throw new Error("no status")
        } else if (req.body.status.length < 1){
            throw new Error("not a status")
        }
        next()
    } catch (error) {
        res.send(error.message)
    }
}

function whitespace (req, res, next){
    try {
        if (req.body.status.includes(" ")){
            throw new Error("NO WHITESPACE")
        }
        next()
    } catch (error) {
        res.send(error.message)
    }
    
}

function statuslength (req, res, next){
    try {
        if (req.body.status.length < 5 || 25 < req.body.status.length){
            throw new Error("MINIMUM 5 CHARACTERS & MAXIMUM 25 CHARACTERS")
        }
        next()
    } catch (error) {
        res.send(error.message)
    }
}

function ratingsCheck (req, res, next){
    try {
        if (!req.body.rating){
            throw new Error("invalid rating")
        }
        next()
    } catch (error) {
        res.send(error.message)
    }
}

showRouter.get("/", async (req, res) => {
    const shows = await Show.findAll()
    res.status(200).send({ shows })
})

showRouter.get("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    res.status(200).send({ show })
})

showRouter.get("/:genre", async (req, res) => {
    const shows = await Show.findAll({ where: { genre: req.params.genre } });
    res.status(200).send({ shows })
})

showRouter.put("/status/:id", statusCheck, whitespace, statuslength, async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    await show.update(req.body);
    res.status(200).send({ show })
})

showRouter.put("/rating/:id", ratingsCheck, async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    await show.update(req.body);
    res.status(200).send({ show })
})

showRouter.delete("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    await show.destroy();
    res.status(200).send({ show })
})

module.exports = showRouter