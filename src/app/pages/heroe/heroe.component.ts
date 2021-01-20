import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  guardado = false;
  actualizado = false;
  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesService.getHeroe( id )
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
          console.log(this.heroe);
        });
    }
  }

  agregarHeroe(form: NgForm) {
    if(form.invalid) {
      Object.values( form.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }
    console.log(form);
    console.log(this.heroe);
    if(this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(resp => {
        this.actualizado = true;
      });
    } else {
      this.heroesService.crearHeroe(this.heroe)
      .subscribe(resp => {
        this.guardado = true;
      });
    }
  }
}
