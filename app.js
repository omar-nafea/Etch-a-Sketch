const container = document.querySelector(".container")
console.log(container)
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        let dev = document.createElement("div")
        dev.className = "square"
        container.appendChild(dev)
    }
}