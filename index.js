let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");
let draw = false;
let erase = false;

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";
const isTouchDevice = (e) => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";

    return false;
  }
};

isTouchDevice();
gridButton.addEventListener("click", () => {
  container.innerHTML = "";

  let count = 0;

  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    let div = document.createElement("div");
    div.classList.add("gridRow");
    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", `gridCol${count}`);
      console.log(col.id);
      col.addEventListener(events[deviceType].down, (e) => {
        // console.log(e);
        draw = true;
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        );
        let elementiiiiid = elementId.id;
        console.log(elementId.id);
        checker(elementiiiiid);
      });

      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });

      div.appendChild(col);
    } //end of innerloop
    container.appendChild(div);
  } // end of opening loop
}); // end of  create btn add event listener

function checker(elements) {
  let gridcolumn = document.querySelectorAll(".gridCol");
  gridcolumn.forEach((element) => {
    console.log(element.id);
    if (elements === element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

paintBtn.addEventListener("click", () => {
  draw = true;
  erase = false;
});
eraseBtn.addEventListener("click", () => {
  erase = true;
  draw = false;
});

clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});

gridWidth.addEventListener("input", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? ` 0${gridWidth.value}` : gridWidth.value;
});
gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});
