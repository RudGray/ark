class ArrowPad {
    constructor() {
        this.wrapper = document.querySelector(".game-container-wrapper");
        // this.main.classList.add('arrow-pad');
        // this.wrapper.insertAdjacentHTML('beforeend', `
        this.element = document.createElement("div");
        this.element.classList.add("arrow-pad");
        this.element.innerHTML = (`
            <div class="arrow-circle">
                <div class="arrow-horizontal">
                    <button id="arrow-left" class="arrow-btn arrow-horiz-btn" data-direction="left">
                        <div class="arrow arrow-left"></div>
                    </button>
                    <button id="arrow-right" class="arrow-btn arrow-horiz-btn" data-direction="right">
                        <div class="arrow arrow-right"></div>
                    </button>
                </div>
                <div class="arrow-vertical">
                    <button id="arrow-up" class="arrow-btn arrow-verti-btn" data-direction="up">
                        <div class="arrow arrow-up"></div>
                    </button> 
                    <button id="arrow-down" class="arrow-btn arrow-verti-btn" data-direction="down">
                        <div class="arrow arrow-down"></div>
                    </button>
                </div>
            </div>
        `);
        this.wrapper.appendChild(this.element);
    }
  
    init() {
        this.bindEvents();
    }
  
    bindEvents() {
      this.element.querySelectorAll('.arrow-btn').forEach(button => {
        button.addEventListener('click', () => {
            console.log("arrow button clicked");
          const direction = button.dataset.direction;
          console.log("direction : " + direction);
          this.moveCharacter(direction);
        });
      });
    }
  
    moveCharacter(direction) {
      // Implémentez la logique de mouvement du personnage ici
      // Utilisez la direction (up, down, left, right) pour déterminer comment déplacer le personnage
    }
  }
  