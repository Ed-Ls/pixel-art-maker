////////////////
///ELEMENTS

let globalDiv = document.querySelector("#invader");
let table = document.querySelector(".tableCanvas");
let form = document.querySelector("form");
let pixel = document.querySelectorAll("table td");
let colorPicker = document.querySelectorAll(".color");

let inputGrid = document.querySelector(".input-grid");
let inputPixel = document.querySelector(".input-pixel");
let submitBtn = document.querySelector(".submit-btn");
let clearBtn = document.querySelector(".clear-btn");

/////////////////
///APP

const app = {
  tableRows: "",
  rows: "",
  columns: "",

  //Générer l'ardoise
  generateGrid: function (askGrid) {
    rows = askGrid;
    columns = askGrid;
    tableRows = "";
    let r = 1;

    while (r <= rows) {
      tableRows += "<tr>";

      for (let c = 1; c <= columns; c++) {
        tableRows += "<td></td>";
      }
      tableRows += "</tr>";
      r += 1;
    }

    // console.log(tableRows);
    table.insertAdjacentHTML("beforeend", tableRows);
    tableRows = "";
    r = 1;
    c = 1;
  },

  //Soumettre le formulaire avec la nouvelle taille de grille/pixels demandée
  submitForm: function () {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      userAskGrid = 0;
      userAskPixel = +inputPixel.value;
      // console.log(userAskPixel)

      //On check si l'user entre bien un nb
      if (isNaN(inputGrid.value) || isNaN(inputPixel.value)) {
        alert("Il nous faut un nombre - Max 15 Grid & 35 Pixel");
      }
      //On limite la taille max de la grille à 15x15
      else
        +inputGrid.value > 15
          ? (userAskGrid = 15)
          : (userAskGrid = +inputGrid.value);

      //On vide la table actuelle et on génère une nouvelle grille
      table.innerHTML = "";
      app.generateGrid(userAskGrid);

      //On edit le nb de pixels dans la grille (limite 35px)
      +inputPixel.value > 35
        ? (userAskPixel = 35)
        : (userAskPixel = +inputPixel.value);

      let pixel1 = document.querySelectorAll("table tr");
      pixel1.forEach((e) => (e.style.height = `${userAskPixel}px`));

      let pixel2 = document.querySelectorAll("table td");
      pixel2.forEach((e) => (e.style.width = `${userAskPixel}px`));

      //Lancer le dessin sur la nouvelle grille, en faisant un reset du form et de la couleur selectionnée
      app.draw("black");
      colorPicker.forEach((e) => e.classList.remove("selected"));
      colorPicker[1].classList.add("selected");

      inputGrid.value = "";
      inputPixel.value = "";
    });
  },

  //Ecouter l'event click sur la grille (PARENT) pour dessiner selon l'endroit du click (target children)
  draw: function (colorChosen) {
    table.addEventListener("click", function (e) {
      // console.log(e.target);
      let cell = e.target;

      //Toggle la classe qui ajoute/retire le fond de couleur
      cell.classList.remove("grey", "red", "black", "green");
      cell.classList.add(`${colorChosen}`);
    });
  },

  //Ecouter le click sur la palette de couleurs pour changer la couleur du dessin
  changeColor: function () {
    colorPicker.forEach((e) =>
      e.addEventListener("click", function () {
        // console.log(e.classList[1]);

        let currColor = e.classList[1];
        colorPicker.forEach((e) => e.classList.remove("selected"));
        e.classList.add("selected");

        app.draw(currColor);
      })
    );
  },

  //Ecouter le click sur le clear btn pour clear la grille sans devoir en refaire une
  clearGrid: function () {
    clearBtn.addEventListener("click", function () {
      pixel = document.querySelectorAll("table td");

      pixel.forEach((e) => e.classList.remove("red", "black", "green"));
    });
  },

  init: function () {
    app.generateGrid(8);
    app.draw("black");
    app.submitForm();
    app.changeColor();
    app.clearGrid();
  },
};

app.init();

/////
// Tests fonctionnalités
