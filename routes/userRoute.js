const { Router } = require("express")
const userRouter = Router()
const User = require("../models/User")
const Show = require("../models/Show")

userRouter.get("/users", async (req, res) => {
    const users = await User.findAll()
    res.status(200).send({ users })
})

userRouter.get("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.status(200).send({ user })
})

userRouter.get("/user-shows/:id", async (req, res) => {
    const userShows = await Show.findAll({ where : { User_id : req.params.id}})
    res.status(200).send({ userShows })
})

userRouter.put("/users/:userId/shows/:showId", async(req, res) => {
    const user = await User.findByPk(req.params.userId)
    const show = await Show.findByPk(req.params.showId)
    await req.show.setUser(user)
    res.status(200).send({ user })
})