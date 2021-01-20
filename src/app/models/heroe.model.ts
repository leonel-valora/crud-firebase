import { HeroesService } from "../services/heroes.service";

export class HeroeModel {
    id: string;
    nombre: string;
    poder: string;
    vivo: boolean;

    constructor() {
        this.vivo = true;
    }
}