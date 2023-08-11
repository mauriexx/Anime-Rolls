import { HttpService } from '@nestjs/axios';
export declare class AnimesService {
    private httpService;
    constructor(httpService: HttpService);
    animesArray: any[];
    roleos(): Promise<string>;
    poblarArray(user: any): Promise<any[]>;
}
