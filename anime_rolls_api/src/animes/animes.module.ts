import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnimesService,} from './animes.service';
import { AnimesController } from './animes.controller';

@Module({
  imports:[HttpModule],
  controllers: [AnimesController],
  providers: [AnimesService]
})
export class AnimesModule {}
