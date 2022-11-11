const express = require("express")
const app = express()
const userRouter = require("./routes/userRoute")
const showRouter = require("./routes/showRoute")

app.use(express.json())
app.use("/User", userRouter)
app.use("/Show", showRouter)

app.listen(3000, (req, res) => {
    console.log("Port 3000")
})

module.exports = app