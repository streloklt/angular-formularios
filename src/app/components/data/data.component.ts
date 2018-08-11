import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent {
  forma: FormGroup;

  usuario = {
    nombreCompleto: {
      nombre: 'Alvaro',
      apellido: 'Letelier'
    },
    correo: 'a@a.cl',
    pasatiempos: ['Correr', 'Nadar']
  };

  constructor() {
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, this.noLetelier])
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIguales
    ]);

    this.forma.controls['username'].valueChanges.subscribe(data => {
      console.log(data);
    });

    this.forma.controls['username'].statusChanges.subscribe(data => {
      console.log(data);
    });

    // this.forma.setValue(this.usuario);
  }

  noLetelier(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Letelier') {
      return {
        nolerrera: true
      };
    }

    return null;
  }

  noIguales = (control: FormControl) => {
    if (control.value !== this.forma.controls['password1'].value) {
      return {
        noiguales: true
      };
    }

    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strelok') {
          resolve({
            existe: true
          });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    
    return promise;
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  guardarCambios() {
    console.log(this.forma);

    // this.forma.reset(this.usuario);
  }
}
