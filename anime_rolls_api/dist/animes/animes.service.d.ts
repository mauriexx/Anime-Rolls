import { HttpService } from '@nestjs/axios';
export declare class AnimesService {
    private httpService;
    constructor(httpService: HttpService);
    animesArray: any[];
    roleos(): Promise<any[]>;
    poblarArray(user: any): Promise<any[]>;
}
