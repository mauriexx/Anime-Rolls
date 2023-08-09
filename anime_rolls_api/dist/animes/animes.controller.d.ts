import { AnimesService } from './animes.service';
export declare class AnimesController {
    private readonly animeService;
    constructor(animeService: AnimesService);
    roll(): Promise<any[]>;
    poblar(user: string): Promise<any[]>;
}
