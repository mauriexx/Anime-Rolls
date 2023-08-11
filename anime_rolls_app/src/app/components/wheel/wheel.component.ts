import { AfterViewInit, Component } from '@angular/core';

declare function doWheel(): any;
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']

})
export class WheelComponent implements AfterViewInit {

  prizes = [
    {
      text: "Hanma Baki",
      color: "hsl(197 30% 43%)",
    },
    { 
      text: "Trigun",
      color: "hsl(173 58% 39%)",
    },
    { 
      text: "One Punch Man",
      color: "hsl(43 74% 66%)",
    },
    {
      text: "No Game no Life",
      color: "hsl(27 87% 67%)",
    }
  ];
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
