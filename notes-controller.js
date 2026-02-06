const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString(),
  }

  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen("Заметка добавлена"))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNote(id) {
  let notes = await getNotes()
  const notesLength = notes.length

  notes = notes.filter((note) => note.id !== id)

  if (notesLength === notes.length) {
    console.log(chalk.bgRed("Ошибка: заметка не найдена"))
    return
  }

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen("Заметка была удалена"))

  printNotes()
}

async function editNote(id, newTitle) {
  let notes = await getNotes()

  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex === -1) {
    console.log(chalk.bgRed("Ошибка: заметка не найдена"))
    return
  }

  notes[noteIndex].title = newTitle

  await fs.writeFile(notesPath, JSON.stringify(notes))

  console.log(chalk.bgGreen("Заметка обновлена"))
}

module.exports = { addNote, removeNote, getNotes, editNote }
