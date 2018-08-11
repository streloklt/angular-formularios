import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    sexo: 'Hombre',
    acepta: false
  };

  paises = [{
    codigo: 'CRI',
    nombre: 'Costa Rica'
  }, {
    codigo: 'ESP',
    nombre: 'España'
  }];

  sexos: string[] = ['Hombre', 'Mujer'];

  constructor() { }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    console.log(forma);

    console.log(this.usuario);
  }

}
