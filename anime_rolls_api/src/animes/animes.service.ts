import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnimesService {
  constructor(private httpService: HttpService ) {}
  animesArray=[]

  async roleos(){
    let random = Math.floor(Math.random() * this.animesArray.length);
    let anime= this.animesArray[random]
    this.animesArray.splice(random, 1)
    let animeStr = JSON.stringify(anime);
    return animeStr;
    
  }

  async poblarArray(user) {
    const animes= []
    const headers = {
      'X-MAL-CLIENT-ID': '8bce3d413e7a6f1578d4b63eb450d034',
    };
    const response = await this.httpService.get(`https://api.myanimelist.net/v2/users/${user}/animelist?status=plan_to_watch&limit=1000`, {headers}).toPromise();
    response.data.data.map(x=>{
      animes.push(x.node.title)
    })
    this.animesArray=animes 
    return this.animesArray;

  }
  
}