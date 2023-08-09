import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimesService } from './animes.service';


@Controller('animes')
export class AnimesController {
  constructor(private readonly animeService: AnimesService) {}
  @Get('rolls')
  roll() {
    return this.animeService.roleos()
  }
  @Get(':user')
  poblar(@Param('user') user:string){
    return this.animeService.poblarArray(user)
  }
}