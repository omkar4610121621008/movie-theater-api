const { Router } = require("express")
const showRouter = Router()
//const User = require("../models/User")
const Show = require("../models/Show")

showRouter.get("/shows", async (req, res) => {
    const shows = await Show.findAll()
    res.status(200).send({ shows })
})

showRouter.get("/shows/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    res.status(200).send({ show })
})

showRouter.get("/shows/:genre", async (req, res) => {
    const shows = await Show.findAll({ where: { genre: req.params.genre } });
    res.status(200).send({ shows })
})

showRouter.put("/shows/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    await show.update(req.body);
    res.status(200).send({ show })
})