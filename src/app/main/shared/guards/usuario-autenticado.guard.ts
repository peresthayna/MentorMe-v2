import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../main/usuarios/login/shared/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if (this.loginService.logado) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
