document.addEventListener("click", (event) => {
  const id = event.target.dataset.id

  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("div").remove()
    })
  }

  if (event.target.dataset.type === "edit") {
    const note = event.target.closest(".note").querySelector("span")
    const titleValue = event.target.closest(".note").querySelector("span").textContent

    const newTitleValue = prompt("Введите новое название", titleValue)

    if (newTitleValue === null) {
      return
    }

    edit(id, newTitleValue).then(() => {
      note.textContent = newTitleValue
    })
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  })
}

async function edit(id, title) {
  await fetch("/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title }),
  })
}
