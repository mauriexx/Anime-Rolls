import { AfterViewInit, Component } from '@angular/core';
import { AnimeService } from 'src/app/services/anime-service.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements AfterViewInit {
  constructor(private animeService: AnimeService) {}

  
  getRandomHslColor() {
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let l = Math.floor(Math.random() * 100);
    return `hsl(${h} ${s}% ${l}%)`;}

   getTheRoll() {
    this.animeService.getRoll().subscribe((data) => {
      const anime = {
        text: data,
        color: this.getRandomHslColor() // Llamada a la función para obtener color aleatorio
      }
      this.prizes.push(anime);
      console.log(this.prizes);

      // Llamada para actualizar la ruleta con el nuevo premio
      this.updateWheel();
    });
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