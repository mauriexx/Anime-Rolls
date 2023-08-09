"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimesService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let AnimesService = exports.AnimesService = class AnimesService {
    constructor(httpService) {
        this.httpService = httpService;
        this.animesArray = [];
    }
    async roleos() {
        let random = Math.floor(Math.random() * this.animesArray.length);
        let anime = this.animesArray[random];
        this.animesArray.splice(random, 1);
        return this.animesArray;
    }
    async poblarArray(user) {
        const animes = [];
        const headers = {
            'X-MAL-CLIENT-ID': '8bce3d413e7a6f1578d4b63eb450d034',
        };
        const response = await this.httpService.get(`https://api.myanimelist.net/v2/users/${user}/animelist?status=plan_to_watch&limit=1000`, { headers }).toPromise();
        response.data.data.map(x => {
            animes.push(x.node.title);
        });
        this.animesArray = animes;
        return this.animesArray;
    }
};
exports.AnimesService = AnimesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AnimesService);
//# sourceMappingURL=animes.service.js.map