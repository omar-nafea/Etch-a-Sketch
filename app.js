const container = document.querySelector(".gridContainer")
const resetBtn = document.querySelector(".reset")
const gridValue = document.getElementById("girdNum")
const color = document.getElementById("color")
const RGB = document.querySelector(".RGB")
const eraser = document.querySelector(".eraser")
const darkBtn = document.querySelector(".dark")
const removeGrid = document.querySelector(".removeGrid")
const darkenEffect = document.querySelector(".darkenEffect")

const white = "#fff"
const black = "#000"

let squares
let erase = false
let colorChanged = false
let removeGridBtn = false
let lettingRGB = false
let darkMode = false
let isDrawing = false
let isDarken = false
let interactions = 0;
let numGrig = 16
let measure = (960 / numGrig)


function creating() {
    container.innerHTML = ""
    numGrig = gridValue.value
    measure = (960 / numGrig)
    interactions = 0;

    for (let i = 0; i < numGrig; i++) {
        for (let j = 0; j < numGrig; j++) {
            let dev = document.createElement("div")
            dev.className = "square"
            dev.style.width = measure + "px"
            dev.style.height = measure + "px"
            resetBtn.addEventListener("click", resetting)
            container.appendChild(dev)
        }
    }
    squares = document.querySelectorAll(".square")
    makeItWrite()
    removeBorder()
}

function handleMouseDown(e) {
    container.addEventListener("mousedown", function () {
        isDrawing = true
    });
}
function writing(e) {
    if (isDrawing && !isDarken) {
        if (lettingRGB) {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            e.style.backgroundColor = "#" + randomColor
        } else {
            if (darkMode) {
                if (colorChanged) {
                    e.style.backgroundColor = color.value
                } else {
                    e.style.backgroundColor = white
                }
            } else {
                if (colorChanged) {
                    e.style.backgroundColor = color.value
                } else {
                    e.style.backgroundColor = black
                }
            }
        }
        if (erase && darkMode) {
            e.style.backgroundColor = black
        }
        if (erase && !darkMode) {
            e.style.backgroundColor = white
        }
    }
}
function handleMouseOver(e) {
    let interactions = 0;
    e.addEventListener("mouseover", () => {
        if (isDarken && isDrawing) {
            if (interactions < 10) {
                const opacity = (interactions + 1) * 0.1; // Adjust opacity based on interactions
                e.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
                interactions++;
            }
        }
        writing(e)
    })
}
function makeItWrite() {
    squares.forEach((e) => {
        handleMouseDown(e)
        writing(e)
        handleMouseOver(e)
        e.addEventListener("mouseup", function () {
            isDrawing = false
        });
    })
}




function resetting() {
    squares.forEach((e) => {
        if (darkMode) {
            e.style.backgroundColor = black
            e.style.border = "1px solid #333"
        } else {
            e.style.backgroundColor = white
            e.style.border = "1px solid #ccc"
        }
        if (removeGridBtn) {
            removeBorder()
        } else {
            if (darkMode) {
                e.style.border = "1px solid #333"
            } else {
                e.style.border = "1px solid #ccc"
            }
        }
    })
    erase = false
    isDarken = false
    darkenEffect.classList.remove("hovering")
    eraser.classList.remove("hovering")

}
function removeBorder() {
    squares.forEach((e) => {
        if (removeGridBtn) {
            e.style.border = "none"
        } else {
            if (darkMode) {
                e.style.border = "1px solid #333"
            } else {
                e.style.border = "1px solid #ccc"
            }
        }
    })
}

removeGrid.addEventListener("click", () => {
    removeGrid.classList.toggle("hovering")
    removeGridBtn = !removeGridBtn
    removeBorder()

})
gridValue.addEventListener("change", creating)
RGB.addEventListener("click", () => {
    RGB.classList.toggle("hovering")
    lettingRGB = !lettingRGB
})

eraser.addEventListener("click", () => {
    eraser.classList.toggle("hovering")
    erase = !erase
    isDarken = false
    darkenEffect.classList.remove("hovering")
})

darkBtn.addEventListener("click", () => {
    darkMode = !darkMode
    erase = false
    darkBtn.classList.toggle("hovering")
    removeBorder()
    resetting()
})

darkenEffect.addEventListener("click", () => {
    isDarken = !isDarken
    darkenEffect.classList.toggle("hovering")
})
color.addEventListener("change", () => {
    colorChanged = true
})

creating()
