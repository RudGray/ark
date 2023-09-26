class DirectionInput {
  constructor() {
    this.heldDirections = [];

    this.map = {
      "ArrowUp": "up",
      "KeyW": "up",
      "ArrowDown": "down",
      "KeyS": "down",
      "ArrowLeft": "left",
      "KeyA": "left",
      "ArrowRight": "right",
      "KeyD": "right",
    }
  }

  get direction() {
    return this.heldDirections[0];
  }
  
  updateDirection(dir) {
    if (this.heldDirections.indexOf(dir) === -1) {
      this.heldDirections.unshift(dir);
    }
    // Vous pouvez également ajouter une logique pour supprimer la direction après un certain délai si nécessaire
  }
  
  init() {
    document.addEventListener("keydown", e => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener("keyup", e => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });

    document.getElementById('arrow-up').addEventListener('click', () => this.updateDirection('up'));
    document.getElementById('arrow-down').addEventListener('click', () => this.updateDirection('down'));
    document.getElementById('arrow-left').addEventListener('click', () => this.updateDirection('left'));
    document.getElementById('arrow-right').addEventListener('click', () => this.updateDirection('right'));
    
  }

  

}