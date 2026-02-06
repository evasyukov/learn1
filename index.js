const express = require("express")
const path = require("path")
const chalk = require("chalk")

const {
  addNote,
  getNotes,
  removeNote,
  editNote,
} = require("./notes-controller.js")

const port = 3000

const app = express()

app.set("view engine", "ejs")
app.set("views", "pages")

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Бекенд страница",
    notes: await getNotes(),
    created: false,
  })
})

app.post("/", async (req, res) => {
  await addNote(req.body.title)
  res.render("index", {
    title: "Бекенд страница",
    notes: await getNotes(),
    created: true,
  })
})

app.put("/", async (req, res) => {
  const { id, title } = req.body

  await editNote(id, title)

  res.json({ success: true })
})

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id)

  res.render("index", {
    title: "Бекенд страница",
    notes: await getNotes(),
    created: true,
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Сервер запущен на порту ${port}`))
})
