const { Router } = require("express")
const userRouter = Router()
const { User } = require("../models")
const { Show } = require("../models")

userRouter.get("/", async (req, res) => {
    const users = await User.findAll()
    res.status(200).send({ users })
})

userRouter.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.status(200).send({ user })
})

userRouter.get("/shows/:id", async (req, res) => {
    const userShows = await Show.findAll({ where : { userId : req.params.id}})
    res.status(200).send({ userShows })
})

userRouter.put("/:User_Id/shows/:Show_Id", async(req, res) => {
    const user = await User.findByPk(req.params.User_Id)
    const show = await Show.findByPk(req.params.Show_Id)
    await show.setUser(user)
    res.status(200).send({ user })
})

module.exports = userRouter