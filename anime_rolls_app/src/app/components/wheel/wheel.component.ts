import { AfterViewInit, Component } from '@angular/core';
import { AnimeService } from 'src/app/services/anime-service.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements AfterViewInit {
  constructor(private animeService: AnimeService) {}

  
 
  // Lista inicial de colores claros
  lightColors = [
    'hsl(45, 100%, 80%)',    // Amarillo claro
    'hsl(190, 100%, 80%)',  // Cian claro
    'hsl(345, 100%, 80%)',  // Rojo claro
    'hsl(120, 100%, 80%)',  // Verde claro
    'hsl(280, 100%, 80%)',  // Morado claro
    'hsl(220, 100%, 80%)',  // Azul claro
    'hsl(60, 100%, 80%)',   // Amarillo-verde claro
    'hsl(300, 100%, 80%)'   // Magenta claro
  ];

  // Función para obtener un color aleatorio de la lista y eliminarlo
  getRandomColorFromList() {
    const randomIndex = Math.floor(Math.random() * this.lightColors.length);
    const chosenColor = this.lightColors[randomIndex];
    // Elimina el color seleccionado de la lista
    this.lightColors.splice(randomIndex, 1);
    return chosenColor;
  }

  getTheRoll() {
    this.animeService.getRoll().subscribe((data) => {
      // Si ya no hay colores en la lista, restablece la lista de colores
      if(this.lightColors.length === 0) {
        this.resetColorList();
      }

      const anime = {
        text: data,
        color: this.getRandomColorFromList() // Llamada a la función para obtener color de la lista
      }
      this.prizes.push(anime);
      console.log(this.prizes);

      // Llamada para actualizar la ruleta con el nuevo premio
      this.updateWheel();
    });
  }

  // Función para restablecer la lista de colores si ya no hay más colores para elegir
  resetColorList() {
    this.lightColors = [
      'hsl(45, 100%, 80%)',
      'hsl(190, 100%, 80%)',
      'hsl(345, 100%, 80%)',
      'hsl(120, 100%, 80%)',
      'hsl(280, 100%, 80%)',
      'hsl(220, 100%, 80%)',
      'hsl(60, 100%, 80%)',
      'hsl(300, 100%, 80%)'
    ];
  }


  prizes = [
  ];

  // Aquí estamos moviendo la lógica de construcción de la ruleta a su propio método
  updateWheel() {
    const spinner = document.querySelector(".spinner") as HTMLInputElement;
    spinner.innerHTML = ''; // Limpiamos el spinner antes de añadir nuevos premios

    this.createConicGradient();
    this.createPrizeNodes();
  }

  createConicGradient() {
    const spinner = document.querySelector(".spinner") as HTMLInputElement;
    spinner.setAttribute(
      "style",
      `background: conic-gradient(
        from -90deg,
        ${this.prizes
          .map(({ color }, i) => `${color} 0 ${(100 / this.prizes.length) * (this.prizes.length - i)}%`)
          .reverse()
        }
      );`
    );
  }

  createPrizeNodes() {
    const spinner = document.querySelector(".spinner") as HTMLInputElement;
    const prizeSlice = 360 / this.prizes.length;
    const prizeOffset = Math.floor(180 / this.prizes.length);
    this.prizes.forEach(({ text, color}, i) => {
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      spinner.insertAdjacentHTML(
        "beforeend",
        `<li class="prize" style="--rotate: ${rotation}deg">
          <span class="text">${text}</span>
        </li>`
      );
    });
  }

  ngAfterViewInit(): void {
    
    
    const wheel = document.querySelector(".deal-wheel");
    const spinner = wheel.querySelector(".spinner") as HTMLInputElement;
    const trigger = wheel.querySelector(".btn-spin")  as HTMLInputElement;
    const ticker = wheel.querySelector(".ticker") as HTMLElement ;
    const prizeSlice = 360 / this.prizes.length;
    const prizeOffset = Math.floor(180 / this.prizes.length);
    const spinClass = "is-spinning";
    const selectedClass = "selected";
    const spinnerStyles = window.getComputedStyle(spinner);
    let tickerAnim;
    let rotation = 0;
    let currentSlice = 0;
    let prizeNodes;
    
    const createPrizeNodes = () => {
      this.prizes.forEach(({ text, color}, i) => {
        const rotation = ((prizeSlice * i) * -1) - prizeOffset;
        
        spinner.insertAdjacentHTML(
          "beforeend",
          `<li class="prize" style="--rotate: ${rotation}deg">
            <span class="text">${text}</span>
          </li>`
        );
      });
    };
    
    const createConicGradient = () => {
      spinner.setAttribute(
        "style",
        `background: conic-gradient(
          from -90deg,
          ${this.prizes
            .map(({ color }, i) => `${color} 0 ${(100 / this.prizes.length) * (this.prizes.length - i)}%`)
            .reverse()
          }
        );`
      );
    };
    
    
    const setupWheel = () => {
      createConicGradient();
      createPrizeNodes();
      prizeNodes = wheel.querySelectorAll(".prize");
    };
    
    const spinertia = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    const runTickerAnimation = () => {
      // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
      const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
      const a = values[0];
      const b = values[1];  
      let rad = Math.atan2(parseInt(b), parseInt(a));
      
      if (rad < 0) rad += (2 * Math.PI);
      
      const angle = Math.round(rad * (180 / Math.PI));
      const slice = Math.floor(angle / prizeSlice);
    
      if (currentSlice !== slice) {
        ticker.style.animation = "none";
        setTimeout(() => ticker.style.animation = null, 10);
        currentSlice = slice;
      }
    
      tickerAnim = requestAnimationFrame(runTickerAnimation);
    };
    
    const selectPrize = () => {
      const selected = Math.floor(rotation / prizeSlice);
      prizeNodes[selected].classList.add(selectedClass);
    };
    
    trigger.addEventListener("click", () => {
    
      trigger.disabled = true;
      rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
      prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
      wheel.classList.add(spinClass);
      spinner.style.setProperty("--rotate", rotation as unknown as string);
      ticker.style.animation = "none";
      runTickerAnimation();
    });
    
    spinner.addEventListener("transitionend", () => {
      cancelAnimationFrame(tickerAnim);
      trigger.disabled = false;
      trigger.focus();
      rotation %= 360;
      selectPrize();
      wheel.classList.remove(spinClass);
      spinner.style.setProperty("--rotate", rotation as unknown as string);
    });
    
    setupWheel();
  }
 
}