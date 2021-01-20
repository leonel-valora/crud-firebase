import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;
  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( resp => {
        if (resp) {
          this.heroes = resp;
        }
        this.cargando = false;
      });
  }

  borrarHeroe( heroe: HeroeModel, i: number ) {
    const confirmacion = confirm("¿Deseas eliminar el registro?");
    if(confirmacion) {
      this.heroes.splice(i, 1);
      this.heroesService.borrarHeroe( heroe.id ).subscribe();
    }
  }


}
