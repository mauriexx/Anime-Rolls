import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animes =["x"]
  constructor(private animeService:AnimeService){}
  ngOnInit(): void {
    this.animeService.populateArray("Overus").subscribe((data)=>{
      
    }

    )
  }
  getTheRoll(){
    this.animeService.getRoll().subscribe((data)=>{
      this.animes.push(data)
      console.log(this.animes);
      
    })
  }
}
