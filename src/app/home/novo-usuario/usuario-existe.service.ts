import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { switchMap, map, first } from 'rxjs';
import { NovoUsuarioService } from './novo-usuario.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      return (
        control.valueChanges.pipe(
          switchMap((nomeUsuario) =>
            this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
          )
        ),
        map((usuarioExiste: any) => (usuarioExiste ? { usuarioExiste: true } : null)),
        first()
      );
    };
  }
}
