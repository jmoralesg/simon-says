const btnStart = document.getElementById("btnStart");
const btnAqua = document.getElementById("aqua");
const btnPurple = document.getElementById("purple");
const btnPink = document.getElementById("pink");
const btnGreen = document.getElementById("green");
const LAST_LEVEL = 10;

/*
1. Hide the btn start
2. Generate sequence of colours 
  - Generate a sequence of random numbers, representing the colors, implementing the new Array to create the array dynamically, call the method fill() to fill the array with zeros, iterate with map().
4. Illuminate Sequence depending on the level the user is at, and the user will have to repeat it 
  - Transform numbers to colors (switch method)
  - Illuminate color (adding css class) adding a delay
  - Turn off color (removing css class) 
  - Go to the next level with sequence
5. Get user input  
 -  Determine if user input is correct or not depending on the sequence
6. Move on to the next level or not
*/

class Game {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.generateSequence();
    setTimeout(() => {
      this.nextLevel();
    }, 500);
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.toggleBtnStart();
    this.level = 1;
    this.colors = {
      aqua,
      purple,
      pink,
      green
    };
  }

  toggleBtnStart() {
    btnStart.classList.toggle("hide");
  }

  generateSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.subLevel = 0;
    this.illuminatesSequence();
    this.addEventsClick();
  }

  transformNumToColor(num) {
    switch (num) {
      case 0:
        return "aqua";
      case 1:
        return "purple";
      case 2:
        return "pink";
      case 3:
        return "green";
    }
  }

  transformColorToNum(color) {
    switch (color) {
      case "aqua":
        return 0;
      case "purple":
        return 1;
      case "pink":
        return 2;
      case "green":
        return 3;
    }
  }

  illuminatesSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformNumToColor(this.sequence[i]);
      setTimeout(() => this.illuminatesColor(color), 1000 * i);
    }
  }

  illuminatesColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOffColor(color), 350);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  addEventsClick() {
    this.colors.aqua.addEventListener("click", this.chooseColor);
    this.colors.purple.addEventListener("click", this.chooseColor);
    this.colors.pink.addEventListener("click", this.chooseColor);
    this.colors.green.addEventListener("click", this.chooseColor);
  }

  removeClickEvents() {
    this.colors.aqua.removeEventListener("click", this.chooseColor);
    this.colors.purple.removeEventListener("click", this.chooseColor);
    this.colors.pink.removeEventListener("click", this.chooseColor);
    this.colors.green.removeEventListener("click", this.chooseColor);
  }

  chooseColor(e) {
    const nameColor = e.target.dataset.color;
    const numColor = this.transformColorToNum(nameColor);
    this.illuminatesColor(nameColor);
    if (numColor === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.removeClickEvents();
        if (this.level === LAST_LEVEL + 1) {
          this.won();
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      this.lost();
    }
  }

  won() {
    swal("", "You won", "success").then(this.initialize);
  }

  lost() {
    swal("", " You lost", "error").then(() => {
      this.removeClickEvents();
      this.initialize();
    });
  }
}
function startGame() {
  const game = new Game();
}
